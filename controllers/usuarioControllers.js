const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email role google");

  res.json({
    ok: true,
    usuarios,
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

    res.json({
      ok: true,
      msg: "Usuario creado",
      usuario,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
};
