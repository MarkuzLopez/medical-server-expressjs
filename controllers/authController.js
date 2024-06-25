const bcrypt = require('bcryptjs');
const { response } = require("express")
const Usuario = require("../models/usuario");
const { generarJWT } = require('../jwt/jwt');
const { googleVerify } = require('../helpers/google-verify');

const loginUser = async (req, res = response) => {

    const { email, password } = req.body

    try {

        //verififcar email
        const usuarioDB = await Usuario.findOne({ email });

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El email no  existe'
            })
        }

        
        // verificar contraseña y compara con lo que senvia con lo registrdo en la DB
        const verifyPassword = bcrypt.compareSync(password,  usuarioDB.password);

        if(!verifyPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        // generar token  JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({ 
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async (req, res = response ) => { 
    
    try {
        const {email, name, picture } =  await googleVerify(req.body.token);

        const usuarioDB =  await Usuario.findOne({ email });
        let usuario; 

        if(!usuarioDB) { 
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else { 
            usuario = usuarioDB;
            usuario.google = true;
        }
        // save usuario
        await usuario.save();

        // generate token
        const token = await generarJWT(usuario.id);

        res.json({ 
            ok: true,
            email,
            name,
            picture,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ 
            ok: false,
            msg: 'Token de google no es correcto'
        })
    }
}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT( uid );

    // Obtener el usuario por UID
    const usuario = await Usuario.findById( uid );


    res.json({
        ok: true,
        token,
        usuario        
    });

}


module.exports = { 
    loginUser,
    googleSignIn,
    renewToken
}