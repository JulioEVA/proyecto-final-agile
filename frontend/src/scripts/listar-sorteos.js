import API from '../components/API.js';
import Toasted from 'toastedjs/dist/toasted.min.js';
import 'material-icons/iconfont/material-icons.css';
import { decodeInput } from '../components/SorteoFormValidator.js';
import '../components/ConfirmationPopup/ConfirmationPopup.js';

const tablaSorteos = document.querySelector('#listaSorteos tbody');

try {
  const loadingMessage = document.createElement('tr');
  const loadingTd = document.createElement('td');
  loadingTd.colSpan = 4;
  loadingTd.textContent = 'Cargando sorteos...';
  loadingMessage.appendChild(loadingTd);
  tablaSorteos.appendChild(loadingMessage);

  const toast = new Toasted({
    position: 'top-center',
    duration: 1000,
    className: 'alive',
  });

  API.getSorteos()
    .then((response) => {
      const sorteos = response.data;
      if (sorteos.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 4;
        td.textContent = 'No hay sorteos disponibles';
        tr.appendChild(td);
        tablaSorteos.appendChild(tr);
      }
      sorteos.forEach((sorteo) => {
        const tr = document.createElement('tr');

        const tdNombre = document.createElement('td');
        tdNombre.classList.add('nombre');
        tdNombre.textContent = decodeInput(sorteo.nombre);
        tr.appendChild(tdNombre);

        const tdDescripcion = document.createElement('td');
        tdDescripcion.classList.add('descripcion');
        tdDescripcion.textContent =
          decodeInput(sorteo.descripcion) || 'No description available';
        tr.appendChild(tdDescripcion);

        const tdFecha = document.createElement('td');
        tdFecha.textContent = sorteo.fechaSorteo.split('T')[0];
        tr.appendChild(tdFecha);

        const tdButton = document.createElement('td');
        const buttonDetalle = document.createElement('button');
        buttonDetalle.classList.add('btn-detalle');
        buttonDetalle.textContent = 'Ver Números';
        buttonDetalle.addEventListener('click', () => {
          window.location.href = `/listar-numeros?id=${sorteo._id}&nombre=${sorteo.nombre}&rangoNumeros=${sorteo.rangoNumeros}&precioNumero=${sorteo.precioNumero}`;
        });
        tdButton.appendChild(buttonDetalle);

        const buttonModificar = document.createElement('button');
        buttonModificar.classList.add('material-icons');
        buttonModificar.classList.add('btn-modificar');
        buttonModificar.textContent = 'edit';
        buttonModificar.addEventListener('click', () => {
          window.location.href = `/modificar-sorteo?nombre=${sorteo.nombre}&descripcion=${sorteo.descripcion}&fechaInicio=${sorteo.fechaInicio}&fechaFin=${sorteo.fechaFin}&fechaSorteo=${sorteo.fechaSorteo}&rangoNumeros=${sorteo.rangoNumeros}&precioNumero=${sorteo.precioNumero}&imagenPromocional=${sorteo.imagenPromocional}&id=${sorteo._id}`;
        });
        tdButton.appendChild(buttonModificar);

        const buttonEliminar = document.createElement('button');
        buttonEliminar.classList.add('material-icons');
        buttonEliminar.classList.add('btn-eliminar');
        buttonEliminar.textContent = 'delete';
        buttonEliminar.addEventListener('click', () => {
          const popup = document.createElement('confirmation-popup');
          popup.addEventListener('confirm', () => {
            API.deleteSorteo(sorteo._id)
              .then(() => {
                popup.remove();
                toast.show('Sorteo eliminado exitosamente');
                tr.remove();
              })
              .catch((error) => {
                console.error(error);
                popup.remove();
                toast.show(
                  'Error al eliminar el sorteo, intenta de nuevo más tarde'
                );
              });
          });
          document.querySelector('#app').appendChild(popup);
        });
        tdButton.appendChild(buttonEliminar);

        tdButton.classList.add('actions-container');
        tr.appendChild(tdButton);

        tablaSorteos.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loadingMessage.remove();
    });
} catch (error) {
  console.error(error);
  toast.error('Error al cargar los sorteos, intenta de nuevo más tarde');
}
