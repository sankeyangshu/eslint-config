import { pluginOxlint } from '../eslint';
import type { OptionsOverrides, TypedConfigItem } from '../types';

/**
 * Options type of {@link createOxlintConfig}
 */
export type ConfigOxlintOptions = OptionsOverrides;

/**
 * Create a basic configuration for Oxlint.
 *
 * @see {@link https://github.com/oxc-project/eslint-plugin-oxlint}
 *
 * @param options - {@link ConfigOxlintOptions}
 * @returns A list of flat config items.
 */
export function createOxlintConfig(options: ConfigOxlintOptions = {}): TypedConfigItem[] {
  const sharedRules: TypedConfigItem['rules'] = {
    ...pluginOxlint.configs.recommended.rules,
  };

  return [
    {
      name: 'sankeyangshu/oxlint',
      rules: {
        ...sharedRules,

        // Overrides rules
        ...options.overrides,
      },
    },
  ];
}
