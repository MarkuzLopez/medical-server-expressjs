const Usuario = require('../models/usuario');

const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    })
}

const crearUsuario = async (req, res) => {
    
    const usuario =  Usuario(req.body);

    await usuario.save();

    res.json({ 
        ok: true,        
        msg: 'Usuario creado',
        usuario
    })
}

module.exports = { 
    getUsuarios,
    crearUsuario
}