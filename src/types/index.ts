import type { FlatConfigItemType } from './rules';
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';
import type { BuiltInParserName, LiteralUnion, RequiredOptions } from 'prettier';

/** A type that can be awaited (可以被等待的类型) */
export type Awaitable<T> = T | Promise<T>;

/** The base options (基础配置选项类型) */
export interface BaseOptionsType {
  /**
   * The current working directory (项目根目录)
   *
   * @default process.cwd()
   */
  cwd: string;
  /** The globs to ignore lint (被忽略的 glob) */
  ignores: string[];
  /**
   * Enable gitignore support (启用 gitignore 支持) Passing an object to configure the options (配置选项)
   *
   * @default true
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   */
  gitignore?: boolean | FlatGitignoreOptions;
  /** The override rules (覆盖的规则) */
  overrides: Record<string, string>;
  /**
   * Default prettier rules (默认的 Prettier 配置选项)
   *
   * @default
   * ```json
   * {
   * "useTabs": false,
   * "tabWidth": 2,
   * "printWidth": 100,
   * "singleQuote": true,
   * "trailingComma": "es5",
   * "bracketSpacing": true,
   * "semi": true
   * }
   * ```
   */
  prettierRules: PartialPrettierExtendedOptionsType;
  /**
   * Whether to use prettierrc (是否使用 prettierrc)
   *
   * If true, the rules in prettierrc will override the default rules
   *
   * @default true
   */
  usePrettierrc: boolean;

  /**
   * formatter (格式化器)
   *
   * @default 默认支持的格式化器
   * {
   *  "html": true,
   *  "css": true,
   * }
   */
  formatter: {
    html?: boolean;
    css?: boolean;
    markdown?: boolean;
    yaml?: boolean;
    toml?: boolean;
  };
}

/** Rule base options (规则基础选项类型) */
export type RuleBaseOptionsType<T = NonNullable<unknown>> = T & {
  /** The glob patterns to lint */
  files?: string[];
};

/** Required rule base options (必要的规则基础选项类型) */
export type RequiredRuleBaseOptionsType = Required<RuleBaseOptionsType>;

/** Vue options (Vue 配置选项类型) */
export type VueOptionsType = RuleBaseOptionsType<{
  /**
   * The vue version
   *
   * @default 3
   */
  version?: 2 | 3;
}>;

/** Options has typescript (是否有 typescript 的选项类型) */
export interface OptionsHasTypeScript {
  /**
   * Whether to use typescript
   *
   * @default true
   */
  typescript?: boolean;
}

/** Required vue options (必要的 Vue 配置选项类型) */
export type RequiredVueOptionsType = Required<VueOptionsType>;

/** Prettier custom parser (自定义 prettier 解析器类型) */
export type PrettierCustomParser = 'astro' | 'svelte' | 'toml';

export type PrettierParser = BuiltInParserName | PrettierCustomParser;

/** Prettier options (Prettier 配置选项类型) */
export interface PrettierOptionsType extends RequiredOptions {
  parser: LiteralUnion<PrettierParser>;
}

/** Prettier options (Prettier 配置选项类型) */
export type PrettierExtendedOptionsType = PrettierOptionsType;

/** Partial prettier options (部分 Prettier 配置选项类型) */
export type PartialPrettierExtendedOptionsType = Partial<PrettierOptionsType>;

export interface OptionsUnicornType {
  /**
   * Include all rules recommended by `eslint-plugin-unicorn`, instead of only ones picked by
   * Anthony.
   *
   * @default false
   */
  allRecommended?: boolean;
}
/** On demand rule options (框架按需配置类型) */
export type OnDemandRuleKey = 'vue' | 'react' | 'react-native' | 'solid' | 'svelte' | 'astro';

/** On demand rule options (框架按需配置类型) */
export type OnDemandRuleOptionsType = Partial<
  Record<Exclude<OnDemandRuleKey, 'vue'>, RuleBaseOptionsType | boolean>
>;

/** Required on demand rule options (必填的框架按需配置类型) */
export type RequiredOnDemandRuleOptionsType = Record<
  Exclude<OnDemandRuleKey, 'vue'>,
  RequiredRuleBaseOptionsType
>;

/** Options (选项类型) */
export type OptionsType = Partial<BaseOptionsType> & {
  vue?: VueOptionsType | boolean;
} & OnDemandRuleOptionsType & {
    unocss?: boolean;
  };

/** Parsed options (解析后的选项类型) */
export type ParsedOptionsType = BaseOptionsType & {
  vue?: RequiredVueOptionsType;
} & Partial<RequiredOnDemandRuleOptionsType> & {
    unocss?: boolean;
  };

export type { FlatConfigItemType };
