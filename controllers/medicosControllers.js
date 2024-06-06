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

const actualizarMedico = async (req, res =response) => { 

    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const medico = await Medico.findById( id );

        if ( !medico ) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true } );


        res.json({
            ok: true,
            medico: medicoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

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

const eliminarMedico = async (req, res = response) => { 
    const id  = req.params.id;

    try {
        
        const medico = await Medico.findById( id );

        if ( !medico ) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            });
        }

        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Médico borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = { 
    getMedicos,
    actualizarMedico,
    crearMedico,
    eliminarMedico
}