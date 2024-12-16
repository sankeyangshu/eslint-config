import { interopDefault } from '../utils';
import type { FlatConfigItemType } from '../types';

/**
 * Creates a basic ESLint configuration for the Unicorn plugin.
 *
 * @param overrides - Optional overrides for the default rules.
 * @returns A list of flat config items with Unicorn plugin settings and rules.
 */
export async function createUnicornConfig(
  overrides: Record<string, string> = {}
): Promise<FlatConfigItemType[]> {
  const pluginUnicorn = await interopDefault(import('eslint-plugin-unicorn'));

  return [
    {
      plugins: {
        unicorn: pluginUnicorn,
      },
      rules: {
        'unicorn/error-message': 'error',
        'unicorn/escape-case': 'error',
        'unicorn/no-instanceof-array': 'error',
        'unicorn/no-new-array': 'error',
        'unicorn/no-new-buffer': 'error',
        'unicorn/number-literal-case': 'error',
        'unicorn/prefer-dom-node-text-content': 'error',
        'unicorn/prefer-includes': 'error',
        'unicorn/prefer-node-protocol': 'error',
        'unicorn/prefer-number-properties': 'error',
        'unicorn/prefer-string-starts-ends-with': 'error',
        'unicorn/prefer-type-error': 'error',
        'unicorn/throw-new-error': 'error',

        ...overrides,
      },
    },
  ];
}
