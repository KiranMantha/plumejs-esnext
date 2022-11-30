import path from 'path';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  base: '/',
  plugins: [
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ],
  build: {
    outDir: 'build',
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.js'),
      name: 'PlumeJS',
      fileName: (format) => `plume.${format}.js`,
      formats: ['es', 'umd', 'iife']
    }
  },
  server: {
    host: true,
    port: 3001,
    open: '/'
  }
});
