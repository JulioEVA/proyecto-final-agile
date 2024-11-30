export function loadNavbar() {
  const navbar = document.createElement('nav');
  navbar.className = 'navbar';
  navbar.innerHTML = `
    <ul>
      <li><a href="/" data-navigo>Inicio</a></li>
      <li><a href="/sorteos" data-navigo>Sorteos</a></li>
      <li><a href="/numeros" data-navigo>Números</a></li>
      <li><a href="/pagos" data-navigo>Pagos</a></li>
    </ul>
  `;
  document.body.prepend(navbar);
}
