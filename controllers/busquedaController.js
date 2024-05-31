const { response } = require("express");

const getTodo = (req, res =  response) => {

    console.log(req.params, 'params');
    const busqueda = req.params.id

    res.json({
        ok: true,
        msg: 'getTodo',
        busqueda
    })
} 

module.exports = { 
    getTodo
}