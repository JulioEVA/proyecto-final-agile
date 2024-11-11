const mongoose = require("mongoose");
const { validateDate } = require("../utils/validators");

const SorteoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String },
  fechaInicio: {
    type: Date,
    required: true,
    validate: {
      validator: validateDate,
      message: "Fecha de inicio no puede estar en el pasado",
    },
  },
  fechaFin: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return validateDate(value) && value > this.fechaInicio;
      },
      message:
        "Fecha de fin no puede estar en el pasado, ni ser antes de la fecha de inicio",
    },
  },
  fechaSorteo: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return (
          validateDate(value) &&
          value > this.fechaInicio &&
          !(value <= this.fechaFin) // No puede haber sorteo antes de que se termine la venta de números
        );
      },
      message:
        "Fecha de sorteo no puede estar en el pasado, ni ser antes de la fecha de inicio o fin",
    },
  },
  rangoNumeros: {
    type: Number,
    required: true,
    min: [1, "El sorteo debe tener al menos un número"],
  },
  precioNumero: {
    type: Number,
    required: true,
    min: [0, "El precio no puede ser negativo"],
    set: (value) => Math.floor(value * 100) / 100, // Redondear a 2 decimales
  },
  imagenPromocional: { type: String },
  estado: { type: String, enum: ["activo", "finalizado"], default: "activo" },
  numeros: [{ type: mongoose.Schema.Types.ObjectId, ref: "Numero" }], // Subdocumentos para los números del sorteo
});

const Sorteo = mongoose.model("Sorteo", SorteoSchema);
module.exports = Sorteo;
