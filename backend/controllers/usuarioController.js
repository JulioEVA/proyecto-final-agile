const usuarioDao = require("../daos/usuarioDAO");
const bcrypt = require("bcrypt");

/**
 * Crea un usuario.
 * @param {*} req La solicitud HTTP con los datos del usuario.
 * @param {*} res La respuesta HTTP.
 */
exports.crearUsuario = async (req, res) => {
  try {
    await bcrypt.hash(req.body.contraseña, 10).then((hash) => {
      req.body.contraseña = hash;
    });
    const usuario = await usuarioDao.crearUsuario(req.body);
    usuario["contraseña"] = undefined;
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el usuario", error });
  }
};

/**
 * Obtiene todos los usuarios.
 * @param {*} req La solicitud HTTP.
 * @param {*} res La respuesta HTTP.
 */
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioDao.obtenerUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
};

/**
 * Obtiene un usuario por su ID.
 * @param {*} req La solicitud HTTP con el ID del usuario.
 * @param {*} res La respuesta HTTP.
 */
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await usuarioDao.obtenerUsuarioPorId(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

/**
 * Actualiza un usuario.
 * @param {*} req La solicitud HTTP con el ID del usuario y los datos actualizados.
 * @param {*} res La respuesta HTTP.
 */
exports.actualizarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioDao.actualizarUsuario(req.params.id, req.body);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el usuario", error });
  }
};

/**
 * Elimina un usuario.
 * @param {*} req La solicitud HTTP con el ID del usuario.
 * @param {*} res La respuesta HTTP.
 */
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioDao.eliminarUsuario(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};

/**
 * Obtiene un usuario por su nombre de usuario.
 * @param {*} req La solicitud HTTP con el nombre de usuario.
 * @param {*} res La respuesta HTTP.
 */
exports.obtenerUsuarioPorNombre = async (req, res) => {
  try {
    const usuario = await usuarioDao.obtenerUsuarioPorNombre(
      req.params.nombreUsuario
    );
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

/**
 * Inicia sesión.
 * @param {*} req La solicitud HTTP con el nombre de usuario y la contraseña.
 * @param {*} res La respuesta HTTP.
 */
exports.obtenerUsuarioCompleto = async (req, res) => {
  const { nombreUsuario } = req.body;
  try {
    const usuario = await usuarioDao.obtenerUsuarioCompleto(nombreUsuario);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return usuario;
  } catch (error) {
    res.status(400).json({ message: "Error al iniciar sesión", error });
  }
};
