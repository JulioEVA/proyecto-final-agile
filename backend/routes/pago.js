const router = require("express").Router();
const pagoController = require("../controllers/pagoController");

router.get("/", pagoController.obtenerPagos);
router.get("/:id", pagoController.obtenerPagoPorId);
router.post("/", pagoController.crearPago);
router.put("/:id", pagoController.actualizarPago);
router.delete("/:id", pagoController.eliminarPago);

module.exports = router;
