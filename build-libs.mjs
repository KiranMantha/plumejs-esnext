import path from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const libraries = [
  {
    entry: path.resolve(__dirname, 'src/lib/core/index.js'),
    name: 'plumejs',
    fileName: (format) => `core/index.${format}.js`
  },
  {
    entry: path.resolve(__dirname, 'src/lib/forms/index.js'),
    name: 'plumejs_forms',
    fileName: (format) => `forms/index.${format}.js`
  },
  {
    entry: path.resolve(__dirname, 'src/lib/router/index.js'),
    name: 'plumejs_router',
    fileName: (format) => `router/index.${format}.js`
  }
];

libraries.forEach(async (lib) => {
  await build({
    build: {
      outDir: './build',
      lib: {
        ...lib,
        formats: ['es', 'iife', 'umd']
      },
      emptyOutDir: false
    }
  });
});
