import Toasted from 'toastedjs';
import '../../node_modules/toastedjs/dist/toasted.min.css';
import API from '../components/API.js';
import {
  validateDates,
  validateNumbers,
} from '../components/SorteoFormValidator.js';

const form = document.getElementById('crearSorteoForm');
const fillForm = document.getElementById('testFill');

const toast = new Toasted({
  position: 'top-center',
  duration: 3000,
  theme: 'alive',
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const formDataObject = Object.fromEntries(formData);

  if (!validateDates(formDataObject)) {
    toast.show('Las fechas no son válidas');
    return;
  }

  if (!validateNumbers(formDataObject)) {
    toast.show('Los números no son válidos');
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
    toast.show(
      'Error al crear sorteo: ' + error.response.data.error.errorResponse.errmsg
    );
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
