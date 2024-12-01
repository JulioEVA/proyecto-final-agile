export function loadNavbar() {
  const navbar = document.createElement('nav');
  navbar.className = 'navbar';
  navbar.innerHTML = `
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="/sorteos">Sorteos</a></li>
      <li><a href="/pagos">Pagos</a></li>
    </ul>
  `;
  document.body.prepend(navbar);
}
