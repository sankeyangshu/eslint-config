import { pluginJsdoc } from '../eslint';
import type { OptionsOverrides, OptionsShareable, TypedConfigItem } from '../types';

/**
 * Options type of {@link createJsdocConfig}
 */
export type ConfigJsdocOptions = Pick<OptionsShareable, 'typescript'> & OptionsOverrides;

/**
 * JavaScript specific rules
 */
const javascriptRules: TypedConfigItem['rules'] = {
  'jsdoc/no-types': 'off',
  'jsdoc/no-undefined-types': 'error',
  'jsdoc/require-param-type': 'error',
  'jsdoc/require-property-type': 'error',
  'jsdoc/require-returns-type': 'error',
};

/**
 * TypeScript specific rules
 */
const typescriptRules: TypedConfigItem['rules'] = {
  'jsdoc/no-undefined-types': 'off',
  'jsdoc/require-param-type': 'off',
  'jsdoc/require-property-type': 'off',
  'jsdoc/require-returns-type': 'off',
  'jsdoc/no-types': 'error',
};

/**
 * Creates a basic ESLint configuration for the JSDoc plugin.
 *
 * @see {@link https://github.com/gajus/eslint-plugin-jsdoc}
 *
 * @param options - {@link ConfigJsdocOptions}
 * @returns ESLint configs
 */
export function createJsdocConfig(options: ConfigJsdocOptions = {}): TypedConfigItem[] {
  return [
    {
      name: 'sankeyangshu/jsdoc',
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

        // TypeScript rules overrides
        ...(options.typescript ? typescriptRules : javascriptRules),

        // Overrides rules
        ...options.overrides,
      },
    },
  ];
}
