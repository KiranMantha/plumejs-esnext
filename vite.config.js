import path from 'path';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import viteCompression from 'vite-plugin-compression';

const esbuildCssInline = {
  name: 'css-inline',
  setup(build) {
    build.onResolve({ filter: /\.scss$/ }, ({ path }) => {
      console.log(path);
      return {
        path: path + '?inline',
        external: true
      };
    });
  }
};

export default defineConfig({
  base: './',
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCssInline]
    }
  },
  plugins: [
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: [['@babel/plugin-proposal-decorators', { loose: true, version: '2022-03' }]]
      }
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ],
  build: {
    outDir: 'build',
    emptyOutDir: true,
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
    open: '/',
    middlewareMode: false
  }
});
