import Toasted from 'toastedjs/dist/toasted.min.js';
import '../../node_modules/toastedjs/dist/toasted.min.css';
import 'material-icons/iconfont/material-icons.css';
import API from '../components/API.js';
import {
  validateDates,
  validateNumbers,
  errorHandler,
} from '../components/SorteoFormValidator.js';

const form = document.getElementById('crearSorteoForm');
const fillForm = document.getElementById('testFill');

const toast = new Toasted({
  position: 'top-center',
  duration: 3500,
  theme: 'alive',
});

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

  toast.show('Creando sorteo...');

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
    await API.createSorteo(sorteo);
    toast.show('Sorteo creado correctamente');
    //form.reset();
  } catch (error) {
    toast.show('Error al crear sorteo: ' + errorHandler(error));
  }
});

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
