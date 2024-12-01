import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync } from 'fs';
import legacy from '@vitejs/plugin-legacy';

/**
 * Función para escanear dinámicamente archivos HTML en un directorio
 * @param {*} directory El directorio a escanear
 * @returns Un objeto con las rutas de los archivos HTML
 */
function getPages(directory) {
  const entries = {};
  const files = readdirSync(directory, { withFileTypes: true });

  files.forEach((file) => {
    if (file.isFile() && file.name.endsWith('.html')) {
      const name = file.name.replace('.html', ''); // Elimina la extensión .html
      entries[name] = resolve(directory, file.name); // Crea la entrada
      console.log(`Página agregada: ${name}`);
    }
  });

  return entries;
}

/**
 * Función para escanear dinámicamente archivos JS en un directorio
 * @param {*} directory El directorio a escanear
 * @returns Un objeto con las rutas de los archivos JS
 */
function getComponents(directory) {
  const entries = {};
  const files = readdirSync(directory, { withFileTypes: true });

  files.forEach((file) => {
    const fullPath = resolve(directory, file.name);

    if (file.isDirectory()) {
      // Llama recursivamente si el archivo es un directorio
      Object.assign(entries, getComponents(fullPath));
    } else if (file.isFile() && file.name.endsWith('.js')) {
      const name = file.name.replace('.js', ''); // Elimina la extensión .js
      entries[name] = fullPath; // Crea la entrada
      console.log(`Componente agregado: ${name}`);
    }
  });

  return entries;
}

/**
 * Configuración de Vite
 */
export default defineConfig({
  // Configuración del servidor de desarrollo
  server: {
    host: true,
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  base: './',
  root: 'src',
  build: {
    outDir: '../dist',
    publicDir: 'public',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        ...getPages(resolve(__dirname, 'src/pages')),
        ...getComponents(resolve(__dirname, 'src/components')),
      },
      /**
       * Configuración de la salida de los archivos
       */
      output: {
        entryFileNames: 'scripts/[name].js',
        chunkFileNames: 'scripts/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(css|js)$/.test(name ?? '')) {
            return 'scripts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
