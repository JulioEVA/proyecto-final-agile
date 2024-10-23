const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nombreUsuario: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, enum: ["organizador", "cliente"], required: true },
  estado: { type: String, enum: ["activo", "inactivo"], default: "activo" },
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
