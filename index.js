const expres = require('express');

// crea el servidor de express
const app = expres();


app.listen(3000, () => { 
    console.log('Servidor corriendo en el puerto 3000');
})
