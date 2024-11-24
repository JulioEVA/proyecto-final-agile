import { defineConfig } from 'vite';
import { resolve } from 'path';
import legacy from '@vitejs/plugin-legacy';

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
        numeros: resolve(__dirname, 'src/pages/numeros.html'),
        sorteos: resolve(__dirname, 'src/pages/sorteos.html'),
      },
    },
  },
});
