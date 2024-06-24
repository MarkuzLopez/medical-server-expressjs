const express = require('express');
var cors = require('cors')
const { dbConnection } = require('./database/config');
const { swaggerUi, swaggerSpec } = require('./swagger');

// crea el servidor de express
const app = express();
//CORS
app.use(cors());

// folder public 
app.use(express.static('public'));
// DB
dbConnection();

// Lectura y parseo del body para peticiones POST
app.use(express.json());

//routes:
app.use('/api/usuarios', require('./routes/usuariosRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/hospitales', require('./routes/hospitalRoutes'));
app.use('/api/medicos', require('./routes/medicosRoutes'));
app.use('/api/todo', require('./routes/busquedaRoutes'));
app.use('/api/upload', require('./routes/uploadRoute') );
// Ruta para la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


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