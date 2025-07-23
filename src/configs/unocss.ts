import { ensurePackages, interopDefault } from '../utils';
import type { OptionsOverrides, TypedConfigItem } from '../types';

/**
 * Options type of {@link createUnoCssConfig}
 */
export type ConfigUnoCSSOptions = OptionsOverrides & {
  /**
   * Enable attributify sort order
   *
   * @default false
   */
  attributify?: boolean;
};

/**
 * Creates a basic configuration for UnoCSS.
 *
 * @see {@link https://github.com/unocss/unocss/tree/main/packages-integrations/eslint-plugin}
 *
 * @param options - {@link ConfigUnoCSSOptions}
 * @returns A list of flat config items.
 */
export async function createUnoCssConfig(options: ConfigUnoCSSOptions = {}): Promise<TypedConfigItem[]> {
  await ensurePackages(['@unocss/eslint-plugin']);

  const pluginUnoCSS = await interopDefault(import('@unocss/eslint-plugin'));

  const { attributify = false } = options;

  return [
    {
      name: 'sankeyangshu/unocss',
      plugins: {
        unocss: pluginUnoCSS,
      },
      rules: {
        'unocss/order': 'warn',
        ...(attributify
          ? {
              'unocss/order-attributify': 'warn',
            }
          : {}),

        // Overrides rules
        ...options.overrides,
      },
    },
  ];
}
