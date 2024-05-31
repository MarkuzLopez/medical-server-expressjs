const { response } = require('express')
const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../jwt/jwt');

const getUsuarios = async (req, res) => {

  const desde = await Number(req.query.desde) || 0; //trae todoso los registros 
// de la forma asyncronoa, se ejecuta una detras de la otra.  
  
  // const usuarios = await Usuario.find({}, "nombre email role google")
  //                             .skip(desde) //para saltarse o empezar dewsde el parametro
  //                             .limit(5); //para limitar la cantidad de registros
  // // const total = await Usuario.count();

  /**
   * para ejeutar las promesas de manera simultanea
   * sin necesidad de esperar una tras la otra
   */
  const [usuarios, total ] = await Promise.all([
    Usuario.find({}, "nombre email role google")
                  .skip(desde)
                  .limit(5),
    Usuario.countDocuments()
  ])

  res.json({
    ok: true,
    usuarios,
    total
  });
};

const crearUsuario = async (req, res) => {
  
    const { email, password } = req.body;

// TODO remove for new field in middleware and routes users
//   const erros = validationResult(req);
//   if (!erros.isEmpty()) {
//     return res.status(400).json({
//         ok: false,
//         erros: erros.mapped()
//     })
//   }

  try {

    const emailExist = await Usuario.findOne({ email });

    if (emailExist) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }

    const usuario = Usuario(req.body);
    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(); //numero o da generada.
    usuario.password = bcrypt.hashSync(password, salt);

    
    await usuario.save();

    //generar token 
    console.log(usuario, 'àdsa');
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      msg: "Usuario creado",
      usuario,
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const actualizarUsuario = async (req, res = response ) => { 

    const uid = req.params.id;
    console.log(req.params, 'asddsa');
    try {

        const existUserDB =  await Usuario.findById(uid);
        if(!existUserDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe por ese id'
            })
        }

        const { password, email, google, ...campos} = req.body;
        if(existUserDB.email !== email){
            
            const existEmail =  await Usuario.findOne({ email })

            if(existEmail) { 
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email =  email;
        const usuarioActualizado  = await Usuario.findByIdAndUpdate( uid, campos, { new: true } )
        res.status(201).json({
            ok: true,
            msg: 'Usuario actualizado',
            usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


const eliminarUsuario = async (req, res =  response) => { 
    const uid = req.params.id;

    try {

        const existUserDB =  await Usuario.findById(uid);

        if(!existUserDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe por ese id'
            })
        }
        await Usuario.findByIdAndDelete(uid);
        res.status(201).json({
            ok: true,
            msg: 'Usuario eliminado',
            uid
        })
    }catch(error){ 
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};
