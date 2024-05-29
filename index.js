const expres = require('express');
var cors = require('cors')
const { dbConnection } = require('./database/config')

// crea el servidor de express
const app = expres();
//CORS
app.use(cors());
// DB
dbConnection();

// Lectura y parseo del body
app.use(express.json());

//routes:
app.use('/api/usuarios', require('./routes/usuariosRoutes'));
// app.get('/', (req, res) => { 
//     res.json({
//         ok: true,
//         msg: 'Hola Mundo'
//     })
// })


app.listen(3000, () => { 
    console.log('Servidor corriendo en el puerto 3000');
})

// ZG7ZxfggVhmTkcP2
// mean_user_hospital 