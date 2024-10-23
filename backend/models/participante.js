const mongoose = require("mongoose");

const ParticipanteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  numerosApartados: [{ type: mongoose.Schema.Types.ObjectId, ref: "Numero" }],
  numerosPagados: [{ type: mongoose.Schema.Types.ObjectId, ref: "Numero" }],
  sorteos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sorteo" }],
});

module.exports = mongoose.model("Participante", ParticipanteSchema);
