import command from 'eslint-plugin-command/config';
import type { FlatConfigItemType } from '../types';

/**
 * Create a basic configuration for command plugin.
 *
 * @returns A list of flat config items.
 */
export async function createCommandConfig(): Promise<FlatConfigItemType[]> {
  return [
    {
      ...command,
    },
  ];
}
