const sorteoDao = require("../daos/sorteoDAO");

/**
 * Crea un sorteo.
 * @param {*} req La solicitud HTTP con los datos del sorteo.
 * @param {*} res La respuesta HTTP.
 */
exports.crearSorteo = async (req, res) => {
  try {
    const sorteo = await sorteoDao.crearSorteo(req.body);
    res.status(201).json(sorteo);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el sorteo", error });
  }
};

/**
 * Obtiene todos los sorteos.
 * @param {*} req La solicitud HTTP.
 * @param {*} res La respuesta HTTP.
 */
exports.obtenerSorteos = async (req, res) => {
  try {
    const sorteos = await sorteoDao.obtenerSorteos();
    res.status(200).json(sorteos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los sorteos", error });
  }
};

/**
 * Obtiene un sorteo por su ID.
 * @param {*} req La solicitud HTTP con el ID del sorteo.
 * @param {*} res La respuesta HTTP.
 */
exports.obtenerSorteoPorId = async (req, res) => {
  try {
    const sorteo = await sorteoDao.obtenerSorteoPorId(req.params.id);
    if (!sorteo) {
      return res.status(404).json({ message: "Sorteo no encontrado" });
    }
    res.status(200).json(sorteo);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el sorteo", error });
  }
};

/**
 * Actualiza un sorteo.
 * @param {*} req La solicitud HTTP con el ID del sorteo y los datos actualizados.
 * @param {*} res La respuesta HTTP.
 */
exports.actualizarSorteo = async (req, res) => {
  try {
    const sorteo = await sorteoDao.actualizarSorteo(req.params.id, req.body);
    if (!sorteo) {
      return res.status(404).json({ message: "Sorteo no encontrado" });
    }
    res.status(200).json(sorteo);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el sorteo", error });
  }
};

/**
 * Elimina un sorteo.
 * @param {*} req La solicitud HTTP con el ID del sorteo.
 * @param {*} res La respuesta HTTP.
 */
exports.eliminarSorteo = async (req, res) => {
  try {
    const sorteo = await sorteoDao.eliminarSorteo(req.params.id);
    if (!sorteo) {
      return res.status(404).json({ message: "Sorteo no encontrado" });
    }
    res.status(200).json({ message: "Sorteo eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el sorteo", error });
  }
};
