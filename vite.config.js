import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.js'),
      name: 'PlumeJS',
      fileName: (format) => `plume.${format}.js`
    }
  },
  server: {
    host: true,
    port: 3001,
    open: '/'
  }
});
