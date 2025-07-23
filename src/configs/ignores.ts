import { GLOB_EXCLUDE } from '../constants';
import type { TypedConfigItem } from '../types';

/**
 * Options type for {@link createIgnoresConfig}
 */
export type ConfigIgnoresOptions = string[];

/**
 * Config for ignore files from linting
 *
 * @see https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores
 *
 * @param customIgnores - {@link ConfigIgnoresOptions}
 * @returns ESLint configs
 */
export const createIgnoresConfig = (customIgnores: ConfigIgnoresOptions = []): TypedConfigItem[] => [
  {
    name: 'sankeyangshu/ignores',
    ignores: [
      ...GLOB_EXCLUDE,

      // Overrides built-in ignores
      ...customIgnores,
    ],
  },
];
