class ConfirmationPopup extends HTMLElement {
  constructor() {
    super();

    // Crear el shadow DOM
    this.attachShadow({ mode: 'open' });

    // Estructura del HTML
    this.shadowRoot.innerHTML = `
        <style>
          .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
  
          .popup {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            text-align: center;
            width: 300px;
          }
  
          .popup button {
            margin: 5px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
  
          .confirm {
            background-color: #ff5252;
            color: white;
          }
  
          .cancel {
            background-color: #ccc;
            color: black;
          }
        </style>
  
        <div class="popup-overlay">
          <div class="popup">
            <p>¿Estás seguro de que deseas realizar esta acción?</p>
            <button class="confirm">Eliminar</button>
            <button class="cancel">Cancelar</button>
          </div>
        </div>
      `;
  }

  connectedCallback() {
    // Obtener los botones del popup
    const confirmButton = this.shadowRoot.querySelector('.confirm');
    const cancelButton = this.shadowRoot.querySelector('.cancel');

    // Evento para confirmar la acción
    confirmButton.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('confirm'));
      this.remove(); // Quitar el popup del DOM
    });

    // Evento para cancelar la acción
    cancelButton.addEventListener('click', () => {
      this.remove(); // Quitar el popup del DOM
    });
  }
}

// Registrar el componente
customElements.define('confirmation-popup', ConfirmationPopup);
