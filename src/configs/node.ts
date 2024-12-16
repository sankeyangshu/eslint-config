import { interopDefault } from '../utils';
import type { FlatConfigItemType } from '../types';

/**
 * Create a basic configuration for Node.
 *
 * @param overrides Optional overrides for the config.
 * @returns A list of flat config items.
 */
export async function createNodeConfig(
  overrides: Record<string, string> = {}
): Promise<FlatConfigItemType[]> {
  const pluginNode = await interopDefault(import('eslint-plugin-n'));

  return [
    {
      plugins: {
        n: pluginNode,
      },
      rules: {
        'n/handle-callback-err': ['error', '^(err|error)$'],
        'n/no-deprecated-api': 'error',
        'n/no-exports-assign': 'error',
        'n/no-new-require': 'error',
        'n/no-path-concat': 'error',
        'n/prefer-global/buffer': ['error', 'never'],
        'n/prefer-global/process': ['error', 'never'],
        'n/process-exit-as-throw': 'error',

        ...overrides,
      },
    },
  ];
}
