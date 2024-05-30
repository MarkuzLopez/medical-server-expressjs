const bcrypt = require('bcryptjs');
const { response } = require("express")
const Usuario = require("../models/usuario");
const { generarJWT } = require('../jwt/jwt');

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

module.exports = { 
    loginUser
}