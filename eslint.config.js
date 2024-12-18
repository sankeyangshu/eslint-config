import { require } from 'tsx/cjs/api';

// /** @type {{ defineConfig: import('./src/index.ts').defineConfig }} */
const { defineConfig } = require('./src/index.ts', import.meta.url);

export default defineConfig({
  vue: true,
  react: true,
  solid: true,
  svelte: true,
  astro: true,
  unocss: false,
  ignores: ['fixtures', '_fixtures'],
  formatter: {
    html: true,
    css: true,
    markdown: true,
    yaml: true,
    toml: true,
  },
  overrides: {
    'vue/multi-word-component-names': 'off',
  },
});
