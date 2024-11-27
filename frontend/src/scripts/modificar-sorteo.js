import Toasted from 'toastedjs/dist/toasted.min.js';
import '../../node_modules/toastedjs/dist/toasted.min.css';
import 'material-icons/iconfont/material-icons.css';
import API from '../components/API.js';
import {
  validateDates,
  validateNumbers,
  errorHandler,
} from '../components/SorteoFormValidator.js';

const form = document.getElementById('modificarSorteoForm');
const fillForm = document.getElementById('testFill');
const submitButton = document.getElementById('submitButton');
submitButton.disabled = true;
submitButton.title = 'No hay cambios en el sorteo';

let urlParams,
  nombre,
  descripcion,
  fechaInicio,
  fechaFin,
  fechaSorteo,
  rangoNumeros,
  precioNumero,
  imagenPromocional,
  id;
let initialValues = {};

const toast = new Toasted({
  position: 'top-center',
  duration: 3500,
  theme: 'alive',
});

function fetchURLParams() {
  urlParams = new URLSearchParams(window.location.search);
  nombre = urlParams.get('nombre');
  descripcion = urlParams.get('descripcion');
  fechaInicio = urlParams.get('fechaInicio');
  fechaFin = urlParams.get('fechaFin');
  fechaSorteo = urlParams.get('fechaSorteo');
  rangoNumeros = urlParams.get('rangoNumeros');
  precioNumero = urlParams.get('precioNumero');
  imagenPromocional = urlParams.get('imagenPromocional');
  id = urlParams.get('id');
}

/**
 * Check if form has changed
 * @returns {boolean} true if form has changed, false otherwise
 */
function checkIfFormHasChanged() {
  const formData = new FormData(form);
  const formDataObject = Object.fromEntries(formData);
  return JSON.stringify(formDataObject) !== JSON.stringify(initialValues);
}

try {
  fetchURLParams();
  fillFormFields();
} catch (error) {
  console.error(
    'Error al obtener los parámetros de la URL: ' + errorHandler(error)
  );
  toast.show(
    'Error al obtener los parámetros de la URL, por favor intente de nuevo'
  );
}

/**
 * Fill form fields with URL params
 */
function fillFormFields() {
  form.nombre.value = nombre;
  form.descripcion.value = descripcion;

  form.fechaInicio.value = fechaInicio.split('T')[0];
  form.fechaFin.value = fechaFin.split('T')[0];
  form.fechaSorteo.value = fechaSorteo.split('T')[0];
  form.rangoNumeros.value = rangoNumeros;
  form.precioNumero.value = precioNumero;
  form.imagenPromocional.value = imagenPromocional;
  initialValues = {
    nombre,
    descripcion,
    fechaInicio: form.fechaInicio.value,
    fechaFin: form.fechaFin.value,
    fechaSorteo: form.fechaSorteo.value,
    rangoNumeros,
    precioNumero,
    imagenPromocional,
  };
}

/**
 * Event listener to submit form
 */
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const formDataObject = Object.fromEntries(formData);
  const datesValidation = validateDates(formDataObject);
  const numbersValidation = validateNumbers(formDataObject);

  if (!datesValidation?.isValid) {
    toast.show(datesValidation.message);
    return;
  }

  if (!numbersValidation?.isValid) {
    toast.show(numbersValidation.message);
    return;
  }

  toast.show('Actualizando sorteo...');

  const sorteo = {
    nombre: formData.get('nombre'),
    descripcion: formData.get('descripcion'),
    fechaInicio: new Date(formData.get('fechaInicio')),
    fechaFin: new Date(formData.get('fechaFin')),
    fechaSorteo: new Date(formData.get('fechaSorteo')),
    rangoNumeros: parseInt(formData.get('rangoNumeros'), 10),
    precioNumero: parseFloat(formData.get('precioNumero')),
    imagenPromocional: formData.get('imagenPromocional'),
  };
  try {
    await API.updateSorteo(id, sorteo);
    toast.show('Sorteo actualizado exitosamente, redigiriendo...');
    setTimeout(() => {
      window.location.href = './sorteos.html';
    }, 3000);
    //form.reset();
  } catch (error) {
    toast.show('Error al crear sorteo: ' + errorHandler(error));
  }
});

/**
 * Event listener to enable/disable submit button
 */
form.addEventListener('input', (event) => {
  if (checkIfFormHasChanged()) {
    submitButton.disabled = false;
    submitButton.title = 'Enviar formulario';
  } else {
    submitButton.disabled = true;
    submitButton.title = 'No hay cambios en el formulario';
  }
});

/**
 * Event listener to fill form with test data
 */
fillForm.addEventListener('click', async (event) => {
  event.preventDefault();
  form.nombre.value = 'Sorteo de prueba';
  form.descripcion.value = 'Sorteo de prueba';
  form.fechaInicio.value = '2025-06-01';
  form.fechaFin.value = '2025-06-30';
  form.fechaSorteo.value = '2025-07-01';
  form.rangoNumeros.value = '100';
  form.precioNumero.value = '50';
  form.imagenPromocional.value =
    'https://sorteositson.com/wp-content/uploads/banner-principal-celular.webp';
});
