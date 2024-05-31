const { Router } = require("express");
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require("../controllers/medicosControllers");

const router = Router();

router.get('/', getMedicos );

router.post('/create', crearMedico);

router.put('/update/:id', actualizarMedico);

router.delete('/delete/:if', eliminarMedico);

module.exports = router;