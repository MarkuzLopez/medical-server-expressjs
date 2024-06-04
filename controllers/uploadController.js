const { response } = require("express");


const fileUpload = async (req, res =  response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // validar tipo
    const arrayTiposPermit = ['usuarios', 'hospitales', 'medicos'];    
    if(!arrayTiposPermit.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'no esta dentro de los tipos permitidos, verifique'
        })
    }

    // si no existte ningun archivo O viene un archivod dentro de la request.
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo',
        })
      }

    // TODO procesar la imagen.

    res.json({ 
        ok: true,
        msg: 'fileUpload'
    })

}

module.exports = { 
    fileUpload
}