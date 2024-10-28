const Sorteo = require("../models/sorteo");

/**
 * Crea un sorteo.
 * @param {*} sorteoData Los datos del sorteo.
 * @returns El sorteo creado.
 */
exports.crearSorteo = async (sorteoData) => {
  const sorteo = new Sorteo(sorteoData);
  return await sorteo.save();
};

/**
 * Obtiene todos los sorteos.
 * @returns Todos los sorteos.
 */
exports.obtenerSorteos = async () => {
  return await Sorteo.find();
};

/**
 * Obtiene un sorteo por su ID.
 * @param {*} id El ID del sorteo.
 * @returns El sorteo si existe, de lo contrario null.
 */
exports.obtenerSorteoPorId = async (id) => {
  return await Sorteo.findById(id);
};

/**
 * Actualiza un sorteo.
 * @param {*} id El ID del sorteo.
 * @param {*} sorteoData Los datos del sorteo.
 * @returns El sorteo actualizado.
 */
exports.actualizarSorteo = async (id, sorteoData) => {
  return await Sorteo.findByIdAndUpdate(id, sorteoData, { new: true });
};

/**
 * Elimina un sorteo.
 * @param {*} id El ID del sorteo.
 * @returns El sorteo eliminado.
 */
exports.eliminarSorteo = async (id) => {
  return await Sorteo.findByIdAndDelete(id);
};
