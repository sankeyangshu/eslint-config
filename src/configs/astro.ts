import { GLOB_ASTRO } from '../constants';
import type {
  FlatConfigItemType,
  PartialPrettierExtendedOptionsType,
  RequiredRuleBaseOptionsType,
} from '../types';
import { ensurePackages, interopDefault } from '../utils';
import { createTypescriptRules } from './typescript';

/**
 * Creates a basic configuration for Astro.
 *
 * @param options Optional options for the config.
 * @param prettierRules Optional options for prettier.
 * @param overrides Optional overrides for the config.
 * @returns A list of flat config items.
 */
export async function createAstroConfig(
  options?: RequiredRuleBaseOptionsType,
  prettierRules: PartialPrettierExtendedOptionsType = {},
  overrides: Record<string, string> = {}
): Promise<FlatConfigItemType[]> {
  if (!options) return [];

  const { files = [GLOB_ASTRO] } = options;

  await ensurePackages(['eslint-plugin-astro', 'astro-eslint-parser', 'prettier-plugin-astro']);

  const [pluginAstro, pluginTs, pluginPrettier] = await Promise.all([
    interopDefault(import('eslint-plugin-astro')),
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('eslint-plugin-prettier')),
  ]);

  const tsRules = await createTypescriptRules();

  const { plugins = [] } = prettierRules;

  const pRules: PartialPrettierExtendedOptionsType = {
    ...prettierRules,
    plugins: plugins.concat('prettier-plugin-astro'),
  };

  return [
    ...(pluginAstro.configs.recommended as FlatConfigItemType[]),
    {
      files,
      plugins: {
        '@typescript-eslint': pluginTs,
        prettier: pluginPrettier,
      },
      rules: {
        ...tsRules,
        ...overrides,
        'prettier/prettier': [
          'warn',
          {
            ...pRules,
            parser: 'astro',
          },
        ],
      },
    },
  ];
}
