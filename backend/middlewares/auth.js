const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usuarioController = require("../controllers/usuarioController");

const secretKey = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  if (!req.header("Authorization")) {
    return res
      .status(401)
      .send({ error: "Acceso denegado. No se proporcionó token." });
  }
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .send({ error: "Acceso denegado. No se proporcionó token." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.body.nombreUsuario = decoded.nombreUsuario;

    const usuario = await usuarioController.obtenerUsuarioCompleto(req, res);
    if (!usuario) {
      return res.status(401).send({ error: "Autenticación fallida." });
    }

    req.usuario = usuario;
    req.token = token;
    return next();
  } catch (error) {
    res.status(401).send({ error: "Autenticación fallida." });
  }
};

const login = async (req, res) => {
  try {
    const { nombreUsuario, contraseña } = req.body;
    const usuario = await usuarioController.obtenerUsuarioCompleto(req, res);
    if (!(await bcrypt.compare(contraseña, usuario.contraseña))) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos." });
    }
    const token = jwt.sign({ nombreUsuario: nombreUsuario }, secretKey);

    res.status(200).json({ usuario: usuario.nombreUsuario, token });
  } catch (error) {
    res.status(400).json({ message: "Error al iniciar sesión", error });
  }
};

module.exports = { authMiddleware, login };
