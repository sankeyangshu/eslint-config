import { FlatConfigComposer } from 'eslint-flat-config-utils';
import {
  createAstroConfig,
  createDisablesConfig,
  createFormatterConfig,
  createGitIgnoresConfig,
  createIgnoresConfig,
  createImportsConfig,
  createJavascriptConfig,
  createJsdocConfig,
  createJsoncConfig,
  createNodeConfig,
  createPerfectionistConfig,
  createPrettierConfig,
  createReactConfig,
  createReactNativeConfig,
  createSolidConfig,
  createSortPackageJsonConfig,
  createSortTsConfig,
  createSvelteConfig,
  createTypescriptConfig,
  createUnicornConfig,
  createUnoCssConfig,
  createVueConfig,
} from './configs';
import { getOverridesRules } from './utils';
import { createOptions } from './utils/options';
import type { Awaitable, FlatConfigItemType, OptionsType } from './types';

/**
 * Create a configuration for ESLint.
 *
 * @param options - Optional options for the config.
 * @param userConfigs - Optional user configurations.
 * @returns A list of flat config items.
 */
export async function defineConfig(
  options: Partial<OptionsType> = {},
  ...userConfigs: Awaitable<FlatConfigItemType>[]
) {
  const {
    gitignore: enableGitignore = true,
    usePrettierrc: enablePrettier = true,
    astro: enableAstro = false,
    react: enableReact = false,
    'react-native': enableReactNative = false,
    solid: enableSolid = false,
    svelte: enableSvelte = false,
    unocss: enableUnoCSS = false,
    vue: enableVue = false,
  } = options;

  const opts = await createOptions(options);
  const overrideRecord = getOverridesRules(opts.overrides);

  const configs: Awaitable<FlatConfigItemType[]>[] = [];

  if (enableGitignore) {
    configs.push(createGitIgnoresConfig(opts.gitignore));
  }

  // Base configs
  configs.push(
    createIgnoresConfig(opts.ignores),
    createJavascriptConfig(overrideRecord.js),
    createNodeConfig(overrideRecord.n),
    createJsdocConfig(overrideRecord.jsdoc),
    createImportsConfig(overrideRecord.import),
    createPerfectionistConfig(overrideRecord.perfectionist),
    createUnicornConfig(overrideRecord.unicorn),
    createTypescriptConfig(overrideRecord.ts)
  );

  if (enableVue) {
    configs.push(createVueConfig(opts.vue, overrideRecord.vue));
  }

  if (enableReact) {
    configs.push(createReactConfig(opts.react, overrideRecord.react));
  }

  if (enableReactNative) {
    configs.push(createReactNativeConfig(opts['react-native'], overrideRecord['react-native']));
  }

  if (enableSolid) {
    configs.push(createSolidConfig(opts.solid, overrideRecord.solid));
  }

  if (enableSvelte) {
    configs.push(createSvelteConfig(opts.svelte, opts.prettierRules, overrideRecord.svelte));
  }

  if (enableUnoCSS) {
    configs.push(createUnoCssConfig(opts.unocss, overrideRecord.unocss));
  }

  if (enableAstro) {
    configs.push(createAstroConfig(opts.astro, opts.prettierRules, overrideRecord.astro));
  }

  configs.push(
    createJsoncConfig(overrideRecord.jsonc),
    createSortPackageJsonConfig(),
    createSortTsConfig()
  );

  configs.push(createDisablesConfig());

  if (enablePrettier) {
    configs.push(createPrettierConfig(opts.prettierRules));
  }

  configs.push(createFormatterConfig(opts.formatter, opts.prettierRules));

  let composer = new FlatConfigComposer<FlatConfigItemType, any>();

  composer = composer.append(...configs, ...(userConfigs as any));

  return composer;
}

export * from './types';
