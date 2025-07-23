import type {
  ConfigAstroOptions,
  ConfigCommandOptions,
  ConfigCommentsOptions,
  ConfigDisablesOptions,
  ConfigGitIgnoreOptions,
  ConfigIgnoresOptions,
  ConfigImportOptions,
  ConfigJavaScriptOptions,
  ConfigJsdocOptions,
  ConfigJsoncOptions,
  ConfigMarkdownOptions,
  ConfigNodeOptions,
  ConfigPerfectionistOptions,
  ConfigPnpmOptions,
  ConfigPrettierOptions,
  ConfigReactOptions,
  ConfigRegexpOptions,
  ConfigSolidOptions,
  ConfigSortOptions,
  ConfigSvelteOptions,
  ConfigTestOptions,
  ConfigTomlOptions,
  ConfigTypeScriptOptions,
  ConfigUnicornOptions,
  ConfigUnoCSSOptions,
  ConfigVueOptions,
  ConfigYmlOptions,
} from '../configs';
import type { OptionsShareable } from './options';

/**
 * Config factory options
 */
export interface ConfigOptions {
  /**
   * Configs bellow can be disabled
   */
  astro?: boolean | ConfigAstroOptions;

  /**
   * Auto rename plugins
   * @default true
   */
  autoRenamePlugins?: boolean;

  /**
   * Configs enabled by default
   */
  command?: ConfigCommandOptions;
  comments?: ConfigCommentsOptions;
  disables?: boolean | ConfigDisablesOptions;
  // formatter?: boolean | ConfigFormatOptions; // TODO： disabled, maybe later
  gitignore?: boolean | ConfigGitIgnoreOptions;

  ignores?: ConfigIgnoresOptions;
  imports?: boolean | ConfigImportOptions;
  javascript?: ConfigJavaScriptOptions;
  jsdoc?: boolean | ConfigJsdocOptions;
  jsonc?: boolean | ConfigJsoncOptions;
  markdown?: boolean | ConfigMarkdownOptions;
  node?: ConfigNodeOptions;
  perfectionist?: boolean | ConfigPerfectionistOptions;
  pnpm?: boolean | ConfigPnpmOptions;
  prettier?: boolean | ConfigPrettierOptions;
  react?: boolean | ConfigReactOptions;
  regexp?: boolean | ConfigRegexpOptions;

  /**
   * Shareable options
   */
  shareable?: OptionsShareable;
  solid?: boolean | ConfigSolidOptions;
  sort?: boolean | ConfigSortOptions;
  svelte?: boolean | ConfigSvelteOptions;
  test?: boolean | ConfigTestOptions;
  toml?: boolean | ConfigTomlOptions;
  typescript?: boolean | ConfigTypeScriptOptions;
  unicorn?: boolean | ConfigUnicornOptions;
  unocss?: boolean | ConfigUnoCSSOptions;
  vue?: boolean | ConfigVueOptions;
  yml?: boolean | ConfigYmlOptions;
}
