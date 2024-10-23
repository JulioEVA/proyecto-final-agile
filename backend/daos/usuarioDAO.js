const Usuario = require("../models/usuario");

/**
 * Crea un usuario.
 * @param {*} usuarioData Los datos del usuario.
 * @returns El usuario creado.
 */
exports.crearUsuario = async (usuarioData) => {
  const usuario = new Usuario(usuarioData);
  return await usuario.save();
};

/**
 * Obtiene todos los usuarios.
 * @returns Todos los usuarios.
 */
exports.obtenerUsuarios = async () => {
  return await Usuario.find();
};

/**
 * Obtiene un usuario por su ID.
 * @param {*} id El ID del usuario.
 * @returns El usuario si existe, de lo contrario null.
 */
exports.obtenerUsuarioPorId = async (id) => {
  return await Usuario.findById(id);
};

/**
 * Actualiza un usuario.
 * @param {*} id El ID del usuario.
 * @param {*} usuarioData Los datos del usuario.
 * @returns El usuario actualizado.
 */
exports.actualizarUsuario = async (id, usuarioData) => {
  return await Usuario.findByIdAndUpdate(id, usuarioData, { new: true });
};

/**
 * Elimina un usuario.
 * @param {*} id El ID del usuario.
 * @returns El usuario eliminado.
 */
exports.eliminarUsuario = async (id) => {
  return await Usuario.findByIdAndDelete(id);
};

/**
 * Obtiene un usuario por su nombre de usuario.
 * @param {*} nombreUsuario El nombre de usuario.
 * @returns El usuario si existe, de lo contrario null.
 */
exports.obtenerUsuarioPorNombre = async (nombreUsuario) => {
  return await Usuario.findOne({ nombreUsuario });
};
