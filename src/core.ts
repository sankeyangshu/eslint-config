import { FlatConfigComposer } from 'eslint-flat-config-utils';
import {
  createAstroConfig,
  createCommandConfig,
  createCommentsConfig,
  createDisablesConfig,
  createGitIgnoresConfig,
  createIgnoresConfig,
  createImportsConfig,
  createJavaScriptConfig,
  createJsdocConfig,
  createJsoncConfig,
  createJSXConfig,
  createMarkdownConfig,
  createNodeConfig,
  createPerfectionistConfig,
  createPnpmConfig,
  createPrettierConfig,
  createReactConfig,
  createRegexpConfig,
  createSolidConfig,
  createSortConfig,
  createSvelteConfig,
  createTestConfig,
  createTomlConfig,
  createTypeScriptConfig,
  createUnicornConfig,
  createUnoCssConfig,
  createVueConfig,
  createYamlConfig,
} from './configs';
import { getOverrides, hasTypeScript, hasUnoCSS, hasVitest, hasVue, resolveSubOptions } from './utils';
import type { Awaitable, ConfigNames, ConfigOptions, ESLintConfig, TypedConfigItem } from './types';

export const defaultPluginRenaming = {
  '@eslint-react': 'react',
  '@eslint-react/dom': 'react-dom',
  '@eslint-react/hooks-extra': 'react-hooks-extra',
  '@eslint-react/naming-convention': 'react-naming-convention',
  'import-x': 'import',
  n: 'node',
};

/**
 * Config factory
 *
 * @param options - Optional options for the config.
 * @param userConfigs - Optional user configurations.
 * @returns A list of flat config items.
 */
// eslint-disable-next-line @typescript-eslint/promise-function-async
export function defineConfig(
  options: ConfigOptions = {},
  ...userConfigs: Awaitable<TypedConfigItem | TypedConfigItem[] | ESLintConfig[]>[]
): FlatConfigComposer<TypedConfigItem, ConfigNames> {
  const {
    /**
     * Shareable options
     */
    shareable = {},

    /**
     * Auto rename plugins
     * @default true
     */
    autoRenamePlugins = true,

    /**
     * Conditional by deps
     */
    vue: enableVue = hasVue(),
    test: enableTest = hasVitest(),
    unocss: enableUnoCSS = hasUnoCSS(),
    typescript: enableTypeScript = hasTypeScript(),

    /**
     * Enabled by default
     */
    yml: enableYML = true,
    sort: enableSort = true,
    toml: enableTOML = true,
    jsonc: enableJSONC = true,
    regexp: enableRegexp = true,
    unicorn: enableUnicorn = true,
    prettier: enablePrettier = true,
    markdown: enableMarkdown = true,
    gitignore: enableGitIgnore = true,
    jsdoc: enableJsdoc = true,
    imports: enableImportX = true,
    disables: enableDisables = true,
    perfectionist: enablePerfectionist = true,

    // disabled by default
    pnpm: enablePnpm = false,
    react: enableReact = false,
    astro: enableAstro = false,
    solid: enableSolid = false,
    svelte: enableSvelte = false,
  } = options;

  const configs: Awaitable<TypedConfigItem | TypedConfigItem[]>[] = [];
  const { extraFileExtensions = [] } = shareable;

  if (enableVue) {
    extraFileExtensions.push('.vue');
  }

  if (enableAstro) {
    extraFileExtensions.push('.astro');
  }

  if (enableSvelte) {
    extraFileExtensions.push('.svelte');
  }

  if (enableGitIgnore) {
    configs.push(createGitIgnoresConfig(resolveSubOptions(options, 'gitignore')));
  }

  const typescriptOptions = resolveSubOptions(options, 'typescript');
  const tsconfigPath = 'tsconfigPath' in typescriptOptions ? typescriptOptions.tsconfigPath : undefined;

  configs.push(
    createIgnoresConfig(options.ignores),
    createJSXConfig(),
    createNodeConfig({
      overrides: getOverrides(options, 'node'),
    }),
    createCommandConfig(resolveSubOptions(options, 'command')),
    createCommentsConfig({
      overrides: getOverrides(options, 'comments'),
    }),
    createJavaScriptConfig({
      ...resolveSubOptions(options, 'javascript'),
      overrides: getOverrides(options, 'javascript'),
    })
  );

  if (enableImportX) {
    configs.push(
      createImportsConfig({
        typescript: !!enableTypeScript,
        ...resolveSubOptions(options, 'imports'),
        overrides: getOverrides(options, 'imports'),
      })
    );
  }

  if (enableJsdoc) {
    configs.push(
      createJsdocConfig({
        typescript: !!enableTypeScript,
        overrides: getOverrides(options, 'jsdoc'),
        ...resolveSubOptions(options, 'jsdoc'),
      })
    );
  }

  if (enablePerfectionist) {
    configs.push(
      createPerfectionistConfig({
        ...resolveSubOptions(options, 'perfectionist'),
        overrides: getOverrides(options, 'perfectionist'),
      })
    );
  }

  if (enableUnicorn) {
    configs.push(
      createUnicornConfig({
        overrides: getOverrides(options, 'unicorn'),
      })
    );
  }

  if (enableRegexp) {
    configs.push(
      createRegexpConfig({
        ...resolveSubOptions(options, 'regexp'),
        overrides: getOverrides(options, 'regexp'),
      })
    );
  }

  if (enableTypeScript) {
    configs.push(
      createTypeScriptConfig({
        ...resolveSubOptions(options, 'typescript'),
        overrides: getOverrides(options, 'typescript'),
        extraFileExtensions,
      })
    );
  }

  if (enableVue) {
    configs.push(
      createVueConfig({
        ...resolveSubOptions(options, 'vue'),
        typescript: !!enableTypeScript,
        overrides: getOverrides(options, 'vue'),
        extraFileExtensions,
      })
    );
  }

  if (enableReact) {
    configs.push(
      createReactConfig({
        ...resolveSubOptions(options, 'react'),
        overrides: getOverrides(options, 'react'),
        tsconfigPath,
      })
    );
  }

  if (enableYML) {
    configs.push(
      createYamlConfig({
        prettier: !!enablePrettier,
        ...resolveSubOptions(options, 'yml'),
        overrides: getOverrides(options, 'yml'),
      })
    );
  }

  if (enableTOML) {
    configs.push(
      createTomlConfig({
        ...resolveSubOptions(options, 'toml'),
        overrides: getOverrides(options, 'toml'),
      })
    );
  }
  if (enableJSONC) {
    configs.push(
      createJsoncConfig({
        prettier: !!enablePrettier,
        ...resolveSubOptions(options, 'jsonc'),
        overrides: getOverrides(options, 'jsonc'),
      })
    );
  }

  if (enableAstro) {
    configs.push(
      createAstroConfig({
        ...resolveSubOptions(options, 'astro'),
        typescript: !!enableTypeScript,
        overrides: getOverrides(options, 'astro'),
        extraFileExtensions,
      })
    );
  }

  if (enableSolid) {
    configs.push(
      createSolidConfig({
        ...resolveSubOptions(options, 'solid'),
        typescript: !!enableTypeScript,

        overrides: getOverrides(options, 'solid'),
      })
    );
  }

  if (enableSvelte) {
    configs.push(
      createSvelteConfig({
        ...resolveSubOptions(options, 'svelte'),
        typescript: !!enableTypeScript,
        overrides: getOverrides(options, 'svelte'),
        extraFileExtensions,
      })
    );
  }

  if (enableSort) {
    configs.push(createSortConfig(resolveSubOptions(options, 'sort')));
  }

  if (enableTest) {
    configs.push(
      createTestConfig({
        ...resolveSubOptions(options, 'test'),
        overrides: getOverrides(options, 'test'),
      })
    );
  }

  if (enableUnoCSS) {
    configs.push(
      createUnoCssConfig({
        overrides: getOverrides(options, 'unocss'),
      })
    );
  }

  if (enableMarkdown) {
    configs.push(
      createMarkdownConfig({
        ...resolveSubOptions(options, 'markdown'),
        overrides: getOverrides(options, 'markdown'),
        extraFileExtensions,
      })
    );
  }

  if (enablePnpm) {
    configs.push(createPnpmConfig(resolveSubOptions(options, 'pnpm')));
  }

  // TODO: Not enabled for now, maybe later
  // if (options.formatter) {
  //   if (typeof options.formatter === 'boolean') {
  //     configs.push(createFormatterConfig({}))
  //   } else {
  //     configs.push(createFormatterConfig(options.formatter))
  //   }
  // }

  if (enableDisables) {
    configs.push(createDisablesConfig(resolveSubOptions(options, 'disables')));
  }

  const prettierConfigs: TypedConfigItem[] = enablePrettier
    ? createPrettierConfig({
        ...resolveSubOptions(options, 'prettier'),
        overrides: getOverrides(options, 'prettier'),
      })
    : [];

  let composer: FlatConfigComposer<TypedConfigItem, ConfigNames> = new FlatConfigComposer<TypedConfigItem, ConfigNames>(
    ...configs,

    // User custom configs
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    ...(userConfigs as any),

    // Keep prettier and specials at last
    ...prettierConfigs
  );

  if (autoRenamePlugins) {
    composer = composer.renamePlugins(defaultPluginRenaming);
  }

  return composer;
}
