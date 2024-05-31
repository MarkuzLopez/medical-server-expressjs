const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = (req, res = response) => { 
    res.json( { 
        ok: true,
        msg: 'getHospitales'
    })
}

const crearHospital = async (req, res = response) => { 

    const uid = req.uid;

    try {

        const hospital = new Hospital({
            usuario: uid,
            ...req.body
        })

        await hospital.save();

        res.json({ 
            ok: true,
            hospital
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

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