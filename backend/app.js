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
const PORT = 3000;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
const uri = `mongodb+srv://julio:${process.env.DB_PASSWORD}@free-cluster.uhnhc.mongodb.net/?retryWrites=true&w=majority&appName=Free-Cluster`;

app.use(express.json());

app.post("/login", login);
//app.use(authMiddleware);

/**
 * Rutas de la API.
 */
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/sorteos", sorteoRoutes);
app.use("/api/participantes", participanteRoutes);
app.use("/api/pagos", pagoRoutes);
app.use("/api/numeros", numeroRoutes);

app.use(errorHandler);

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}
run().catch(console.dir);

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
module.exports = { app, server };
