import API from '../components/API';
import Toasted from 'toastedjs/dist/toasted.min.js';

const Toast = new Toasted({
  position: 'top-center',
  duration: 3500,
});

const formRegistrarPago = document.getElementById('formRegistrarPago');
const dropzone = document.getElementById('dropzone');

let fileBase64 = null; // Guardar archivo en base64

// Manejar el drag and drop
dropzone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropzone.classList.add('dragging');
});

dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('dragging');
});

dropzone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropzone.classList.remove('dragging');
  const file = event.dataTransfer.files[0];
  if (file) {
    convertToBase64(file);
  }
});

// Convertir archivo a base64
function convertToBase64(file) {
  // Verificar el tipo de archivo (solo imágenes permitidas)
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

  if (!validTypes.includes(file.type)) {
    Toast.error('Por favor, sube una imagen válida (.jpg, .jpeg, .png, .webp)');
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    fileBase64 = reader.result;
    dropzone.innerHTML = `<p>Archivo cargado: ${file.name}</p>`;
  };
  reader.onerror = (error) => {
    console.error('Error al leer el archivo: ', error);
  };
}

// Manejar el envío del formulario
formRegistrarPago.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nombreParticipante =
    document.getElementById('nombreParticipante').value;
  const numerosPagados = document
    .getElementById('numerosPagados')
    .value.split(',')
    .map((num) => parseInt(num.trim()));
  const montoTotal = parseFloat(document.getElementById('montoTotal').value);
  const metodoPago = document.getElementById('metodoPago').value;

  const pagoData = {
    participanteId: nombreParticipante,
    numerosPagados,
    montoTotal,
    metodoPago,
    comprobante: fileBase64,
  };

  try {
    await API.createPago(pagoData);
    Toast.success('Pago registrado exitosamente');
    formRegistrarPago.reset();
    dropzone.innerHTML = '<p>Arrastra tu comprobante aquí</p>';
    fileBase64 = null;
    loadPagos(); // Recargar la lista de pagos
  } catch (error) {
    console.error('Error al registrar el pago: ', error);
    Toast.error('Error al registrar el pago');
  }
});

/**
 * Cargar la lista de pagos desde la API
 */
async function loadPagos() {
  try {
    const response = await API.getPagos();
    const pagos = await response.json();

    const tablaPagos = document
      .getElementById('tablaPagos')
      .getElementsByTagName('tbody')[0];
    tablaPagos.innerHTML = ''; // Limpiar tabla

    pagos.forEach((pago) => {
      const row = tablaPagos.insertRow();
      row.innerHTML = `
            <td>${pago.participanteId}</td>
            <td>${pago.numerosPagados.join(', ')}</td>
            <td>${pago.montoTotal}</td>
            <td>${new Date(pago.fechaPago).toLocaleDateString()}</td>
            <td><a href="${
              pago.comprobante
            }" target="_blank">Ver Comprobante</a></td>
          `;
    });
  } catch (error) {
    console.error('Error al cargar los pagos: ', error);
  }
}

loadPagos(); // Cargar pagos al inicio
