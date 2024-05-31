const { Schema, model } = require("mongoose");

const HospitalSchema = Schema({ 
    name: {
        type: String,
        required: true,        
    },
    img: {
        type: String        
    },
    usuario: { 
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    }
})

HospitalSchema.method('toJSON', function() { 
    const { __v, ...object } = this.toObject();
    return object
}, { collection: 'hospitales' } )
//TODO collection es para renombrar el documento en la BD.

module.exports = model('Hospital', HospitalSchema);