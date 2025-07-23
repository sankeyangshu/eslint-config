# @sankeyangshu/eslint-config

[English](./README.md) | 简体中文

Sankeyangshu 的 ESLint 扁平化配置预设，包含 prettier。

## 功能

- 使用 Prettier 格式化代码
- 默认配置支持 JavaScript 和 TypeScript
- 支持 JSON(5)、YAML、Markdown 等格式
- 有主见，但非常可定制
- 可选 Vue、React、Solid、Svelte 和 Astro 支持
- 自动排序导入、`package.json`、`tsconfig.json` 等文件。
- 支持 [ESLint Flat 配置](https://eslint.org/docs/latest/use/configure/configuration-files-new)，易于组合！
- 忽略常见文件夹，如 `dist`、`node_modules`、`coverage` 中的文件
- 默认情况下尊重 .gitignore
- 合理严格，但提升代码质量
- 需要 ESLint v9.5.0+

## 安装

```bash
pnpm i -D eslint @sankeyangshu/eslint-config
```

## 用法

### ESLint 配置文件

- 在 `package.json` 中添加 [`"type": "module"`](https://nodejs.org/api/packages.html#type)

- 创建配置文件 `eslint.config.js`

- 导入配置 `@sankeyangshu/eslint-config`

```js
import { defineConfig } from '@sankeyangshu/eslint-config';

export default defineConfig({
  // options
});
```

> [!NOTE]
> 查看 [配置](#配置) 获取更多细节。

### VSCode 中的 ESLint 设置

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

### 在package.json 中添加命令

```json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

## 配置

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

  // TODO: 暂时禁用，可能以后会启用；目前使用 prettier 格式化
  // formatter?: boolean | ConfigFormatOptions;

  /**
   * Configs bellow can be disabled
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
   * Configs bellow are disabled by default
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
<summary>💼 集成 Prettier</summary>

## Prettier 配置

> 您可以自由使用自己的 prettier 配置。

安装 `prettier` 并设置您的 prettier 配置：

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

## 感谢

- [Antfu's eslint-config](https://github.com/antfu/eslint-config)
- [Sxzz's eslint-config](https://github.com/sxzz/eslint-config)

## License

[MIT](./LICENSE) License &copy; 2024-PRESENT [sankeyangshu](https://github.com/sankeyangshu)
