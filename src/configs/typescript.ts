import { GLOB_SRC } from '../constants';
import type { FlatConfigItemType } from '../types';
import { interopDefault } from '../utils';

/**
 * Create a basic configuration for TypeScript.
 *
 * @returns A list of flat config items.
 */
export async function createTypescriptRules(): Promise<FlatConfigItemType['rules']> {
  const pluginTs = await interopDefault(import('@typescript-eslint/eslint-plugin'));

  const { rules: recommendedRules } = pluginTs.configs['eslint-recommended'].overrides![0];

  const tsRules = {
    ...pluginTs.configs.base.rules,
    ...recommendedRules,
    ...pluginTs.configs.strict.rules,
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', disallowTypeAnnotations: false },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    // Override JS
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'all',
        ignoreRestSiblings: false,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: false, variables: true },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    // off
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/unified-signatures': 'off',
  };

  return tsRules as unknown as FlatConfigItemType['rules'];
}

export async function createTypescriptConfig(
  overrides: Record<string, string> = {}
): Promise<FlatConfigItemType[]> {
  const [pluginTs, parserTs] = await Promise.all([
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const);

  const tsRules = await createTypescriptRules();

  return [
    {
      files: [GLOB_SRC],
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          sourceType: 'module',
        },
      },
      plugins: {
        '@typescript-eslint': pluginTs,
      },
      rules: {
        ...tsRules,
        ...(overrides as any),
      },
    },
    {
      files: ['**/*.js', '**/*.cjs'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ];
}