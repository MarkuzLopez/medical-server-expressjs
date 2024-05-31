const { response } = require("express");
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getMedicos = async (req, res = response) => { 
    
    const medicoDB = await Medico.find()
                            .populate('hospital', 'nombre')
                            .populate('usuario', 'nombre img');
    res.json({ 
        ok: true,
        medicoDB
    })
}

const actualizarMedico = (req, res =response) => { 
    res.json({
        ok: true,
        msg: 'actualizarMedicos'
    })
}

const crearMedico = async (req, res = response ) => { 

    // TODO: agregar referemncia de hospital y medicos 
    const uid = req.uid;    
    const { nombre, hospital } = req.body;
    
    try {
        const medico = new Medico({ 
            nombre,
            usuario: uid,
            hospital
        });

        const medicoDB = await medico.save();
        
        res.json({
            ok: true,
            medicoDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
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