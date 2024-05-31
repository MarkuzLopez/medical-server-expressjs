/**
 * Hospitales 
 * ruta: /api/hospitales
 */

const { Router } = require("express");
const { validarJwt } = require("../jwt/jwt");
const { getHospitales, crearHospital, actualizarHospitales, eliminarHospitales } = require("../controllers/hospitalController");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

router.get('/',  getHospitales);

router.post('/create',[
    validarJwt,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
],
crearHospital);

router.put('/update/:id', actualizarHospitales );

router.delete('/delete/:id', eliminarHospitales);

module.exports = router;