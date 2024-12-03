import Toasted from 'toastedjs/dist/toasted.min.js';

const toast = new Toasted({
  position: 'top-center',
  duration: 3500,
  theme: 'alive',
});

const Auth = {
  /**
   * Guarda el token en localStorage
   * @param {string} token
   */
  setToken(token) {
    localStorage.setItem('token', token);
  },

  /**
   * Obtiene el token desde localStorage
   * @returns {string | null}
   */
  getToken() {
    return localStorage.getItem('token');
  },

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!this.getToken();
  },

  /**
   * Elimina el token de localStorage para cerrar sesión
   */
  logout() {
    localStorage.removeItem('token');
  },

  /**
   * Maneja redirecciones al login si el usuario no está autenticado
   * @param {Function} onSuccess Callback a ejecutar si está autenticado
   */
  requireAuth(onSuccess) {
    if (!this.isAuthenticated()) {
      toast.error('Debes iniciar sesión para acceder a esta página.');
      window.location.href = '/login'; // Redirige al login
    } else {
      onSuccess();
    }
  },
};

export default Auth;
