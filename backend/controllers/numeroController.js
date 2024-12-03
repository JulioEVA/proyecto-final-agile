const numeroDao = require("../daos/numeroDAO");

/**
 * Crea un nuevo número asociado a un sorteo.
 * @param {*} req La solicitud HTTP con los datos del número y el ID del sorteo.
 * @param {*} res La respuesta HTTP.
 */
exports.crearNumero = async (req, res) => {
  try {
    const numero = await numeroDao.crearNumero(req.body);
    res.status(201).json(numero);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al crear el número", error: error?.message });
  }
};

/**
 * Obtiene todos los números de un sorteo.
 * @param {*} req La solicitud HTTP con el ID del sorteo.
 * @param {*} res La respuesta HTTP.
 */
exports.obtenerNumerosPorSorteo = async (req, res) => {
  try {
    const numeros = await numeroDao.obtenerNumerosPorSorteo(
      req.params.sorteoId
    );
    res.status(200).json(numeros);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los números", error });
  }
};

/**
 * Actualiza un número.
 * @param {*} req La solicitud HTTP con el ID del número y los datos actualizados.
 * @param {*} res La respuesta HTTP.
 */
exports.actualizarNumero = async (req, res) => {
  try {
    const numero = await numeroDao.actualizarNumero(req.params.id, req.body);
    if (!numero) {
      return res.status(404).json({ message: "Número no encontrado" });
    }
    res.status(200).json(numero);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el número", error });
  }
};

/**
 * Elimina un número.
 * @param {*} req La solicitud HTTP con el ID del número.
 * @param {*} res La respuesta HTTP.
 */
exports.eliminarNumero = async (req, res) => {
  try {
    const numero = await numeroDao.eliminarNumero(req.params.id);
    if (!numero) {
      return res.status(404).json({ message: "Número no encontrado" });
    }
    res.status(200).json({ message: "Número eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el número", error });
  }
};
