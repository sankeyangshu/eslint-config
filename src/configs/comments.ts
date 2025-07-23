import { pluginComments } from '../eslint';
import type { OptionsOverrides, TypedConfigItem } from '../types';

/**
 * Options type of {@link configESLintComments}
 */
export type ConfigCommentsOptions = OptionsOverrides;

/**
 * Config for eslint comments
 *
 * @see {@link https://github.com/eslint-community/eslint-plugin-eslint-comments}
 *
 * @param options - {@link ConfigCommentsOptions}
 * @returns ESLint configs
 */
export function createCommentsConfig(options: ConfigCommentsOptions = {}): TypedConfigItem[] {
  return [
    {
      name: 'sankeyangshu/eslint-comments',
      plugins: {
        '@eslint-community/eslint-comments': pluginComments,
      },
      rules: {
        '@eslint-community/eslint-comments/no-aggregating-enable': 'error',
        '@eslint-community/eslint-comments/no-duplicate-disable': 'error',
        '@eslint-community/eslint-comments/no-unlimited-disable': 'error',
        '@eslint-community/eslint-comments/no-unused-enable': 'error',

        // Overrides rules
        ...options.overrides,
      },
    },
  ];
}
