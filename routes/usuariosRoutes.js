/**
 * Ruta: /api/usuarios
 */
const { check } = require("express-validator");
const { Router } = require("express");

const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarioControllers");

const { validarCampos } = require("../middlewares/validarCampos");
const { validarJwt } = require("../jwt/jwt");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Rutas de usuarios
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Retorna una lista de usuarios
 *     tags: [Usuarios]
 *     security: 
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  uid:
 *                     type: integer
 *                     example: 665792b988df1066d24615c5
 *                  nombre:
 *                     type: string
 *                     example: 'Markuz'
 *                  email:
 *                     type: string
 *                     example: 'test@gmail.com'
 *                  google:
 *                     type: boolean
 *                     example: false
 *                  role:
 *                     type: string
 *                     example: USER_ROLe
 */
router.get("/", validarJwt, getUsuarios);
/**
 * @swagger
 * /usuarios/create:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: 'Jane Doe'
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
 *                 uid:
 *                   type: integer
 *                   example: 665792b988df1066d24615c5
 *                 nombre:
 *                   type: string
 *                   example: Jane Doe
 *                 email:
 *                   type: string
 *                   example: 'test@gmail'
 *                 role:
 *                   type: string
 *                   example: 'USER_ROLE'
 *                 google:
 *                   type: boolean
 *                   example: false
 */
router.post(
  "/create",
  //middelware
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "el password es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    validarCampos,
  ],

  crearUsuario
);
/**
 * @swagger
 * /usuarios/update/{uid}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Usuarios]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: UID del usuario a actualizar
 *       - in: header
 *         name: x-token
 *         required: false
 *         schema:
 *           type: string
 *         description: Token de autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: 'Jane Doe'
 *               email:
 *                 type: string
 *                 example: 'test@gmail.com'
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: integer
 *                   example: 665792b988df1066d24615c5
 *                 nombre:
 *                   type: string
 *                   example: Jane Doe
 *                 email:
 *                   type: string
 *                   example: 'test@gmail'
 *                 role:
 *                   type: string
 *                   example: 'USER_ROLE'
 *                 google:
 *                   type: boolean
 *                   example: false
 */
router.put(
  "/update/:id",
  check("nombre", "El nombre es obligatorio").not().isEmpty(),  
  check("email", "el email es obligatorio").isEmail(),
  check('role', 'el role es obligatorio').not().isEmpty(),
  validarJwt,
  actualizarUsuario
);
/**
 * @swagger
 * /usuarios/delete/{uid}:
 *   delete:
 *     summary: Elimina usuario
 *     tags: [Usuarios]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: UID del usuario a eliminar
 *       - in: header
 *         name: x-token
 *         required: false
 *         schema:
 *           type: string
 *         description: Token de autenticación'
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: integer
 *                   example: 665792b988df1066d24615c5
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Usuario eliminado,
 */

router.delete('/delete/:id', validarJwt, eliminarUsuario)

module.exports = router;
