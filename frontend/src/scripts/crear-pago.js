import API from '../components/API';
import Toasted from 'toastedjs/dist/toasted.min.js';
import '../../node_modules/toastedjs/dist/toasted.min.css';

const Toast = new Toasted({
  position: 'top-center',
  duration: 3500,
  theme: 'alive',
  containerId: 'app',
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
    nombreParticipante,
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
    const pagos = response.data;

    const tablaPagos = document
      .getElementById('tablaPagos')
      .getElementsByTagName('tbody')[0];
    tablaPagos.innerHTML = ''; // Limpiar tabla

    if (pagos.length === 0) {
      const row = tablaPagos.insertRow();
      row.innerHTML = '<td colspan="5">No hay pagos registrados</td>';
      return;
    }

    pagos.forEach((pago) => {
      const row = tablaPagos.insertRow();

      let viewLink = 'No disponible';
      if (pago.comprobante) {
        viewLink = `<a href="#" class="ver-comprobante" data-image="${pago.comprobante}">Ver Comprobante</a>`;
      }
      row.innerHTML = `
          <td>${pago.nombreParticipante}</td>
          <td>${pago.numerosPagados.join(', ')}</td>
          <td>${pago.montoTotal}</td>
          <td>${new Date(pago.fechaPago).toLocaleDateString()}</td>
          <td>${viewLink}</td>
        `;
    });

    // Agregar un listener para los enlaces "Ver Comprobante"
    document.querySelectorAll('.ver-comprobante').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const imageUri = event.target.getAttribute('data-image');
        showImagePopup(imageUri); // Mostrar la imagen en un popup
      });
    });
  } catch (error) {
    console.error('Error al cargar los pagos: ', error);
  }
}

function showImagePopup(imageUri) {
  // Crear el modal de imagen
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';

  // Crear la imagen dentro del modal
  const image = document.createElement('img');
  image.src = imageUri; // Esta es la cadena base64 que se pasa como URI de imagen
  image.style.maxWidth = '90%';
  image.style.maxHeight = '90%';
  image.style.border = '1px solid white';

  // Crear un botón de cerrar
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Cerrar';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '20px';
  closeButton.style.right = '20px';
  closeButton.style.border = 'none';
  closeButton.style.padding = '10px';
  closeButton.style.cursor = 'pointer';

  closeButton.addEventListener('click', () => {
    document.body.removeChild(modal); // Cerrar el modal
  });

  modal.appendChild(image);
  modal.appendChild(closeButton);

  // Agregar el modal al body
  document.body.appendChild(modal);
}

loadPagos(); // Cargar pagos al inicio
