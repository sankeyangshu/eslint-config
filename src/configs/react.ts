import { isPackageExists } from 'local-pkg';
import { GLOB_ASTRO_TS, GLOB_MARKDOWN, GLOB_SRC, GLOB_TS, GLOB_TSX } from '../constants';
import { ensurePackages, interopDefault } from '../utils';
import type { OptionsFiles, OptionsOverrides, OptionsShareable, TypedConfigItem } from '../types';

/**
 * Options type of {@link createReactConfig}
 */
export type ConfigReactOptions = OptionsFiles &
  OptionsOverrides &
  Pick<OptionsShareable, 'extraFileExtensions'> & {
    /**
     * Glob patterns for files that should be type aware.
     * @default ['**\/*.{ts,tsx}']
     */
    filesTypeAware?: string[];

    /**
     * Glob patterns for files that should not be type aware.
     * @default ['**\/*.md\/**', '**\/*.astro/*.ts']
     */
    ignoresTypeAware?: string[];

    /**
     * Overrides built-in type aware rules
     */
    overridesTypeAwareRules?: TypedConfigItem['rules'];

    /**
     * Enable type aware check for TypeScript files
     */
    tsconfigPath?: string;
  };

const ReactRefreshAllowConstantExportPackages = ['vite'];
const RemixPackages = ['@remix-run/node', '@remix-run/react', '@remix-run/serve', '@remix-run/dev'];
const ReactRouterPackages = ['@react-router/node', '@react-router/react', '@react-router/serve', '@react-router/dev'];
const NextJsPackages = ['next'];

const typeAwareRules: TypedConfigItem['rules'] = {
  'react/no-leaked-conditional-rendering': 'warn',
};

/**
 * Creates a basic configuration for React using ESLint plugins.
 * @see {@link https://github.com/Rel1cx/eslint-react}
 *
 * @param options - {@link ConfigReactOptions}
 * @returns A list of flat config items.
 */
export async function createReactConfig(options: ConfigReactOptions = {}): Promise<TypedConfigItem[]> {
  await ensurePackages(['@eslint-react/eslint-plugin', 'eslint-plugin-react-hooks', 'eslint-plugin-react-refresh']);

  const [pluginReact, pluginReactHooks, pluginReactRefresh] = await Promise.all([
    interopDefault(import('@eslint-react/eslint-plugin')),
    interopDefault(import('eslint-plugin-react-hooks')),
    interopDefault(import('eslint-plugin-react-refresh')),
  ] as const);

  const {
    files = [GLOB_SRC],
    filesTypeAware = [GLOB_TS, GLOB_TSX],
    ignoresTypeAware = [`${GLOB_MARKDOWN}/**`, GLOB_ASTRO_TS],
    overrides = {},
    tsconfigPath,
  } = options;

  const enableTypeAwareLint = !!tsconfigPath;

  const isAllowConstantExport = ReactRefreshAllowConstantExportPackages.some((i) => isPackageExists(i));
  const isUsingRemix = RemixPackages.some((i) => isPackageExists(i));
  const isUsingReactRouter = ReactRouterPackages.some((i) => isPackageExists(i));
  const isUsingNext = NextJsPackages.some((i) => isPackageExists(i));

  const plugins = pluginReact.configs.all.plugins;

  return [
    {
      name: 'sankeyangshu/react/setup',

      plugins: {
        react: plugins['@eslint-react'],
        'react-dom': plugins['@eslint-react/dom'],
        'react-hooks': pluginReactHooks,
        'react-hooks-extra': plugins['@eslint-react/hooks-extra'],
        'react-naming-convention': plugins['@eslint-react/naming-convention'],
        'react-refresh': pluginReactRefresh,
        'react-web-api': plugins['@eslint-react/web-api'],
      },
    },
    {
      name: 'sankeyangshu/react/rules',
      files,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        sourceType: 'module',
      },
      rules: {
        // recommended rules from eslint-plugin-react-x https://eslint-react.xyz/docs/rules/overview#core-rules
        'react/jsx-no-duplicate-props': 'warn',
        'react/jsx-uses-vars': 'warn',
        'react/no-access-state-in-setstate': 'error',
        'react/no-array-index-key': 'warn',
        'react/no-children-count': 'warn',
        'react/no-children-for-each': 'warn',
        'react/no-children-map': 'warn',
        'react/no-children-only': 'warn',
        'react/no-children-to-array': 'warn',
        'react/no-clone-element': 'warn',
        'react/no-comment-textnodes': 'warn',
        'react/no-component-will-mount': 'error',
        'react/no-component-will-receive-props': 'error',
        'react/no-component-will-update': 'error',
        'react/no-context-provider': 'warn',
        'react/no-create-ref': 'error',
        'react/no-default-props': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-duplicate-key': 'warn',
        'react/no-forward-ref': 'warn',
        'react/no-implicit-key': 'warn',
        'react/no-missing-key': 'error',
        'react/no-nested-component-definitions': 'error',
        'react/no-prop-types': 'error',
        'react/no-redundant-should-component-update': 'error',
        'react/no-set-state-in-component-did-mount': 'warn',
        'react/no-set-state-in-component-did-update': 'warn',
        'react/no-set-state-in-component-will-update': 'warn',
        'react/no-string-refs': 'error',
        'react/no-unsafe-component-will-mount': 'warn',
        'react/no-unsafe-component-will-receive-props': 'warn',
        'react/no-unsafe-component-will-update': 'warn',
        'react/no-unstable-context-value': 'warn',
        'react/no-unstable-default-props': 'warn',
        'react/no-unused-class-component-members': 'warn',
        'react/no-unused-state': 'warn',
        'react/no-use-context': 'warn',
        'react/no-useless-forward-ref': 'warn',

        // react refresh
        'react-refresh/only-export-components': [
          'warn',
          {
            allowConstantExport: isAllowConstantExport,
            allowExportNames: [
              ...(isUsingNext
                ? [
                    'dynamic',
                    'dynamicParams',
                    'revalidate',
                    'fetchCache',
                    'runtime',
                    'preferredRegion',
                    'maxDuration',
                    'config',
                    'generateStaticParams',
                    'metadata',
                    'generateMetadata',
                    'viewport',
                    'generateViewport',
                  ]
                : []),
              ...(isUsingRemix || isUsingReactRouter
                ? [
                    'meta',
                    'links',
                    'headers',
                    'loader',
                    'action',
                    'clientLoader',
                    'clientAction',
                    'handle',
                    'shouldRevalidate',
                  ]
                : []),
            ],
          },
        ],

        // react runtime
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',

        // Overrides rules
        ...overrides,
      },
    },
    ...(enableTypeAwareLint
      ? [
          {
            files: filesTypeAware,
            ignores: ignoresTypeAware,
            name: 'sankeyangshu/react/type-aware-rules',
            rules: {
              ...typeAwareRules,
              ...(options.overridesTypeAwareRules ?? {}),
            },
          },
        ]
      : []),
  ];
}
