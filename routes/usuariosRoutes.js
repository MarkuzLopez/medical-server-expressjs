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

router.get("/", validarJwt, getUsuarios);
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

router.put(
  "/update/:id",
  check("nombre", "El nombre es obligatorio").not().isEmpty(),  
  check("email", "el email es obligatorio").isEmail(),
  check('role', 'el role es obligatorio').not().isEmpty(),
  validarJwt,
  actualizarUsuario
);

router.delete('/delete/:id', validarJwt, eliminarUsuario)

module.exports = router;
