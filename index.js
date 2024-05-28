const expres = require('express');
const { dbConnection } = require('./database/config')

// crea el servidor de express
const app = expres();

// DB
dbConnection();

app.get('/', (req, res) => { 
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
})


app.listen(3000, () => { 
    console.log('Servidor corriendo en el puerto 3000');
})

// ZG7ZxfggVhmTkcP2
// mean_user_hospital 