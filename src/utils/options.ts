import process from 'node:process';
import {
  DEFAULT_PRETTIER_RULES,
  GLOB_ASTRO,
  GLOB_EXCLUDE,
  GLOB_JSX,
  GLOB_SVELTE,
  GLOB_TSX,
  GLOB_VUE,
} from '../constants';
import type {
  OnDemandRuleKey,
  OptionsType,
  ParsedOptionsType,
  RequiredRuleBaseOptionsType,
  RequiredVueOptionsType,
} from '../types';
import { loadPrettierConfig } from '.';

/**
 * Creates a parsed options object from the given options.
 *
 * @param options - A partial options object.
 * @returns A parsed options object.
 */
export async function createOptions(options: Partial<OptionsType> = {}) {
  const opts: ParsedOptionsType = {
    cwd: process.cwd(),
    ignores: GLOB_EXCLUDE,
    gitignore: true,
    overrides: {},
    prettierRules: {
      ...DEFAULT_PRETTIER_RULES,
    },
    usePrettierrc: true,
    formatter: {
      html: true,
      css: true,
    },
  };

  const {
    cwd,
    ignores,
    gitignore,
    overrides,
    prettierRules,
    usePrettierrc,
    formatter,
    unocss,
    ...rest
  } = options;

  if (cwd) {
    opts.cwd = cwd;
  }

  if (ignores?.length) {
    opts.ignores = [...opts.ignores, ...ignores];
  }

  if (gitignore) {
    opts.gitignore = gitignore;
  }

  if (overrides) {
    opts.overrides = overrides;
  }

  if (prettierRules) {
    opts.prettierRules = { ...opts.prettierRules, ...prettierRules };
  }

  if (usePrettierrc !== undefined) {
    opts.usePrettierrc = usePrettierrc;
  }

  if (opts.usePrettierrc) {
    const prettierConfig = await loadPrettierConfig(opts.cwd);
    Object.assign(opts.prettierRules, prettierConfig);
  }

  if (formatter) {
    Object.assign(opts.formatter, formatter);
  }

  const onDemandKeys: OnDemandRuleKey[] = [
    'vue',
    'react',
    'react-native',
    'solid',
    'svelte',
    'astro',
  ];

  const onDemandFiles: Record<OnDemandRuleKey, string[]> = {
    vue: [GLOB_VUE],
    react: [GLOB_JSX, GLOB_TSX],
    'react-native': [GLOB_JSX, GLOB_TSX],
    solid: [GLOB_JSX, GLOB_TSX],
    svelte: [GLOB_SVELTE],
    astro: [GLOB_ASTRO],
  };

  onDemandKeys.forEach((key) => {
    if (key === 'vue') {
      opts[key] = createItemDemandOptions(
        key,
        rest[key],
        onDemandFiles[key]
      ) as RequiredVueOptionsType;
    } else {
      opts[key] = createItemDemandOptions(key, rest[key], onDemandFiles[key]);
    }
  });

  // If react-native is enabled, react must be enabled
  if (rest['react-native'] && !rest.react) {
    opts.react = createItemDemandOptions('react', true, onDemandFiles.react);
  }

  opts.unocss = Boolean(unocss);

  return opts;
}

/**
 * Create on demand rule options
 *
 * @param key key
 * @param options options
 * @param files Default files
 */
function createItemDemandOptions<K extends OnDemandRuleKey>(
  key: K,
  options: OptionsType[K],
  files: string[]
) {
  if (!options) return undefined;

  if (key === 'vue') {
    const vueOptions: RequiredVueOptionsType = {
      version: 3,
      files,
    };

    if (typeof options === 'object') {
      Object.assign(vueOptions, options);
    }

    return vueOptions;
  }

  const itemOptions: RequiredRuleBaseOptionsType = {
    files,
  };

  if (typeof options === 'object') {
    Object.assign(itemOptions, options);
  }

  return itemOptions;
}
