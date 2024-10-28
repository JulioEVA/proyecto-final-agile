const router = require("express").Router();
const sorteoController = require("../controllers/sorteoController");

router.post("/", sorteoController.crearSorteo);
router.get("/", sorteoController.obtenerSorteos);
router.get("/:id", sorteoController.obtenerSorteoPorId);
router.put("/:id", sorteoController.actualizarSorteo);
router.delete("/:id", sorteoController.eliminarSorteo);

module.exports = router;
