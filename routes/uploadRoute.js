const { Router } = require("express");
const { validarJwt } = require("../jwt/jwt");
const { fileUpload, retornarImagen } = require("../controllers/uploadController");

const expressFileUpload = require('express-fileupload');

const router = Router();
//path para validar que suba arhchivos
//middleware para archhivos con form data
router.use( expressFileUpload() )

router.put('/:tipo/:id', validarJwt, fileUpload );
router.get('/:tipo/:foto',  retornarImagen)

module.exports = router
