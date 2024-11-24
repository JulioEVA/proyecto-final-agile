import API from '../components/API.js';

const tablaNumeros = document.querySelector('#listaNumeros tbody');
const inputNumero = document.querySelector('#numeroFiltro');

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const nombre = urlParams.get('nombre');
const rangoNumeros = urlParams.get('rangoNumeros');
const precioNumero = urlParams.get('precioNumero');

document.querySelector('#nombreSorteo').textContent = nombre;

API.getSorteo(id)
  .then((sorteo) => {
    document.querySelector('#logo').src = sorteo.data.imagenPromocional;
  })
  .catch((error) => {
    console.error(error);
  });

for (let i = 1; i <= rangoNumeros; i++) {
  const tr = document.createElement('tr');

  const tdNumero = document.createElement('td');
  tdNumero.textContent = i;
  tr.appendChild(tdNumero);

  const tdPrecio = document.createElement('td');
  tdPrecio.textContent = `$${precioNumero}`;
  tr.appendChild(tdPrecio);

  const tdEstado = document.createElement('td');
  tdEstado.textContent = 'Libre';
  tr.appendChild(tdEstado);

  const tdAccion = document.createElement('td');
  const btnApartar = document.createElement('button');
  btnApartar.className = 'btn-apartar';
  btnApartar.textContent = 'Apartar';
  btnApartar.disabled = false;
  tdAccion.appendChild(btnApartar);
  tr.appendChild(tdAccion);

  tablaNumeros.appendChild(tr);
}

inputNumero.addEventListener('input', () => {
  const numeros = tablaNumeros.querySelectorAll('tr');
  numeros.forEach((numero) => {
    const numeroFila = numero.querySelector('td:first-child');
    if (numeroFila.textContent.includes(inputNumero.value)) {
      numero.style.display = '';
    } else {
      numero.style.display = 'none';
    }
  });
});
