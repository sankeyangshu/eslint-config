import { interopDefault } from '@/utils';
import type { FlatConfigItemType } from '@/types';

/**
 * Creates a basic ESLint configuration for the JSDoc plugin.
 *
 * @param overrides - Optional overrides for the default rules.
 * @returns A list of flat config items with JSDoc plugin settings and rules.
 */
export async function createJsdocConfig(
  overrides: Record<string, string> = {}
): Promise<FlatConfigItemType[]> {
  const pluginJsdoc = await interopDefault(import('eslint-plugin-jsdoc'));

  return [
    {
      plugins: {
        jsdoc: pluginJsdoc,
      },
      rules: {
        'jsdoc/check-access': 'warn',
        'jsdoc/check-param-names': 'warn',
        'jsdoc/check-property-names': 'warn',
        'jsdoc/check-types': 'warn',
        'jsdoc/empty-tags': 'warn',
        'jsdoc/implements-on-classes': 'warn',
        'jsdoc/no-defaults': 'warn',
        'jsdoc/no-multi-asterisks': 'warn',
        'jsdoc/require-param-name': 'warn',
        'jsdoc/require-property': 'warn',
        'jsdoc/require-property-description': 'warn',
        'jsdoc/require-property-name': 'warn',
        'jsdoc/require-returns-check': 'warn',
        'jsdoc/require-returns-description': 'warn',
        'jsdoc/require-yields-check': 'warn',

        ...overrides,
      },
    },
  ];
}
