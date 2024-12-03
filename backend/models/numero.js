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
    required: true,
  },
  fechaApartado: { type: Date },
  precioPagado: { type: Number, default: 0 },
});

const Numero = mongoose.model("Numero", NumeroSchema);
module.exports = Numero;
