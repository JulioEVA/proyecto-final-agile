const pagoDao = require("../daos/pagoDAO");

/**
 * Crea un pago.
 * @param {*} req La solicitud HTTP con los datos del pago.
 * @param {*} res La respuesta HTTP.
 */
exports.crearPago = async (req, res) => {
  try {
    const pago = await pagoDao.crearPago(req.body);
    res.status(201).json(pago);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el pago", error });
  }
};

/**
 * Obtiene todos los pagos.
 * @param {*} req La solicitud HTTP.
 * @param {*} res La respuesta HTTP.
 */
exports.obtenerPagos = async (req, res) => {
  try {
    const pagos = await pagoDao.obtenerPagos();
    res.status(200).json(pagos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pagos", error });
  }
};

/**
 * Obtiene un pago por su ID.
 * @param {*} req La solicitud HTTP con el ID del pago.
 * @param {*} res La respuesta HTTP.
 */
exports.obtenerPagoPorId = async (req, res) => {
  try {
    const pago = await pagoDao.obtenerPagoPorId(req.params.id);
    if (!pago) {
      return res.status(404).json({ message: "Pago no encontrado" });
    }
    res.status(200).json(pago);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pago", error });
  }
};

/**
 * Actualiza un pago.
 * @param {*} req La solicitud HTTP con el ID del pago y los datos actualizados.
 * @param {*} res La respuesta HTTP.
 */
exports.actualizarPago = async (req, res) => {
  try {
    const pago = await pagoDao.actualizarPago(req.params.id, req.body);
    if (!pago) {
      return res.status(404).json({ message: "Pago no encontrado" });
    }
    res.status(200).json(pago);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el pago", error });
  }
};

/**
 * Elimina un pago.
 * @param {*} req La solicitud HTTP con el ID del pago.
 * @param {*} res La respuesta HTTP.
 */
exports.eliminarPago = async (req, res) => {
  try {
    const pago = await pagoDao.eliminarPago(req.params.id);
    if (!pago) {
      return res.status(404).json({ message: "Pago no encontrado" });
    }
    res.status(200).json({ message: "Pago eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el pago", error });
  }
};
