const { Router } = require("express");
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico, getMedicoById } = require("../controllers/medicosControllers");
const { validarJwt } = require("../jwt/jwt");
const { validarCampos } = require("../middlewares/validarCampos");
const { check } = require("express-validator");

const router = Router();

router.get('/', getMedicos );
router.get('/byId/:id', getMedicoById);

router.post('/create', 
[
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital id debe de ser valido').isMongoId(),// para referencias que utilia uid mongoose
    validarCampos
],
crearMedico);

router.put('/update/:id', validarJwt, actualizarMedico);

router.delete('/delete/:id', validarJwt, eliminarMedico);

module.exports = router;