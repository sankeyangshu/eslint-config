import { isPackageExists } from 'local-pkg';
import type { FlatConfigItemType, RequiredRuleBaseOptionsType } from '../types';
import { ensurePackages, interopDefault } from '../utils';

/**
 * Creates a basic configuration for React using ESLint plugins. Ensures the necessary packages are
 * installed and sets up plugins and rules for linting React code with hooks and refresh support.
 *
 * @param options - Optional rule base options, including file patterns.
 * @param overrides - Optional overrides for default rules.
 * @returns A list of flat config items for ESLint.
 */
export async function createReactConfig(
  options?: RequiredRuleBaseOptionsType,
  overrides: Record<string, string> = {}
): Promise<FlatConfigItemType[]> {
  if (!options) return [];

  const { files } = options;

  await ensurePackages([
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-react-refresh',
  ]);

  const [pluginReact, pluginReactHooks, pluginReactRefresh] = await Promise.all([
    interopDefault(import('eslint-plugin-react')),
    interopDefault(import('eslint-plugin-react-hooks')),
    interopDefault(import('eslint-plugin-react-refresh')),
  ] as const);

  const ReactRefreshAllowConstantExportPackages = ['vite'];

  const isAllowConstantExport = ReactRefreshAllowConstantExportPackages.some((i) =>
    isPackageExists(i)
  );

  return [
    {
      plugins: {
        react: pluginReact,
        'react-hooks': pluginReactHooks,
        'react-refresh': pluginReactRefresh,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
    {
      files,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: {
        // recommended rules react-hooks
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',

        // react refresh
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: isAllowConstantExport },
        ],

        ...pluginReact.configs.recommended.rules,
        // react runtime
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',

        ...overrides,
      },
    },
  ];
}
