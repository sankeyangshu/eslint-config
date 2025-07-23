import { green } from 'ansis';
import { defineConfig } from 'tsdown';
import { generateTypes } from './scripts/typegen';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  hooks: {
    'build:before': async () => {
      console.info(`${green('TYPES')} start generating types...`);
      await generateTypes();
      console.info(`${green('TYPES')} generated success.`);
    },
  },
});
