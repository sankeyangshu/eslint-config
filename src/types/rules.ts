import type {
  EslintRules,
  FlatESLintConfigItem,
  ImportRules,
  MergeIntersection,
  NRules,
  ReactHooksRules,
  ReactRules,
  RuleConfig,
  TypeScriptRules,
  UnicornRules,
  VueRules,
} from '@antfu/eslint-define-config';

/** Wrap rule config（包裹所有规则配置） */
type WrapRuleConfigType<T extends { [key: string]: any }> = {
  // if T is RuleConfig Type, then keep it, else wrap it to RuleConfig (如果 T 是 RuleConfig 类型，那么保持它，否则包裹到 RuleConfig)
  [K in keyof T]: T[K] extends RuleConfig ? T[K] : RuleConfig<T[K]>;
};

/** Eslint flat rules (Eslint 扁平化规则类型) */
export type EslintFlatRulesType = WrapRuleConfigType<
  MergeIntersection<
    EslintRules &
      ImportRules &
      NRules &
      UnicornRules &
      TypeScriptRules &
      VueRules &
      ReactRules &
      ReactHooksRules
  >
>;

/** Flat config item Type (扁平化配置项类型) */
export type FlatConfigItemType = Omit<
  FlatESLintConfigItem<EslintFlatRulesType, false>,
  'plugins'
> & {
  plugins?: Record<string, any>;
};
