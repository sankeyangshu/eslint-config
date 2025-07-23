import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { pluginImportX } from '../eslint';
import type { OptionsOverrides, OptionsShareable, TypedConfigItem } from '../types';

/**
 * Options type of {@link createImportsConfig}
 */
export type ConfigImportOptions = Pick<OptionsShareable, 'typescript'> &
  OptionsOverrides & {
    /**
     * Use [eslint-import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript) if `typescript` is installed
     *
     * @default true
     */
    preferTypeScriptResolver?: boolean;
  };

/**
 * Create a basic configuration for imports.
 *
 * @see {@link https://github.com/un-ts/eslint-plugin-import-x}
 * @param options - {@link ConfigImportOptions}
 * @returns A list of flat config items.
 */
export function createImportsConfig(options: ConfigImportOptions = {}): TypedConfigItem[] {
  const {
    // use typescript resolve if possible
    preferTypeScriptResolver = true,
    typescript: enableTypeScript,
  } = options;

  return [
    {
      name: 'sankeyangshu/imports',
      plugins: {
        import: pluginImportX,
      },
      settings: {
        'import/resolver-next': [
          enableTypeScript && preferTypeScriptResolver
            ? createTypeScriptImportResolver({
                extensions: ['.ts', '.tsx', '.d.ts', '.js', '.jsx', '.json', '.node'],
              })
            : pluginImportX.createNodeResolver({
                extensions: ['.js', '.mjs', '.ts', '.mts', '.d.ts', '.json'],
              }),
        ],
      },
      rules: {
        'import/export': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/order': 'off',

        // Overrides rules
        ...options.overrides,
      },
    },
  ];
}
