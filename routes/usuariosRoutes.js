/**
 * Ruta: /api/usuarios
 */
const { check } = require('express-validator')
const { Router } = require('express')
const { getUsuarios, crearUsuario } = require('../controllers/usuarioControllers');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router()

router.get('/',  getUsuarios );
router.post('/create',
//middelware
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    validarCampos
],

crearUsuario )
module.exports = router;