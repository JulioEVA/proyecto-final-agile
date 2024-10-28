const Pago = require("../models/pago");

/**
 * Crea un pago.
 * @param {*} pagoData Los datos del pago.
 * @returns El pago creado.
 */
exports.crearPago = async (pagoData) => {
  const pago = new Pago(pagoData);
  return await pago.save();
};

/**
 * Obtiene todos los pagos.
 * @returns Todos los pagos.
 */
exports.obtenerPagos = async () => {
  return await Pago.find();
};

/**
 * Obtiene un pago por su ID.
 * @param {*} id El ID del pago.
 * @returns El pago si existe, de lo contrario null.
 */
exports.obtenerPagoPorId = async (id) => {
  return await Pago.findById(id);
};

/**
 * Actualiza un pago.
 * @param {*} id El ID del pago.
 * @param {*} pagoData Los datos del pago.
 * @returns El pago actualizado.
 */
exports.actualizarPago = async (id, pagoData) => {
  return await Pago.findByIdAndUpdate(id, pagoData, { new: true });
};

/**
 * Elimina un pago.
 * @param {*} id El ID del pago.
 * @returns El pago eliminado.
 */
exports.eliminarPago = async (id) => {
  return await Pago.findByIdAndDelete(id);
};
