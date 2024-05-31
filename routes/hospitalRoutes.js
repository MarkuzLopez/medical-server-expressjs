/**
 * Hospitales 
 * ruta: /api/hospitales
 */

const { Router } = require("express");
const { validarJwt } = require("../jwt/jwt");
const { getHospitales, crearHospital, actualizarHospitales, eliminarHospitales } = require("../controllers/hospitalController");

const router = Router();

router.get('/',  getHospitales);

router.post('/create', crearHospital);

router.put('/update/:id', actualizarHospitales );

router.delete('/delete/:id', eliminarHospitales);

module.exports = router;