// Obtener los elementos del DOM
const btnRegistrar = document.querySelector('.btn-register');
const modal = document.getElementById('modalRegistro');
const closeModal = document.getElementById('closeModal');

// Obtener los elementos del DOM
const btnVerificar = document.querySelector('.btn-verify');
const modalVerificar = document.getElementById('modalVerificar');
const closeModalVerificar = document.getElementById('closeModalVerificar');

// Función para abrir el modal
btnRegistrar.addEventListener('click', () => {
  modal.style.display = 'flex';
});

// Función para cerrar el modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Función para cerrar el modal si haces clic fuera de él
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Función para abrir el modal
btnVerificar.addEventListener('click', () => {
  modalVerificar.style.display = 'flex';
});

// Función para cerrar el modal
closeModalVerificar.addEventListener('click', () => {
  modalVerificar.style.display = 'none';
});

// Función para cerrar el modal si haces clic fuera de él
window.addEventListener('click', (event) => {
  if (event.target === modalVerificar) {
    modalVerificar.style.display = 'none';
  }
});

