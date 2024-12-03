import Navigo from 'navigo';
import Auth from '../Auth/Auth.js';

const router = new Navigo('/');

/**
 * Inicializa el enrutador de la aplicación
 */
export function initRouter() {
  router
    .on('/', () => {
      Auth.requireAuth(async () => {
        await loadPage('../pages/crear-sorteo.html');
      });
    })
    .on('/login', async () => {
      await loadPage('../pages/login.html');
    })
    .on('/sorteos', () => {
      Auth.requireAuth(async () => {
        await loadPage('../pages/listar-sorteos.html');
      });
    })
    .on('/pagos', () => {
      Auth.requireAuth(async () => {
        await loadPage('../pages/crear-pago.html');
      });
    })
    .on('/usuarios', () => {
      Auth.requireAuth(async () => {
        await loadPage('../pages/usuarios.html');
      });
    })
    .on('/listar-numeros', () => {
      Auth.requireAuth(async (params) => {
        const queryParams = new URLSearchParams(window.location.search);
        await loadPage('../pages/listar-numeros.html', queryParams);
      });
    })
    .on('/modificar-sorteo', () => {
      Auth.requireAuth(async (params) => {
        const queryParams = new URLSearchParams(window.location.search);
        await loadPage('../pages/modificar-sorteo.html', queryParams);
      });
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

/**
 * Carga un script de manera dinámica
 * @param {string} scriptPath Ruta del script a cargar
 */
async function loadScript(scriptPath) {
  const scriptBasePath = import.meta.env.BASE_URL || '/'; // Base URL generada por Vite
  const finalPath = `${scriptBasePath}scripts/${scriptPath
    .split('/')
    .pop()
    .replace('.html', '.js')}`;

  // Verificar si el script ya está cargado
  if (document.querySelector(`script[src="${finalPath}"]`)) {
    return; // El script ya está cargado, no hacer nada
  }

  try {
    const scriptElement = document.createElement('script');
    scriptElement.src = finalPath;
    scriptElement.type = 'module';

    // Agregar el script al DOM y esperar que se cargue
    return new Promise((resolve, reject) => {
      scriptElement.onload = resolve;
      scriptElement.onerror = reject;
      document.body.appendChild(scriptElement);
    });
  } catch (error) {
    console.error(`Error al cargar el script: ${finalPath}`, error);
  }
}
