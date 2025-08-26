import { cp, readFile, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { execa } from 'execa';
import { glob } from 'tinyglobby';
import { afterAll, beforeAll, expect, test } from 'vitest';
import type { ConfigOptions, TypedConfigItem } from '../src/types';

beforeAll(async () => {
  await rm('_fixtures', { recursive: true, force: true });
});

afterAll(async () => {
  await rm('_fixtures', { recursive: true, force: true });
});

function runWithConfig(configs: ConfigOptions, ...items: TypedConfigItem[]) {
  test('lint all files', async () => {
    const input = resolve('fixtures', 'input');
    const output = resolve('fixtures', 'output');
    const target = resolve('_fixtures');

    await cp(input, target, {
      recursive: true,
      filter(source) {
        return !source.includes('node_modules');
      },
    });

    await writeFile(
      join(target, 'eslint.config.ts'),
      `
// @eslint-disable
import { tsImport } from 'tsx/esm/api';

const defineConfig = (await tsImport('@sankeyangshu/eslint-config', import.meta.url)).defineConfig;

export default defineConfig(
  ${JSON.stringify(configs)},
  ...${JSON.stringify(items) ?? []},
)
    `
    );

    await execa('npx', ['eslint', '.', '--fix'], {
      cwd: target,
      stdio: 'pipe',
    });

    const files = await glob('**/*', {
      ignore: ['node_modules', 'eslint.config.ts'],
      cwd: target,
    });

    await Promise.all(
      files.map(async (file) => {
        const content = await readFile(join(target, file), 'utf-8');
        const source = await readFile(join(input, file), 'utf-8');
        const outputPath = join(output, file);

        if (content === source) {
          await rm(outputPath, { force: true });
          return;
        }

        await expect.soft(content).toMatchFileSnapshot(outputPath);
      })
    );
  });
}

runWithConfig({
  astro: true,
  pnpm: false,
  react: true,
  solid: true,
  svelte: true,
  unocss: false,
  vue: true,
});
