export const validateDates = (sorteo) => {
  const fechaActual = new Date();
  const fechaSorteo = new Date(sorteo.fechaSorteo);
  const fechaInicio = new Date(sorteo.fechaInicio);
  const fechaFin = new Date(sorteo.fechaFin);

  return (
    fechaSorteo > fechaActual &&
    fechaInicio < fechaFin &&
    fechaInicio < fechaSorteo &&
    fechaSorteo > fechaFin
  );
};

export const validateNumbers = (sorteo) => {
  const rangoNumeros = parseInt(sorteo.rangoNumeros, 10);
  const precioNumero = parseFloat(sorteo.precioNumero);

  return rangoNumeros > 0 && precioNumero >= 0;
};
