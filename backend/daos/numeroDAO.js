const Numero = require("../models/numero");
const Sorteo = require("../models/sorteo");

/**
 * Crea un número asociado a un sorteo.
 * @param {*} numeroData Los datos del número y el ID del sorteo.
 * @returns El número creado.
 */
exports.crearNumero = async (numeroData) => {
  const { sorteoId, numero } = numeroData;
  if (!sorteoId || !numero) {
    throw new Error("No se proporcionó el sorteo o el número");
  }
  const nuevoNumero = new Numero({ numero, sorteoId: sorteoId });

  const sorteo = await Sorteo.findById(sorteoId);
  if (!sorteo) {
    throw new Error("Sorteo no encontrado");
  }

  await nuevoNumero.save();

  // Agregar el número al sorteo correspondiente
  sorteo.numeros.push(nuevoNumero);
  await sorteo.save();

  return nuevoNumero;
};

/**
 * Obtiene todos los números de un sorteo.
 * @param {*} sorteoId El ID del sorteo.
 * @returns Los números del sorteo.
 */
exports.obtenerNumerosPorSorteo = async (sorteoId) => {
  return await Numero.find({ sorteo: sorteoId });
};

/**
 * Actualiza un número.
 * @param {*} id El ID del número.
 * @param {*} numeroData Los datos del número.
 * @returns El número actualizado.
 */
exports.actualizarNumero = async (id, numeroData) => {
  return await Numero.findByIdAndUpdate(id, numeroData, { new: true });
};

/**
 * Elimina un número.
 * @param {*} id El ID del número.
 * @returns El número eliminado.
 */
exports.eliminarNumero = async (id) => {
  return await Numero.findByIdAndDelete(id);
};
