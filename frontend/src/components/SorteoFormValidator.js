/**
 * Validate form fields from sorteo object
 * @param {*} sorteo The sorteo object
 * @returns {object} The validation object
 */
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

/**
 * Validate numbers from form fields
 * @param {*} sorteo The sorteo object
 * @returns {object} The validation object
 */
export const validateNumbers = (sorteo) => {
  const rangoNumeros = parseInt(sorteo.rangoNumeros, 10);
  const precioNumero = parseFloat(sorteo.precioNumero);

  if (isNaN(rangoNumeros) || rangoNumeros <= 0) {
    return {
      isValid: false,
      message: 'El rango de números debe ser un número mayor a 0.',
    };
  }
  if (isNaN(precioNumero) || precioNumero < 0) {
    return {
      isValid: false,
      message: 'El precio por número debe ser un número mayor o igual a 0.',
    };
  }
  return { isValid: true };
};

/**
 * Handle error messages from API
 * @param {*} error The error object
 * @returns {string} The error message
 */
export const errorHandler = (error) => {
  if (error.response) {
    const errorMessage = error.response.data.error.errorResponse.errmsg;

    if (errorMessage.includes('duplicate')) {
      return 'El nombre del sorteo ya existe en la base de datos.';
    }

    if (errorMessage.includes('validation failed')) {
      return 'Error de validación: por favor verifica los datos ingresados.';
    }

    if (errorMessage.includes('Cast to ObjectId failed')) {
      return 'Error de formato: el ID proporcionado no es válido.';
    }

    if (errorMessage.includes('DocumentNotFoundError')) {
      return 'Error: el documento solicitado no se encontró en la base de datos.';
    }

    return errorMessage;
  }

  return 'Error al crear sorteo';
};

/**
 * Sanitize input for API requests
 * @param {*} input The input to sanitize
 * @returns {string} The sanitized input
 */
export const sanitizeInput = (input) => {
  return encodeURIComponent(input);
};

export const decodeInput = (input) => {
  return decodeURIComponent(input);
};
