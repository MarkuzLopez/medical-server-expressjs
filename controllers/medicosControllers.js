const { response } = require("express");

const getMedicos = (req, res = response) => { 
    res.json({ 
        ok: true,
        msg: 'getMedicos'
    })
}

const actualizarMedico = (req, res =response) => { 
    res.json({
        ok: true,
        msg: 'actualizarMedicos'
    })
}

const crearMedico = (req, res = response ) => { 
    res.json({
        ok: true,
        msg: 'crearMedicos'
    })
}

const eliminarMedico = (req, res = response) => { 
    res.json({
        ok: true,
        msg: 'eliminarMedicos'
    })
}

module.exports = { 
    getMedicos,
    actualizarMedico,
    crearMedico,
    eliminarMedico
}