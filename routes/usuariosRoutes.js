/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express')
const { getUsuarios, crearUsuario } = require('../controllers/usuarioControllers');

const router = Router()

router.get('/',  getUsuarios );
router.post('/create', crearUsuario )
module.exports = router;