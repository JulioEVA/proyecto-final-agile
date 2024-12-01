import { loadNavbar } from '../components/Navbar/Navbar.js';
import { initRouter } from '../components/Router/Router.js';

/**
 * Inicializa la aplicación
 */
document.addEventListener('DOMContentLoaded', () => {
  loadNavbar();
  initRouter();
});
