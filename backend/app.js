const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

/**
 * Imports locales
 */
const usuarioRoutes = require("./routes/usuario");
const sorteoRoutes = require("./routes/sorteo");
const participanteRoutes = require("./routes/participante");
const pagoRoutes = require("./routes/pago");
const numeroRoutes = require("./routes/numero");
const errorHandler = require("./middlewares/errors");
const { login, authMiddleware } = require("./middlewares/auth");

const app = express();
dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/sorteosdb");
app.use(express.json());

app.post("/login", login);
app.use(authMiddleware);

/**
 * Rutas de la API.
 */
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/sorteos", sorteoRoutes);
app.use("/api/participantes", participanteRoutes);
app.use("/api/pagos", pagoRoutes);
app.use("/api/numeros", numeroRoutes);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

module.exports = { app, server };
