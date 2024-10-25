const mongoose = require("mongoose");

const PagoSchema = new mongoose.Schema({
  participanteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Participante",
    required: true,
  },
  numerosPagados: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
  comprobante: { type: String },
  montoTotal: { type: Number, required: true },
  metodoPago: {
    type: String,
    enum: ["tarjeta", "transferencia", "paypal"],
    required: true,
  },
  fechaPago: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pago", PagoSchema);
