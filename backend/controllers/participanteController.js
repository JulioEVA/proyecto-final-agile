const participanteDao = require("../daos/participanteDAO");

/**
 * Crea un participante.
 * @param {*} req La solicitud HTTP con los datos del participante.
 * @param {*} res La respuesta HTTP.
 */
exports.crearParticipante = async (req, res) => {
  try {
    const participante = await participanteDao.crearParticipante(req.body);
    res.status(201).json(participante);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el participante", error });
  }
};

/**
 * Obtiene todos los participantes.
 * @param {*} req La solicitud HTTP.
 * @param {*} res La respuesta HTTP.
 */
exports.obtenerParticipantes = async (req, res) => {
  try {
    const participantes = await participanteDao.obtenerParticipantes();
    res.status(200).json(participantes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los participantes", error });
  }
};

/**
 * Obtiene un participante por su ID.
 * @param {*} req La solicitud HTTP con el ID del participante.
 * @param {*} res La respuesta HTTP.
 */
exports.obtenerParticipantePorId = async (req, res) => {
  try {
    const participante = await participanteDao.obtenerParticipantePorId(
      req.params.id
    );
    if (!participante) {
      return res.status(404).json({ message: "Participante no encontrado" });
    }
    res.status(200).json(participante);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el participante", error });
  }
};

/**
 * Actualiza un participante.
 * @param {*} req La solicitud HTTP con el ID del participante y los datos actualizados.
 * @param {*} res La respuesta HTTP.
 */
exports.actualizarParticipante = async (req, res) => {
  try {
    const participante = await participanteDao.actualizarParticipante(
      req.params.id,
      req.body
    );
    if (!participante) {
      return res.status(404).json({ message: "Participante no encontrado" });
    }
    res.status(200).json(participante);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al actualizar el participante", error });
  }
};

/**
 * Elimina un participante.
 * @param {*} req La solicitud HTTP con el ID del participante.
 * @param {*} res La respuesta HTTP.
 */
exports.eliminarParticipante = async (req, res) => {
  try {
    const participante = await participanteDao.eliminarParticipante(
      req.params.id
    );
    if (!participante) {
      return res.status(404).json({ message: "Participante no encontrado" });
    }
    res.status(200).json({ message: "Participante eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el participante", error });
  }
};
