import Navigo from 'navigo';

const router = new Navigo('/');

/**
 * Inicializa el enrutador de la aplicación
 */
export function initRouter() {
  router
    .on('/', async () => {
      await loadPage('../pages/crear-sorteo.html');
    })
    .on('/sorteos', async () => {
      await loadPage('../pages/listar-sorteos.html');
    })
    .on('/numeros', async () => {
      await loadPage('../pages/listar-numeros.html');
    })
    .on('/pagos', async () => {
      await loadPage('../pages/listar-pagos.html');
    })
    .notFound(() => {
      document.getElementById('app').innerHTML =
        '<h1>404 - Página no encontrada</h1>';
    })
    .resolve();
}

async function loadPage(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error('Página no encontrada');

    const html = await response.text();
    const app = document.getElementById('app');

    // Insertar el contenido HTML
    app.innerHTML = html;

    // Cargar y ejecutar el script correspondiente
    const scriptPath = path.replace('.html', '.js');
    await loadScript(scriptPath);
  } catch (error) {
    document.getElementById('app').innerHTML =
      '<h1>Error al cargar la página</h1>';
    console.error(error);
  }
}

async function loadScript(scriptPath) {
  try {
    const response = await fetch(scriptPath);
    if (!response.ok) return; // Si el script no existe, simplemente lo ignoramos

    const scriptContent = await response.text();
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = scriptContent;

    document.body.appendChild(script);
  } catch (error) {
    console.error(`Error al cargar el script: ${scriptPath}`, error);
  }
}
