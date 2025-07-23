import createGitIgnoreConfig from 'eslint-config-flat-gitignore';
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';
import type { TypedConfigItem } from '../types';

/**
 * Options type of {@link createGitIgnoresConfig}
 */
export type ConfigGitIgnoreOptions = Omit<FlatGitignoreOptions, 'strict'> & {
  /**
   * Throw an error if gitignore file not found.
   *
   * @default false
   */
  strict?: boolean;
};

/**
 * Create a configuration for ignores.
 *
 * @param options Optional options for the config, either a boolean or an options object.
 * @returns A list of flat config items.
 */
export function createGitIgnoresConfig(options: ConfigGitIgnoreOptions = {}): TypedConfigItem[] {
  // Won't throw error if gitignore is missing
  options.strict ??= false;

  return [
    {
      ...createGitIgnoreConfig(options),
      name: 'sankeyangshu/gitignore',
    },
  ];
}
