import { GLOB_JSX, GLOB_TSX } from '../constants';
import { ensurePackages, interopDefault } from '../utils';
import type {
  FlatConfigItemType,
  OptionsHasTypeScript,
  RequiredRuleBaseOptionsType,
} from '../types';

/**
 * Creates a basic configuration for Solid.
 *
 * @param options Optional options for the config.
 * @param overrides Optional overrides for the config.
 * @returns A list of flat config items.
 */
export async function createSolidConfig(
  options?: RequiredRuleBaseOptionsType & OptionsHasTypeScript,
  overrides: Record<string, string> = {}
): Promise<FlatConfigItemType[]> {
  if (!options) return [];

  const { files = [GLOB_JSX, GLOB_TSX], typescript = true } = options;

  await ensurePackages(['eslint-plugin-solid']);

  const [pluginSolid, parserTs] = await Promise.all([
    interopDefault(import('eslint-plugin-solid')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const);

  return [
    {
      plugins: {
        solid: pluginSolid,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserTs,
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
        ...(typescript
          ? {
              'solid/jsx-no-undef': ['error', { typescriptEnabled: true }],
              'solid/no-unknown-namespaces': 'off',
            }
          : {}),
        // overrides
        ...overrides,
      },
    },
  ];
}
