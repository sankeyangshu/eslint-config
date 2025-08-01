import { GLOB_ASTRO } from '../constants';
import { parserTypeScript } from '../eslint';
import { ensurePackages, interopDefault } from '../utils';
import type { OptionsFiles, OptionsOverrides, OptionsShareable, TypedConfigItem } from '../types';

/**
 * Options type of {@link configAstro}
 */
export type ConfigAstroOptions = OptionsFiles & OptionsOverrides & OptionsShareable;

/**
 * Creates a basic configuration for Astro.
 *
 * @see {@link https://github.com/ota-meshi/eslint-plugin-astro}
 *
 * @param options - {@link ConfigAstroOptions}
 * @returns A list of flat config items.
 */
export async function createAstroConfig(options: ConfigAstroOptions = {}): Promise<TypedConfigItem[]> {
  await ensurePackages(['eslint-plugin-astro', 'astro-eslint-parser']);

  const [parserAstro, pluginAstro] = await Promise.all([
    interopDefault(import('astro-eslint-parser')),
    interopDefault(import('eslint-plugin-astro')),
  ] as const);

  const { files = [GLOB_ASTRO], extraFileExtensions = [] } = options;

  return [
    {
      name: 'sankeyangshu/astro',
      files,
      plugins: {
        astro: pluginAstro,
      },
      processor: pluginAstro.processors['client-side-ts'],
      languageOptions: {
        parser: parserAstro,
        sourceType: 'module',
        globals: {
          ...pluginAstro.environments.astro.globals,
        },
        parserOptions: {
          extraFileExtensions,
          parser: parserTypeScript,
        },
      },
      rules: {
        'astro/missing-client-only-directive-value': 'error',
        'astro/no-conflict-set-directives': 'error',
        'astro/no-deprecated-astro-canonicalurl': 'error',
        'astro/no-deprecated-astro-fetchcontent': 'error',
        'astro/no-deprecated-astro-resolve': 'error',
        'astro/no-deprecated-getentrybyslug': 'error',
        'astro/no-unused-define-vars-in-style': 'error',
        'astro/valid-compile': 'error',

        // Overrides rules
        ...options.overrides,
      },
    },
  ];
}
