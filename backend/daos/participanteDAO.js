const Participante = require("../models/participante");

/**
 * Crea un participante.
 * @param {*} participanteData Los datos del participante.
 * @returns El participante creado.
 */
exports.crearParticipante = async (participanteData) => {
  const participante = new Participante(participanteData);
  return await participante.save();
};

/**
 * Obtiene todos los participantes.
 * @returns Todos los participantes.
 */
exports.obtenerParticipantes = async () => {
  return await Participante.find();
};

/**
 * Obtiene un participante por su ID.
 * @param {*} id El ID del participante.
 * @returns El participante si existe, de lo contrario null.
 */
exports.obtenerParticipantePorId = async (id) => {
  return await Participante.findById(id);
};

/**
 * Actualiza un participante.
 * @param {*} id El ID del participante.
 * @param {*} participanteData Los datos del participante.
 * @returns El participante actualizado.
 */
exports.actualizarParticipante = async (id, participanteData) => {
  return await Participante.findByIdAndUpdate(id, participanteData, {
    new: true,
  });
};

/**
 * Elimina un participante.
 * @param {*} id El ID del participante.
 * @returns El participante eliminado.
 */
exports.eliminarParticipante = async (id) => {
  return await Participante.findByIdAndDelete(id);
};
