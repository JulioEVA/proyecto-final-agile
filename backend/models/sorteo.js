const mongoose = require("mongoose");
const { validateDate } = require("../utils/validators");

const SorteoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  fechaInicio: {
    type: Date,
    required: true,
    validate: {
      validator: validateDate,
      message: "Fecha de inicio no puede estar en el pasado",
    },
  },
  fechaFin: { type: Date, required: true },
  fechaSorteo: { type: Date, required: true },
  rangoNumeros: { type: Number, required: true },
  precioNumero: { type: Number, required: true },
  imagenPromocional: { type: String },
  estado: { type: String, enum: ["activo", "finalizado"], default: "activo" },
  numeros: [{ type: mongoose.Schema.Types.ObjectId, ref: "Numero" }], // Subdocumentos para los números del sorteo
});

module.exports = mongoose.model("Sorteo", SorteoSchema);
