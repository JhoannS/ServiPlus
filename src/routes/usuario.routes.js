const { Router } = require("express");
const router = Router();

const {
  renderRegistroForm,
  renderLoginForm,
  Registro,
  Login,
  CerrarSesion,
} = require("../controllers/usuario.controller");

router.get("/registro", renderRegistroForm);
router.post("/registro", Registro);

router.get("/", renderLoginForm);
router.post("/", Login);

router.post("/cerrarSesion", CerrarSesion)

module.exports = router;
