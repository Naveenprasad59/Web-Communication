import globals from "globals";
import { defineConfig } from "eslint/config";
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier rules as lint errors
      'prettier/prettier': 'error',
    },
  },
  // Optional: Apply Prettier config tweaks to avoid conflicts
  {
    rules: {
      ...prettierConfig.rules,
    },
  },
])