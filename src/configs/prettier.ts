import prettierRules from 'eslint-config-prettier';
import { GLOB_PRETTIER_LINT } from '../constants';
import type { FlatConfigItemType, PartialPrettierExtendedOptionsType } from '../types';
import { interopDefault } from '../utils';

const { rules: eslintRules } = prettierRules;

/**
 * Create a basic configuration for Prettier.
 *
 * @param rules Partial prettier options, including file patterns.
 * @returns A list of flat config items.
 */
export async function createPrettierConfig(
  rules: PartialPrettierExtendedOptionsType
): Promise<FlatConfigItemType[]> {
  const pluginPrettier = await interopDefault(import('eslint-plugin-prettier'));

  const { plugins = [] } = rules;

  const pRules: PartialPrettierExtendedOptionsType = {
    ...rules,
    plugins: plugins.concat('prettier-plugin-jsdoc'),
  };

  return [
    {
      files: GLOB_PRETTIER_LINT,
      plugins: {
        prettier: pluginPrettier,
      },
      rules: {
        ...eslintRules,
        'prettier/prettier': ['warn', pRules],
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
      },
    },
  ];
}
