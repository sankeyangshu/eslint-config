import { GLOB_SRC, GLOB_SRC_EXT } from '../constants';
import type { FlatConfigItemType } from '../types';

/**
 * Create a list of flat config items to disable certain rules.
 *
 * @remarks
 *   This function is not intended to be called directly. It is used by `createConfig` to generate a
 *   configuration for ESLint.
 * @returns A list of flat config items.
 */
export async function createDisables(): Promise<FlatConfigItemType[]> {
  return [
    {
      files: [`**/scripts/${GLOB_SRC}`],
      rules: {
        'antfu/no-top-level-await': 'off',
        'no-console': 'off',
        'ts/explicit-function-return-type': 'off',
      },
    },
    {
      files: [`**/cli/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
      rules: {
        'antfu/no-top-level-await': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
      rules: {
        'antfu/no-import-dist': 'off',
        'antfu/no-import-node-modules-by-path': 'off',
      },
    },
    {
      files: ['**/*.d.?([cm])ts'],
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        'import/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
    {
      files: ['**/*.js', '**/*.cjs'],
      rules: {
        'ts/no-require-imports': 'off',
      },
    },
    {
      files: [`**/*.config.${GLOB_SRC_EXT}`, `**/*.config.*.${GLOB_SRC_EXT}`],
      rules: {
        'antfu/no-top-level-await': 'off',
        'no-console': 'off',
        'ts/explicit-function-return-type': 'off',
      },
    },
  ];
}
