import globals from 'globals';
import { GLOB_SRC, GLOB_SRC_EXT, PERFECTIONIST } from '../constants';
import { pluginImportX, pluginPerfectionist } from '../eslint';
import type { TypedConfigItem } from '../types';

/**
 * Options for {@link createDisablesConfig}
 */
export interface ConfigDisablesOptions {
  /**
   * Overrides cli rules
   */
  overridesCliRules?: TypedConfigItem['rules'];

  /**
   * Overrides bin rules
   */
  overridesBinRules?: TypedConfigItem['rules'];

  /**
   * Overrides config files rules
   */
  overridesConfigFileRules?: TypedConfigItem['rules'];

  /**
   * Overrides scripts rules
   */
  overridesScriptsRules?: TypedConfigItem['rules'];

  /**
   * Overrides user scripts rules
   */
  overridesUserScriptsRules?: TypedConfigItem['rules'];

  /**
   * More special case configs
   */
  specialCaseConfigs?: TypedConfigItem[];
}

/**
 * Create a list of flat config items to disable certain rules.
 *
 * @remarks
 *   This function is not intended to be called directly. It is used by `createConfig` to generate a
 *   configuration for ESLint.
 * @returns A list of flat config items.
 */
export function createDisablesConfig(options: ConfigDisablesOptions = {}): TypedConfigItem[] {
  const configs: TypedConfigItem[] = [
    {
      name: 'sankeyangshu/disables/scripts',
      files: [`**/scripts/${GLOB_SRC}`],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'no-console': 'off',

        // Overrides rules
        ...options.overridesScriptsRules,
      },
    },
    {
      name: 'sankeyangshu/disables/cli',
      files: [`**/cli/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'no-console': 'off',

        // Overrides rules
        ...options.overridesCliRules,
      },
    },
    {
      name: 'sankeyangshu/disables/bin',
      files: [`**/bin/${GLOB_SRC}`, `**/bin.${GLOB_SRC_EXT}`],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'no-console': 'off',

        // Overrides rules
        ...options.overridesBinRules,
      },
    },
    {
      name: 'sankeyangshu/disables/userscript',
      files: [`**/*.user.${GLOB_SRC_EXT}`],
      languageOptions: {
        globals: {
          ...globals.greasemonkey,
        },
      },
      rules: {
        camelcase: [
          'error',
          {
            allow: ['^GM_.+'],
          },
        ],

        // Overrides rules
        ...options.overridesUserScriptsRules,
      },
    },
    {
      name: 'sankeyangshu/disables/config-file',
      files: [`**/*.config.${GLOB_SRC_EXT}`, `**/*.config.*.${GLOB_SRC_EXT}`],
      plugins: {
        import: pluginImportX,
        perfectionist: pluginPerfectionist,
      },
      settings: {
        perfectionist: PERFECTIONIST.pluginSettings,
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'import/no-default-export': 'off',
        'no-console': 'off',
        'perfectionist/sort-objects': [
          'error',
          {
            ...PERFECTIONIST.partialRuleOptions,
            groups: PERFECTIONIST.sortObjectsGroups,
          },
        ],

        ...options.overridesConfigFileRules,
      },
    },
  ];

  // More special case configs
  // So don't need to append configs to composer
  if (options.specialCaseConfigs) {
    configs.push(...options.specialCaseConfigs);
  }

  return configs;
}
