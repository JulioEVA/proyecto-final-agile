import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync } from 'fs';
import legacy from '@vitejs/plugin-legacy';

// Función para escanear dinámicamente archivos HTML en un directorio
function getPages(directory) {
  const entries = {};
  const files = readdirSync(directory, { withFileTypes: true });

  files.forEach((file) => {
    if (file.isFile() && file.name.endsWith('.html')) {
      const name = file.name.replace('.html', ''); // Elimina la extensión .html
      entries[name] = resolve(directory, file.name); // Crea la entrada
    }
  });

  return entries;
}

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        ...getPages(resolve(__dirname, 'src/pages')), // Agrega dinámicamente páginas de src/pages
        confirmationPopup: resolve(
          __dirname,
          'src/components/ConfirmationPopup/ConfirmationPopup.js'
        ),
      },
    },
  },
});
