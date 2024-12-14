import {
  createAstroConfig,
  createFormatterConfig,
  createIgnoresConfig,
  createImportsConfig,
  createJavascriptConfig,
  createNodeConfig,
  createPrettierConfig,
  createReactConfig,
  createReactNativeConfig,
  createSolidConfig,
  createSvelteConfig,
  createTypescriptConfig,
  createUnicornConfig,
  createUnoCssConfig,
  createVueConfig,
} from './configs';
import type { Awaitable, FlatConfigItemType, OptionsType } from './types';
import { getOverridesRules } from './utils';
import { createOptions } from './utils/options';

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
  const opts = await createOptions(options);

  const ignore: FlatConfigItemType = {
    ignores: opts.ignores,
  };

  const overrideRecord = getOverridesRules(opts.overrides);

  const gitignore = await createIgnoresConfig(opts.gitignore);

  const js = createJavascriptConfig(overrideRecord.js);
  const node = await createNodeConfig(overrideRecord.n);
  const imp = await createImportsConfig(overrideRecord.import);
  const unicorn = await createUnicornConfig(overrideRecord.unicorn);
  const ts = await createTypescriptConfig(overrideRecord.ts);
  const vue = await createVueConfig(opts.vue, overrideRecord.vue);
  const solid = await createSolidConfig(opts.solid, overrideRecord.solid);
  const react = await createReactConfig(opts.react, overrideRecord.react);
  const reactNative = await createReactNativeConfig(
    opts['react-native'],
    overrideRecord['react-native']
  );
  const svelte = await createSvelteConfig(opts.svelte, opts.prettierRules, overrideRecord.svelte);
  const astro = await createAstroConfig(opts.astro, opts.prettierRules, overrideRecord.astro);
  const unocss = await createUnoCssConfig(opts.unocss, overrideRecord.unocss);
  const prettier = await createPrettierConfig(opts.prettierRules);
  const formatter = await createFormatterConfig(opts.formatter, opts.prettierRules);

  const userResolved = await Promise.all(userConfigs);

  return [
    ...gitignore,
    ignore,
    ...js,
    ...node,
    ...imp,
    ...unicorn,
    ...ts,
    ...vue,
    ...react,
    ...reactNative,
    ...solid,
    ...astro,
    ...svelte,
    ...unocss,
    ...userResolved,
    ...prettier,
    ...formatter,
  ];
}

export * from './types';
