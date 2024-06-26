const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizarImagen");

const fileUpload = async (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  // validar tipo
  const arrayTiposPermit = ["usuarios", "hospitales", "medicos"];
  if (!arrayTiposPermit.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "no esta dentro de los tipos permitidos, verifique",
    });
  }

  // si no existte ningun archivo O viene un archivod dentro de la request.
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningun archivo",
    });
  }

  // TODO procesar la imagen.
  const file = req.files.imagen;
  // console.log(file);
  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  //TODO valida extensions
  const extensionesPermitidas = ["jpg", "png", "jpeg", "gif"];
  if (!extensionesPermitidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "nmo esta dentro de la ext permitidas",
    });
  }

  //todo generar el nombre del archivo uiid + extension archivo
  const nombreArchivo = `${uuidv4() }.${extensionArchivo}`;
  //todo path para guardar la imagen, en el folder creado
  const uploadPath = `./uploads/${ tipo }/${ nombreArchivo}`;
  
   // Use the mv() method to place the file somewhere on your server
  file.mv(uploadPath, (err) => {
    
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al mover la imagen",
      });
    }

    //actualizarImagen(tipo, id, path, nombreArvhivo)
    actualizarImagen(tipo, id, nombreArchivo)

    res.json({
      ok: true,
      msg: "fileUpload",
      nombreArchivo,
    });

  });
  
};

const retornarImagen = (req, res = response) => { 

  const tipo = req.params.tipo;
  const foto =  req.params.foto;
  console.log(tipo);
  console.log(foto, 'assa');

  const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}`);

  //imagen por defectpo.
  if(fs.existsSync(pathImg)) {
    res.sendFile(pathImg)
  } else {
    const pathImg = path.join( __dirname, `../uploads/no-img.jpeg`);
    res.sendFile(pathImg)
  }  

}

module.exports = {
  fileUpload,
  retornarImagen
};
