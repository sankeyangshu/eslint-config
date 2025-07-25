import { GLOB_PACKAGE_JSON, GLOB_PNPM_WORKSPACE_YAML } from '../constants';
import { parserJsonc, parserYaml } from '../eslint';
import { ensurePackages, interopDefault } from '../utils';
import type { TypedConfigItem } from '../types';

/**
 * Options type of {@link createPnpmConfig}
 */
export type ConfigPnpmOptions = {
  filesJson?: TypedConfigItem['files'];
  filesYaml?: TypedConfigItem['files'];
  overridesJsonRules?: TypedConfigItem['rules'];
  overridesYamlRules?: TypedConfigItem['rules'];
};

/**
 * Config for pnpm package manager
 *
 * @see {@link https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm}
 *
 * @param options - {@link ConfigPnpmOptions}
 * @returns ESLint configs
 */
export async function createPnpmConfig(options: ConfigPnpmOptions = {}): Promise<TypedConfigItem[]> {
  await ensurePackages(['eslint-plugin-pnpm']);

  const pluginPnpm = await interopDefault(import('eslint-plugin-pnpm'));

  const { filesJson = [GLOB_PACKAGE_JSON], filesYaml = [GLOB_PNPM_WORKSPACE_YAML] } = options;

  return [
    {
      name: 'sankeyangshu/pnpm/package-json',
      files: filesJson,
      plugins: {
        pnpm: pluginPnpm,
      },
      languageOptions: {
        parser: parserJsonc,
      },
      rules: {
        'pnpm/json-enforce-catalog': [
          'error',
          {
            autofix: true,
          },
        ],
        'pnpm/json-valid-catalog': 'error',

        // Overrides rules
        ...options.overridesJsonRules,
      },
    },
    {
      name: 'sankeyangshu/pnpm/pnpm-workspace-yaml',
      files: filesYaml,
      plugins: {
        pnpm: pluginPnpm,
      },
      languageOptions: {
        parser: parserYaml,
      },
      rules: {
        'pnpm/yaml-no-duplicate-catalog-item': 'error',
        'pnpm/yaml-no-unused-catalog-item': 'error',

        // Overrides rules
        ...options.overridesYamlRules,
      },
    },
  ];
}
