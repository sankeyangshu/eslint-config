import { ensurePackages, interopDefault } from '../utils';
import type { FlatConfigItemType, RequiredRuleBaseOptionsType } from '../types';

/**
 * Create a basic configuration for React Native.
 *
 * @param options Optional options for the config.
 * @param overrides Optional overrides for the config.
 * @returns A list of flat config items.
 */
export async function createReactNativeConfig(
  options?: RequiredRuleBaseOptionsType,
  overrides: Record<string, string> = {}
): Promise<FlatConfigItemType[]> {
  if (!options) return [];

  const { files } = options;

  await ensurePackages(['eslint-plugin-react-native']);

  const pluginReactNative = await interopDefault(import('eslint-plugin-react-native'));

  return [
    {
      plugins: {
        'react-native': pluginReactNative,
      },
    },
    {
      files,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        globals: {
          ...pluginReactNative.environments['react-native'].globals,
        },
      },
      rules: {
        ...pluginReactNative.configs.all.rules,
        ...(overrides as any),
      },
    },
  ];
}
