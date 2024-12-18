import { interopDefault } from '../utils';
import type { BaseOptionsType, FlatConfigItemType } from '../types';

/**
 * Create a configuration for ignores.
 *
 * @param options Optional options for the config, either a boolean or an options object.
 * @returns A list of flat config items.
 */
export async function createGitIgnoresConfig(options?: BaseOptionsType['gitignore']) {
  if (!options) return [];

  const configs: FlatConfigItemType[] = [];

  const configItem = await interopDefault(import('eslint-config-flat-gitignore')).then((r) => [
    r(typeof options !== 'boolean' ? options : { strict: false }),
  ]);

  configs.push(...configItem);

  return configs;
}

/**
 * Create a configuration for ignores.
 *
 * @param userIgnores Optional glob patterns to ignore, defaults to an empty list.
 * @returns A list of flat config items.
 */
export async function createIgnoresConfig(
  userIgnores: string[] = []
): Promise<FlatConfigItemType[]> {
  return [
    {
      ignores: [...userIgnores],
    },
  ];
}
