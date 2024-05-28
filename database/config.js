const mongoose = require('mongoose');

const dbConnection  = async () => { 

    try {
        await mongoose.connect('mongodb+srv://mean_user_hospital:ZG7ZxfggVhmTkcP2@cluster0.dbeg0bf.mongodb.net/hospitaldb', { })
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error trying to connect');
    }
}


module.exports = { 
    dbConnection
}