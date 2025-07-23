# @sankeyangshu/eslint-config

English | [简体中文](./README.zh_CN.md)

Sankeyangshu's ESLint flat configuration preset, includes Prettier.

## Features

- Format code with Prettier
- Default configuration supports JavaScript and TypeScript
- Supports JSON(5), YAML, Markdown, and other formats
- Opinionated, but highly customizable
- Optional support for Vue, React, Solid, Svelte, and Astro
- Automatically sorts imports, `package.json`, `tsconfig.json`, and other files
- Supports [ESLint Flat configuration](https://eslint.org/docs/latest/use/configure/configuration-files-new), easy to compose!
- Ignores files in common folders like `dist`, `node_modules`, `coverage`
- Respects `.gitignore` by default
- Reasonably strict, but improves code quality
- Requires ESLint v9.5.0+

## Install

```bash
pnpm i -D eslint @sankeyangshu/eslint-config
```

## Usage

### ESLint config file

- Add [`"type": "module"`](https://nodejs.org/api/packages.html#type) to your `package.json`

- Create an `eslint.config.js` file

- Import the configuration `@sankeyangshu/eslint-config`

```js
import { defineConfig } from '@sankeyangshu/eslint-config';

export default defineConfig({
  // options
});
```

> [!NOTE]
> Check out [Configuration](#configuration) for more details.

### ESLint Settings in VSCode

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },
  "eslint.useFlatConfig": true,
  "eslint.validate": [
    "vue",
    "svelte",
    "astro",
    "yaml",
    "toml",
    "json",
    "jsonc",
    "json5",
    "markdown",
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact"
  ],
  "prettier.enable": true
}
```

### Scripts in package.json

```json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

## Configuration

```typescript
interface ConfigOptions {
  /**
   * Shareable options
   */
  shareable?: OptionsShareable;

  /**
   * Auto rename plugins
   * @default true
   */
  autoRenamePlugins?: boolean;

  /**
   * Configs enabled by default
   */
  command?: ConfigCommandOptions;
  comments?: ConfigCommentsOptions;
  ignores?: ConfigIgnoresOptions;
  node?: ConfigNodeOptions;
  javascript?: ConfigJavaScriptOptions;

  // TODO: Temporarily disabled, may be enabled later; currently using prettier for formatting
  // formatter?: boolean | ConfigFormatOptions;

  /**
   * Configs below can be disabled
   */
  gitignore?: boolean | ConfigGitIgnoreOptions;
  imports?: boolean | ConfigImportOptions;
  jsdoc?: boolean | ConfigJsdocOptions;
  jsonc?: boolean | ConfigJsoncOptions;
  markdown?: boolean | ConfigMarkdownOptions;
  disables?: boolean | ConfigDisablesOptions;
  perfectionist?: boolean | ConfigPerfectionistOptions;
  prettier?: boolean | ConfigPrettierOptions;
  yml?: boolean | ConfigYmlOptions;
  regexp?: boolean | ConfigRegexpOptions;
  sort?: boolean | ConfigSortOptions;
  unicorn?: boolean | ConfigUnicornOptions;
  toml?: boolean | ConfigTomlOptions;

  /**
   * Configs below are disabled by default
   */
  astro?: boolean | ConfigAstroOptions;
  solid?: boolean | ConfigSolidOptions;
  svelte?: boolean | ConfigSvelteOptions;
  test?: boolean | ConfigTestOptions;
  pnpm?: boolean | ConfigPnpmOptions;
  typescript?: boolean | ConfigTypeScriptOptions;
  react?: boolean | ConfigReactOptions;
  unocss?: boolean | ConfigUnoCSSOptions;
  vue?: boolean | ConfigVueOptions;
}
```

<details>
<summary>💼 Intergrated with Prettier</summary>

## Prettier config

> Feel free to use your own prettier config.

Install `prettier` and setup your prettier config:

```shell
npm i prettier -D
```

```shell
yarn add prettier -D
```

```shell
pnpm add prettier -D
```

```shell
bun add prettier -D
```

```json
// .prettierrc
{
  "arrowParens": "always",
  "bracketSameLine": false,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "endOfLine": "lf",
  "experimentalOperatorPosition": "end",
  "experimentalTernaries": false,
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": true,
  "objectWrap": "preserve",
  "printWidth": 120,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "rangeStart": 0,
  "requirePragma": false,
  "semi": true,
  "singleAttributePerLine": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "vueIndentScriptAndStyle": false
}
```

</details>

## Thanks

- [Antfu's eslint-config](https://github.com/antfu/eslint-config)
- [Sxzz's eslint-config](https://github.com/sxzz/eslint-config)

## License

[MIT](./LICENSE) License &copy; 2024-PRESENT [sankeyangshu](https://github.com/sankeyangshu)
