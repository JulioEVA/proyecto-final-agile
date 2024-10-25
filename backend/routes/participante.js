const router = require("express").Router();
const participanteController = require("../controllers/participanteController");

router.get("/", participanteController.obtenerParticipantes);
router.get("/:id", participanteController.obtenerParticipantePorId);
router.post("/", participanteController.crearParticipante);
router.put("/:id", participanteController.actualizarParticipante);
router.delete("/:id", participanteController.eliminarParticipante);

module.exports = router;
