const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection  = async () => { 

    try {
        await mongoose.connect(process.env.DB_CN, { })
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error trying to connect');
    }
}


module.exports = { 
    dbConnection
}