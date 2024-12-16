import { interopDefault } from '../utils';
import type { FlatConfigItemType } from '../types';

/**
 * Create a basic configuration for imports.
 *
 * @param overrides Optional overrides for the config.
 * @returns A list of flat config items.
 */
export async function createImportsConfig(
  overrides: Record<string, string> = {}
): Promise<FlatConfigItemType[]> {
  const pluginImport = await interopDefault(import('eslint-plugin-import-x'));

  return [
    {
      plugins: {
        import: pluginImport,
      },
      rules: {
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/order': 'off',

        ...overrides,
      },
    },
  ];
}
