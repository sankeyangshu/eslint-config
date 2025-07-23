import {
  GLOB_JSON_SCHEMA,
  GLOB_PACKAGE_JSON,
  GLOB_PNPM_WORKSPACE_YAML,
  GLOB_TS_CONFIG,
  GLOB_TS_OTHER_CONFIG,
} from '../constants';
import type { TypedConfigItem } from '../types';

/**
 * Options type of {@link createSortConfig}
 */
export interface ConfigSortOptions {
  /**
   * JSON files to sort all properties alphabeta
   */
  additionalJsonFiles?: string[];

  /**
   * YAML files to sort all properties alphabeta
   */
  additionalYamlFiles?: string[];

  /**
   * @default true
   */
  i18nLocale?: boolean;

  /**
   * @default true
   */
  packageJson?: boolean;

  /**
   * @default true
   */
  pnpmWorkspace?: boolean;

  /**
   * @default true
   */
  tsconfig?: boolean;

  /**
   * @default true
   */
  jsonSchema?: boolean;
}

/**
 * Creates a basic configuration for Perfectionist.
 *
 * @param options - {@link ConfigSortOptions}
 * @returns A list of flat config items.
 */
export function createSortConfig(options: ConfigSortOptions = {}): TypedConfigItem[] {
  const configs: TypedConfigItem[] = [];
  const {
    additionalJsonFiles = [],
    additionalYamlFiles = [],
    i18nLocale: enableSortI18nLocale = true,
    jsonSchema: enableSortJsonSchema = true,
    packageJson: enableSortPackageJson = true,
    pnpmWorkspace: enableSortPnpmWorkspace = true,
    tsconfig: enableSortTsconfig = true,
  } = options;

  if (enableSortTsconfig) {
    configs.push({
      name: 'sankeyangshu/sort/tsconfig',
      files: [GLOB_TS_CONFIG, GLOB_TS_OTHER_CONFIG],
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
    });
  }

  if (enableSortPackageJson) {
    configs.push({
      name: 'sankeyangshu/sort/package-json',
      files: [GLOB_PACKAGE_JSON],
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
    });
  }

  if (enableSortI18nLocale) {
    configs.push(
      {
        name: 'sankeyangshu/sort/i18n-locale/json',
        files: ['**/{i18n,langs,locales}/*.json'],
        rules: {
          'jsonc/sort-keys': [
            'error',
            {
              order: { type: 'asc' },
              pathPattern: '.*',
            },
          ],
        },
      },
      {
        name: 'sankeyangshu/sort/i18n-locale/yaml',
        files: ['**/{i18n,langs,locales}/*.y?(a)ml'],
        rules: {
          'yml/sort-keys': [
            'error',
            {
              order: { type: 'asc' },
              pathPattern: '.*',
            },
          ],
        },
      }
    );
  }

  /**
   * @see {@link https://json-schema.org/draft-07/schema}
   */
  if (enableSortJsonSchema) {
    configs.push({
      name: 'sankeyangshu/sort/json-schema',
      files: [...GLOB_JSON_SCHEMA],
      ignores: [GLOB_PACKAGE_JSON],
      rules: {
        'jsonc/sort-array-values': [
          'error',
          {
            order: { type: 'asc' },
            pathPattern: '^(?:required)$',
          },
        ],
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              // Meta
              '$schema',
              '$comment',
              '$id',
              '$ref',
              'title',
              'description',
              'version',
              'type',

              'definitions',
              'properties',
              'required',
              'additionalProperties',
              // Unknown fields
              {
                order: {
                  type: 'asc',
                },
              },
            ],
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(?:definitions|properties)$',
          },
        ],
      },
    });
  }

  if (enableSortPnpmWorkspace) {
    configs.push({
      name: 'sankeyangshu/sort/pnpm-workspace',
      files: [GLOB_PNPM_WORKSPACE_YAML],
      rules: {
        'yml/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              // legacy workspace content
              'packages',
              'catalog',
              'catalogs',

              // pnpm settings with common used fields first
              'allowedDeprecatedVersions',
              'overrides',
              'onlyBuiltDependencies',
              'patchedDependencies',
              'peerDependencyRules',

              // non common used fields
              'allowNonAppliedPatches',
              'auditConfig',
              'configDependencies',
              'executionEnv',
              'ignoredBuiltDependencies',
              'ignoredOptionalDependencies',
              'neverBuiltDependencies',
              'onlyBuiltDependenciesFile',
              'packageExtensions',
              'requiredScripts',
              'supportedArchitectures',
              'updateConfig',
              // Unknown fields
              {
                order: {
                  type: 'asc',
                },
              },
            ],
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(?:catalog|overrides|patchedDependencies|peerDependencyRules)$',
          },
          {
            allowLineSeparatedGroups: true,
            order: { type: 'asc' },
            pathPattern: '^catalogs$',
          },
        ],
        'yml/sort-sequence-values': [
          'error',
          {
            order: [
              '.',
              // Unknown fields
              {
                order: {
                  type: 'asc',
                },
              },
            ],
            pathPattern: '^(?:packages|onlyBuiltDependencies|peerDependencyRules.ignoreMissing)$',
          },
        ],
      },
    });
  }

  if (additionalJsonFiles.length) {
    configs.push({
      name: 'sankeyangshu/sort/additional-json',
      files: additionalJsonFiles,
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '.*',
            order: [
              '$schema',
              {
                order: { type: 'asc' },
              },
            ],
          },
        ],
      },
    });
  }

  if (additionalYamlFiles.length) {
    configs.push({
      name: 'sankeyangshu/sort/additional-yaml',
      files: additionalYamlFiles,
      rules: {
        'yml/sort-keys': [
          'error',
          {
            order: { type: 'asc' },
            pathPattern: '.*',
          },
        ],
      },
    });
  }

  return configs;
}
