import type { BaseOptionsType, FlatConfigItemType } from '../types';
import { interopDefault } from '../utils';

/**
 * Create a configuration for ignores.
 *
 * @param options Optional options for the config, either a boolean or an options object.
 * @returns A list of flat config items.
 */
export async function createIgnoresConfig(options?: BaseOptionsType['gitignore']) {
  if (!options) return [];

  const configs: FlatConfigItemType[] = [];

  const configItem = await interopDefault(import('eslint-config-flat-gitignore')).then((r) => [
    r(typeof options !== 'boolean' ? options : { strict: false }),
  ]);

  configs.push(...configItem);

  return configs;
}
