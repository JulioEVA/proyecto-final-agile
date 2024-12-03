import Auth from '../Auth/Auth';

export function loadNavbar() {
  const navbar = document.createElement('nav');

  if (!Auth.isAuthenticated()) {
    return;
  }

  navbar.className = 'navbar';
  navbar.innerHTML = `
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="/sorteos">Sorteos</a></li>
      <li><a href="/pagos">Pagos</a></li>
    </ul>
    <button id="btnLogout">Cerrar sesión</button>
  `;
  document.body.prepend(navbar);

  const btnLogout = document.getElementById('btnLogout');
  btnLogout.addEventListener('click', () => {
    Auth.logout();
    window.location.href = '/login';
  });
}
