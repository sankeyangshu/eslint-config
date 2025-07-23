import { GLOB_JSX, GLOB_TSX } from '../constants';
import { parserTypeScript } from '../eslint';
import { ensurePackages, interopDefault } from '../utils';
import type { ESLintParser, OptionsFiles, OptionsOverrides, OptionsShareable, TypedConfigItem } from '..';

/**
 * Options type of {@link createSolidConfig}
 */
export type ConfigSolidOptions = OptionsFiles & OptionsOverrides & OptionsShareable;

/**
 * Creates a basic configuration for Solid.
 *
 * @see {@link https://github.com/solidjs-community/eslint-plugin-solid}
 *
 * @param options - {@link ConfigSolidOptions}
 * @returns A list of flat config items.
 */
export async function createSolidConfig(options: ConfigSolidOptions = {}): Promise<TypedConfigItem[]> {
  await ensurePackages(['eslint-plugin-solid']);

  const pluginSolid = await interopDefault(import('eslint-plugin-solid'));

  const { files = [GLOB_JSX, GLOB_TSX], typescript: enableTypeScript } = options;

  return [
    {
      name: 'sankeyangshu/solid',
      files,
      plugins: {
        solid: pluginSolid,
      },
      languageOptions: {
        parser: parserTypeScript as ESLintParser,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        sourceType: 'module',
      },
      rules: {
        // reactivity
        'solid/components-return-once': 'warn',
        'solid/event-handlers': [
          'error',
          {
            // if true, don't warn on ambiguously named event handlers like `onclick` or `onchange`
            ignoreCase: false,
            // if true, warn when spreading event handlers onto JSX. Enable for Solid < v1.6.
            warnOnSpread: false,
          },
        ],
        // these rules are mostly style suggestions
        'solid/imports': 'error',
        // identifier usage is important
        'solid/jsx-no-duplicate-props': 'error',
        'solid/jsx-no-script-url': 'error',
        'solid/jsx-no-undef': 'error',
        'solid/jsx-uses-vars': 'error',
        'solid/no-destructure': 'error',
        // security problems
        'solid/no-innerhtml': ['error', { allowStatic: true }],
        'solid/no-react-deps': 'error',
        'solid/no-react-specific-props': 'error',
        'solid/no-unknown-namespaces': 'error',
        'solid/prefer-for': 'error',
        'solid/reactivity': 'warn',
        'solid/self-closing-comp': 'error',
        'solid/style-prop': ['error', { styleProps: ['style', 'css'] }],

        ...(enableTypeScript
          ? {
              'solid/jsx-no-undef': ['error', { typescriptEnabled: true }],
              'solid/no-unknown-namespaces': 'off',
            }
          : {}),

        // Overrides rules
        ...options.overrides,
      },
    },
  ];
}
