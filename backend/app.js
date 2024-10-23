const express = require("express");
const mongoose = require("mongoose");
const usuarioRoutes = require("./routes/usuario");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/sorteos");

app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
