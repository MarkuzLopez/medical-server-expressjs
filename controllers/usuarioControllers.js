const getUsuarios = (req, res) => {
    res.json({
        ok: true,
        usuarios: [{
            id: 123,
            name: 'Markuz'
        }]
    })
}

const crearUsuario = (req, res) => { 
    res.json({ 
        ok: true,
        msg: 'Usuario creado'
    })
}

module.exports = { 
    getUsuarios,
    crearUsuario
}