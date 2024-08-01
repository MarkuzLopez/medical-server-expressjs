const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = async (req, res = response) => {
    const hospitales = await Hospital.find()
                                .populate('usuario', 'nombre img')
                                //populate para identificcar otra collexion
                                // ('collection', 'campos ')
    try {
        res.json( { 
            ok: true,
            hospitales
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
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

const actualizarHospitales = async (req, res = response) => { 
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id',
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true } );


        res.json({
            ok: true,
            hospital: hospitalActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const eliminarHospitales = async (req, res = response) => {
    const id  = req.params.id;

    try {
        
        const hospital = await Hospital.findById( id );

        if ( !hospital ) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id',
            });
        }

        await Hospital.findByIdAndDelete( id );


        res.json({
            ok: true,
            msg: 'Hospital eliminado'
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
    getHospitales,
    crearHospital,
    actualizarHospitales,
    eliminarHospitales
}