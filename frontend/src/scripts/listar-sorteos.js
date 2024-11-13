import API from '../components/API.js';

const tablaSorteos = document.querySelector('#listaSorteos tbody');

window.onload = () => {
  try {
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
          tdNombre.textContent = sorteo.nombre;
          tr.appendChild(tdNombre);

          const tdDescripcion = document.createElement('td');
          tdDescripcion.classList.add('descripcion');
          tdDescripcion.textContent =
            sorteo.descripcion || 'No description available';
          tr.appendChild(tdDescripcion);

          const tdFecha = document.createElement('td');
          tdFecha.textContent = sorteo.fechaSorteo.split('T')[0];
          tr.appendChild(tdFecha);

          const tdButton = document.createElement('td');
          const buttonDetalle = document.createElement('button');
          buttonDetalle.classList.add('btn-detalle');
          buttonDetalle.textContent = 'Ver Números';
          tdButton.appendChild(buttonDetalle);
          tr.appendChild(tdButton);

          tablaSorteos.appendChild(tr);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {}
};
