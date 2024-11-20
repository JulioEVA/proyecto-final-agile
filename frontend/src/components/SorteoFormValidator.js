export const validateDates = (sorteo) => {
  const fechaActual = new Date();
  const fechaSorteo = new Date(sorteo.fechaSorteo);
  const fechaInicio = new Date(sorteo.fechaInicio);
  const fechaFin = new Date(sorteo.fechaFin);

  if (fechaSorteo <= fechaActual) {
    return {
      isValid: false,
      message: 'La fecha del sorteo debe ser posterior a la fecha actual.',
    };
  }
  if (fechaInicio >= fechaFin) {
    return {
      isValid: false,
      message: 'La fecha de inicio debe ser anterior a la fecha de fin.',
    };
  }
  if (fechaInicio >= fechaSorteo) {
    return {
      isValid: false,
      message: 'La fecha de inicio debe ser anterior a la fecha del sorteo.',
    };
  }
  if (fechaSorteo <= fechaFin) {
    return {
      isValid: false,
      message: 'La fecha del sorteo debe ser posterior a la fecha de fin.',
    };
  }
  return {
    isValid: true,
  };
};

export const validateNumbers = (sorteo) => {
  const rangoNumeros = parseInt(sorteo.rangoNumeros, 10);
  const precioNumero = parseFloat(sorteo.precioNumero);

  return rangoNumeros > 0 && precioNumero >= 0;
};
