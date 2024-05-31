const { response } = require("express");

const getHospitales = (req, res = response) => { 
    res.json( { 
        ok: true,
        msg: 'getHospitales'
    })
}

const crearHospital = (req, res = response) => { 
    res.json({ 
        ok: true,
        msg: 'crearHospital'
    })
}

const actualizarHospitales = (req, res = response) => { 
    res.json( { 
        ok: true,
        msg: 'updateHospitales'
    })
}

const eliminarHospitales = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminarHospitales'
    })
}

module.exports = { 
    getHospitales,
    crearHospital,
    actualizarHospitales,
    eliminarHospitales
}