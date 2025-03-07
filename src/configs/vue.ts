import { ensurePackages, interopDefault } from '../utils';
import type { FlatConfigItemType, RequiredVueOptionsType } from '../types';
import { createTypescriptRules } from './typescript';

/**
 * Create a basic configuration for Vue.
 *
 * @param options Optional options for the config.
 * @param overrides Optional overrides for the config.
 * @returns A list of flat config items.
 */
export async function createVueConfig(
  options?: RequiredVueOptionsType,
  overrides: Record<string, string> = {}
): Promise<FlatConfigItemType[]> {
  if (!options) return [];

  const { version = 3, files } = options;

  await ensurePackages(['eslint-plugin-vue', 'vue-eslint-parser']);

  type VueConfigKey = import('eslint-plugin-vue').VueConfigKey;

  const [pluginVue, parserVue, pluginTs] = await Promise.all([
    interopDefault(import('eslint-plugin-vue')),
    interopDefault(import('vue-eslint-parser')),
    interopDefault(import('@typescript-eslint/eslint-plugin')),
  ]);

  const tsRules = await createTypescriptRules();

  const configKeys: VueConfigKey[] =
    version === 3
      ? ['essential', 'strongly-recommended', 'recommended']
      : ['vue2-essential', 'vue2-strongly-recommended', 'vue2-recommended'];

  const vueRules = configKeys.reduce((preRules, key) => {
    const config = pluginVue.configs[key];
    return {
      ...preRules,
      ...config.rules,
    };
  }, {});

  return [
    {
      plugins: {
        vue: pluginVue,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          extraFileExtensions: ['.vue'],
          parser: '@typescript-eslint/parser',
          sourceType: 'module',
        },
      },
      processor: pluginVue.processors!['.vue'],
      plugins: {
        '@typescript-eslint': pluginTs,
      },
      rules: {
        ...tsRules,
        ...pluginVue.configs.base.rules,
        ...vueRules,
        'vue/block-order': ['warn', { order: ['template', 'script', 'style'] }],
        'vue/component-api-style': ['warn', ['script-setup', 'composition']],
        'vue/component-name-in-template-casing': [
          'warn',
          'PascalCase',
          { registeredComponentsOnly: false, ignores: [] },
        ],
        'vue/component-options-name-casing': ['warn', 'PascalCase'],
        'vue/custom-event-name-casing': ['warn', 'camelCase'],
        'vue/define-emits-declaration': ['warn', 'type-based'],
        'vue/define-macros-order': 'off',
        'vue/define-props-declaration': ['warn', 'type-based'],
        'vue/html-comment-content-newline': 'warn',
        'vue/multi-word-component-names': 'warn',
        'vue/next-tick-style': ['warn', 'promise'],
        'vue/no-duplicate-attr-inheritance': 'warn',
        'vue/no-required-prop-with-default': 'warn',
        'vue/no-static-inline-styles': 'warn',
        'vue/no-template-target-blank': 'error',
        'vue/no-this-in-before-route-enter': 'error',
        'vue/no-undef-properties': 'warn',
        'vue/no-unsupported-features': 'warn',
        'vue/no-unused-emit-declarations': 'warn',
        'vue/no-unused-properties': 'warn',
        'vue/no-unused-refs': 'warn',
        'vue/no-use-v-else-with-v-for': 'error',
        'vue/no-useless-mustaches': 'warn',
        'vue/no-useless-v-bind': 'error',
        'vue/no-v-text': 'warn',
        'vue/padding-line-between-blocks': 'warn',
        'vue/prefer-define-options': 'warn',
        'vue/prefer-separate-static-class': 'warn',
        'vue/prop-name-casing': ['warn', 'camelCase'],
        'vue/require-macro-variable-name': [
          'warn',
          {
            defineProps: 'props',
            defineEmits: 'emit',
            defineSlots: 'slots',
            useSlots: 'slots',
            useAttrs: 'attrs',
          },
        ],
        'vue/valid-define-options': 'warn',

        ...overrides,
      },
    },
  ];
}
