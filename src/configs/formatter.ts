import { GLOB_CSS, GLOB_HTML, GLOB_LESS, GLOB_POSTCSS, GLOB_SCSS, PRETTIER_DEFAULT_OPTIONS } from '../constants';
import { parserPlain } from '../eslint';
import { ensurePackages, interopDefault, mergePrettierOptions } from '../utils';
import type { PrettierOptions, TypedConfigItem } from '../types';

/**
 * Options type of {@link createFormatterConfig}
 */
export interface ConfigFormatOptions {
  /**
   * Enable formatter support for css, less, scss, sass and etc.
   *
   * @default true
   */
  css?: boolean;

  /**
   * Enable formatter support for html
   *
   * @default true
   */
  html?: boolean;

  /**
   * Options for prettier
   */
  prettierOptions?: PrettierOptions;
}

/**
 * Config to use a formatter
 *
 * @see {@link https://github.com/antfu/eslint-plugin-format}
 *
 * @param options - {@link ConfigFormatOptions}
 * @returns ESLint configs
 */
export async function createFormatterConfig(options: ConfigFormatOptions = {}): Promise<TypedConfigItem[]> {
  await ensurePackages(['eslint-plugin-format']);

  const pluginFormat = await interopDefault(import('eslint-plugin-format'));

  const { css: enableCSS = true, html: enableHTML = true, prettierOptions = {} } = options;

  const sharedPrettierOptions: PrettierOptions = {
    ...PRETTIER_DEFAULT_OPTIONS,
    ...prettierOptions,
  };

  const configs: TypedConfigItem[] = [
    {
      name: 'sankeyangshu/format/setup',
      plugins: {
        format: pluginFormat,
      },
    },
  ];

  if (enableCSS) {
    configs.push(
      {
        name: 'sankeyangshu/format/css',
        files: [GLOB_CSS, GLOB_POSTCSS],
        languageOptions: {
          parser: parserPlain,
        },
        rules: {
          'format/prettier': [
            'error',
            mergePrettierOptions(sharedPrettierOptions, {
              parser: 'css',
            }),
          ],
        },
      },
      {
        name: 'sankeyangshu/format/scss',
        files: [GLOB_SCSS],
        languageOptions: {
          parser: parserPlain,
        },
        rules: {
          'format/prettier': [
            'error',
            mergePrettierOptions(sharedPrettierOptions, {
              parser: 'scss',
            }),
          ],
        },
      },
      {
        name: 'sankeyangshu/format/less',
        files: [GLOB_LESS],
        languageOptions: {
          parser: parserPlain,
        },
        rules: {
          'format/prettier': [
            'error',
            mergePrettierOptions(sharedPrettierOptions, {
              parser: 'less',
            }),
          ],
        },
      }
    );
  }

  if (enableHTML) {
    configs.push({
      name: 'sankeyangshu/format/html',
      files: [GLOB_HTML],
      languageOptions: {
        parser: parserPlain,
      },
      rules: {
        'format/prettier': [
          'error',
          mergePrettierOptions(sharedPrettierOptions, {
            parser: 'html',
          }),
        ],
      },
    });
  }

  return configs;
}
