import { defineConfig } from '../src';

export default defineConfig({
  astro: true,
  ignores: ['fixtures', '_fixtures', '**/constants-generated.ts'],
  pnpm: false,
  react: true,
  solid: true,
  svelte: true,
  unocss: false,
  vue: true,
});
