import { ensurePackages, interopDefault } from '../utils';
import type {
  FlatConfigItemType,
  PartialPrettierExtendedOptionsType,
  RequiredRuleBaseOptionsType,
} from '../types';
import { createTypescriptRules } from './typescript';

/**
 * Create a basic configuration for Svelte.
 *
 * @param options Optional options for the config. See {@link RequiredRuleBaseOptionsType} for more
 *   details.
 * @param prettierRules Optional options for prettier. See {@link PartialPrettierExtendedOptionsType}
 *   for more details.
 * @param overrides Optional overrides for the default rules.
 * @returns A list of flat config items.
 */
export async function createSvelteConfig(
  options?: RequiredRuleBaseOptionsType,
  prettierRules: PartialPrettierExtendedOptionsType = {},
  overrides: Record<string, string> = {}
): Promise<FlatConfigItemType[]> {
  if (!options) return [];

  const { files } = options;

  await ensurePackages(['eslint-plugin-svelte', 'svelte-eslint-parser', 'prettier-plugin-svelte']);

  const [pluginSvelte, parserSvelte, pluginTs, pluginPrettier] = await Promise.all([
    interopDefault(import('eslint-plugin-svelte')),
    interopDefault(import('svelte-eslint-parser')),
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('eslint-plugin-prettier')),
  ]);

  const tsRules = await createTypescriptRules();

  const { plugins = [] } = prettierRules;

  const pRules: PartialPrettierExtendedOptionsType = {
    ...prettierRules,
    plugins: plugins.concat('prettier-plugin-svelte'),
  };

  return [
    {
      files,
      languageOptions: {
        parser: parserSvelte,
        parserOptions: {
          extraFileExtensions: ['.svelte'],
          parser: '@typescript-eslint/parser',
          sourceType: 'module',
        },
      },
      plugins: {
        '@typescript-eslint': pluginTs,
        svelte: pluginSvelte,
        prettier: pluginPrettier,
      },
      processor: pluginSvelte.processors.svelte,
      rules: {
        ...tsRules,
        ...(pluginSvelte.configs.recommended.rules as FlatConfigItemType['rules']),
        ...overrides,
        'prettier/prettier': [
          'warn',
          {
            ...pRules,
            parser: 'svelte',
          },
        ],
      },
    },
  ];
}
