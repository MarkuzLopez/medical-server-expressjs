const Usuario = require("../models/usuario");

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email role google");

  res.json({
    ok: true,
    usuarios,
  });
};

const crearUsuario = async (req, res) => {
  const { email } = req.body;

  try {
    const emailExist = Usuario.findOne({ email });

    if (emailExist) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }

    const usuario = Usuario(req.body);
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
