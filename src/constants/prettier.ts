import type { PrettierOptions } from '../types';

/**
 * Default prettier rules
 */
export const PRETTIER_DEFAULT_OPTIONS: PrettierOptions = {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  experimentalOperatorPosition: 'end',
  experimentalTernaries: false,
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: true,
  objectWrap: 'preserve',
  printWidth: 120,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  rangeEnd: Number.POSITIVE_INFINITY,
  rangeStart: 0,
  requirePragma: false,
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  vueIndentScriptAndStyle: false,
};
