const { Router } = require("express");
const { getTodo, getDcoumentsCollection } = require("../controllers/busquedaController");
const { validarJwt } = require("../jwt/jwt");


const router = Router();

router.get('/:id', validarJwt, getTodo);
//FIXME busqueda por coleccion especifiica
router.get('/collection/:tabla/:busqueda', validarJwt, getDcoumentsCollection)

module.exports = router;