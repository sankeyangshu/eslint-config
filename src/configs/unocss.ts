import type { FlatConfigItemType } from '../types';
import { ensurePackages, interopDefault } from '../utils';

/**
 * Creates a basic configuration for UnoCSS.
 *
 * @param enable Optional flag to enable this configuration; defaults to `true`.
 * @param overrides Optional overrides for the config.
 * @returns A list of flat config items.
 */
export async function createUnoCssConfig(
  enable?: boolean,
  overrides: Record<string, string> = {}
): Promise<FlatConfigItemType[]> {
  if (!enable) return [];

  await ensurePackages(['@unocss/eslint-plugin']);

  const pluginUnoCSS = await interopDefault(interopDefault(import('@unocss/eslint-plugin')));

  return [
    {
      plugins: {
        unocss: pluginUnoCSS,
      },
      rules: {
        'unocss/order': 'warn',
        'unocss/order-attributify': 'off',
        'unocss/blocklist': 'off',
        ...overrides,
      },
    },
  ];
}
