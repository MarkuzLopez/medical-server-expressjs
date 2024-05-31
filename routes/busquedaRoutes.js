const { Router } = require("express");
const { getTodo } = require("../controllers/busquedaController");
const { validarJwt } = require("../jwt/jwt");


const router = Router();

router.get('/:id', validarJwt, getTodo);

module.exports = router;