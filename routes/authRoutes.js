const { Router } = require('express');
const { loginUser, googleSignIn } = require('../controllers/authController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rutas de authentication
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags: [Auth]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: 'test@gmail.com'
 *               password:
 *                 type: string
 *                 example: 'test@@12312!!'
 
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIi¡
 */
router.post('/login', [
    check("password", "el password es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    validarCampos
], loginUser)

router.post('/googleSignIn', [
    check("token", "el token es obligatorio").not().isEmpty(),
], googleSignIn)

module.exports = router;