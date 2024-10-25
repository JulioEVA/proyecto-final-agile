const router = require("express").Router();
const numeroController = require("../controllers/numeroController");

router.post("/", numeroController.crearNumero);
router.get("/:sorteoId", numeroController.obtenerNumerosPorSorteo);
router.put("/:id", numeroController.actualizarNumero);
router.delete("/:id", numeroController.eliminarNumero);

module.exports = router;
