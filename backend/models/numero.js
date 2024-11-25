const mongoose = require("mongoose");

const NumeroSchema = new mongoose.Schema({
  numero: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    enum: ["libre", "apartado", "vendido"],
    default: "libre",
  },
  participanteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Participante",
    default: null,
  },
  sorteoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sorteo",
    default: null,
  },
  fechaApartado: { type: Date },
  precioPagado: { type: Number, default: 0 },
});

module.exports = mongoose.model("Numero", NumeroSchema);
