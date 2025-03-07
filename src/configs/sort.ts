import { interopDefault } from '../utils';
import type { FlatConfigItemType } from '../types';

/**
 * Creates a basic configuration for Perfectionist.
 *
 * @param overrides Optional overrides for the default rules.
 * @returns A list of flat config items.
 */
export async function createPerfectionistConfig(
  overrides: Record<string, string> = {}
): Promise<FlatConfigItemType[]> {
  const pluginPerfectionist = await interopDefault(import('eslint-plugin-perfectionist'));

  return [
    {
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      rules: {
        'perfectionist/sort-imports': [
          'warn',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'internal-type',
              'parent',
              'parent-type',
              'sibling',
              'sibling-type',
              'index',
              'index-type',
              'object',
              'type',
              'side-effect',
              'side-effect-style',
            ],
            internalPattern: ['^[~@#]/.*'],
            newlinesBetween: 'ignore',
          },
        ],
        'perfectionist/sort-named-exports': ['warn', { groupKind: 'values-first' }],
        'perfectionist/sort-named-imports': ['warn', { groupKind: 'values-first' }],

        ...overrides,
      },
    },
  ];
}

/**
 * Creates a basic configuration for sorting `package.json` files.
 *
 * @returns A list of flat config items.
 */
export function createSortPackageJsonConfig(): FlatConfigItemType[] {
  return [
    {
      files: ['**/package.json'],
      rules: {
        'jsonc/sort-array-values': [
          'error',
          {
            order: { type: 'asc' },
            pathPattern: '^files$',
          },
        ],
        'jsonc/sort-keys': [
          'error',
          {
            order: [
              'name',
              'version',
              'type',
              'private',
              'packageManager',
              'description',
              'author',
              'license',
              'homepage',
              'repository',
              'bugs',
              'keywords',
              'contributors',
              'funding',
              'main',
              'module',
              'types',
              'files',
              'engines',
              'exports',
              'typesVersions',
              'sideEffects',
              'unpkg',
              'jsdelivr',
              'browser',
              'bin',
              'man',
              'directories',
              'publishConfig',
              'scripts',
              'peerDependencies',
              'peerDependenciesMeta',
              'optionalDependencies',
              'dependencies',
              'devDependencies',
              'pnpm',
              'config',
              'overrides',
              'husky',
              'simple-git-hooks',
              'lint-staged',
              'eslintConfig',
              'prettier',
            ],
            pathPattern: '^$',
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$',
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$',
          },
          {
            order: ['types', 'import', 'require', 'default'],
            pathPattern: '^exports.*$',
          },
          {
            order: [
              // client hooks only
              'pre-commit',
              'prepare-commit-msg',
              'commit-msg',
              'post-commit',
              'pre-rebase',
              'post-rewrite',
              'post-checkout',
              'post-merge',
              'pre-push',
              'pre-auto-gc',
            ],
            pathPattern: '^(?:gitHooks|husky|simple-git-hooks)$',
          },
        ],
      },
    },
  ];
}

/**
 * Creates a basic configuration for sorting `tsconfig.json` files.
 *
 * @returns A list of flat config items with sorting rules for TypeScript configuration files.
 */

export function createSortTsConfig(): FlatConfigItemType[] {
  return [
    {
      files: ['**/tsconfig.json', '**/tsconfig.*.json'],
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            order: ['extends', 'compilerOptions', 'references', 'files', 'include', 'exclude'],
            pathPattern: '^$',
          },
          {
            order: [
              /* Projects */
              'incremental',
              'composite',
              'tsBuildInfoFile',
              'disableSourceOfProjectReferenceRedirect',
              'disableSolutionSearching',
              'disableReferencedProjectLoad',
              /* Language and Environment */
              'target',
              'jsx',
              'jsxFactory',
              'jsxFragmentFactory',
              'jsxImportSource',
              'lib',
              'moduleDetection',
              'noLib',
              'reactNamespace',
              'useDefineForClassFields',
              'emitDecoratorMetadata',
              'experimentalDecorators',
              /* Modules */
              'baseUrl',
              'rootDir',
              'rootDirs',
              'customConditions',
              'module',
              'moduleResolution',
              'moduleSuffixes',
              'noResolve',
              'paths',
              'resolveJsonModule',
              'resolvePackageJsonExports',
              'resolvePackageJsonImports',
              'typeRoots',
              'types',
              'allowArbitraryExtensions',
              'allowImportingTsExtensions',
              'allowUmdGlobalAccess',
              /* JavaScript Support */
              'allowJs',
              'checkJs',
              'maxNodeModuleJsDepth',
              /* Type Checking */
              'strict',
              'strictBindCallApply',
              'strictFunctionTypes',
              'strictNullChecks',
              'strictPropertyInitialization',
              'allowUnreachableCode',
              'allowUnusedLabels',
              'alwaysStrict',
              'exactOptionalPropertyTypes',
              'noFallthroughCasesInSwitch',
              'noImplicitAny',
              'noImplicitOverride',
              'noImplicitReturns',
              'noImplicitThis',
              'noPropertyAccessFromIndexSignature',
              'noUncheckedIndexedAccess',
              'noUnusedLocals',
              'noUnusedParameters',
              'useUnknownInCatchVariables',
              /* Emit */
              'declaration',
              'declarationDir',
              'declarationMap',
              'downlevelIteration',
              'emitBOM',
              'emitDeclarationOnly',
              'importHelpers',
              'importsNotUsedAsValues',
              'inlineSourceMap',
              'inlineSources',
              'mapRoot',
              'newLine',
              'noEmit',
              'noEmitHelpers',
              'noEmitOnError',
              'outDir',
              'outFile',
              'preserveConstEnums',
              'preserveValueImports',
              'removeComments',
              'sourceMap',
              'sourceRoot',
              'stripInternal',
              /* Interop Constraints */
              'allowSyntheticDefaultImports',
              'esModuleInterop',
              'forceConsistentCasingInFileNames',
              'isolatedDeclarations',
              'isolatedModules',
              'preserveSymlinks',
              'verbatimModuleSyntax',
              /* Completeness */
              'skipDefaultLibCheck',
              'skipLibCheck',
            ],
            pathPattern: '^compilerOptions$',
          },
        ],
      },
    },
  ];
}
