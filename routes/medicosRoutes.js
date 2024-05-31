const { Router } = require("express");
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require("../controllers/medicosControllers");
const { validarJwt } = require("../jwt/jwt");
const { validarCampos } = require("../middlewares/validarCampos");
const { check } = require("express-validator");

const router = Router();

router.get('/', getMedicos );

router.post('/create', 
[
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],
crearMedico);

router.put('/update/:id', actualizarMedico);

router.delete('/delete/:if', eliminarMedico);

module.exports = router;