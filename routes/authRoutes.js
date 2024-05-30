const { Router } = require('express');
const { loginUser } = require('../controllers/authController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.post('/login', [
    check("password", "el password es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    validarCampos
], loginUser)

module.exports = router;