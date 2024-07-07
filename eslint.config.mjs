import babelParser from "@babel/eslint-parser";
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  { ignores: ['**/dist/**', '**/build/**', '**/concept/**', '**/webpack/**', 'eslint.config.mjs', 'eslint.config.mjs', 'vite.config.js'] },
  {
    languageOptions: { 
      globals: globals.browser, 
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 'latest',
        sourceType: 'module',
        babelOptions: {
          configFile: "./babel.config.json"
        } 
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'prefer-const': ['error']
    }
  }
];
