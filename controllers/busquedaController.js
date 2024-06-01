const { response } = require("express");
const Usuario = require('../models/usuario');
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const getTodo = async (req, res =  response) => {

    const busqueda = req.params.id;
    const regex = new RegExp(busqueda, 'i')// para datos insensibles(es decir que buqeu, sin se explicito)

    // const usuarios =    await Usuario.find({ nombre: regex })
    // const medicos =     await Medico.find({ nombre: regex })
    // const hospitales =  await Hospital.find({ nombre: regex })

    const [usuarios, medicos, hospitales ] = await Promise.all([
        await Usuario.find({ nombre: regex }),
        await Medico.find({ nombre: regex }),
        await Hospital.find({ nombre: regex })
    ])

    res.json({
        ok: true,
        msg: 'getTodo',
        usuarios,
        medicos,
        hospitales
    })
} 

module.exports = { 
    getTodo
}