# @sankeyangshu/eslint-config

[English](./README.md) | 中文

Sankeyangshu 的 ESLint 扁平化配置预设，包含 prettier。

## 功能

- 使用 Prettier 格式化代码
- 默认配置支持 JavaScript 和 TypeScript
- 支持 JSON(5)、YAML、Markdown 等格式
- 有主见，但非常可定制
- 可选 Vue、React、ReactNative、Solid、Svelte 和 Astro 支持
- 可选格式化程序支持格式化 CSS、HTML、YAML、Markdown 等。
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
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },
  "eslint.useFlatConfig": true,
  "editor.formatOnSave": false,
  "eslint.validate": [
    // "javascript", // 默认支持
    // "javascriptreact", // 默认支持
    // "typescript",  // 默认支持
    // "typescriptreact", // 默认支持
    // 添加你想要检查和格式化的语言
    "vue",
    "svelte",
    "astro",
    "html",
    "css",
    "json",
    "jsonc",
    "yaml"
    "toml",
    "markdown"
  ],
  "prettier.enable": false
}
```

### 在package.json 中添加命令

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## 配置

````typescript
interface Options {
  /**
   * 项目根目录
   *
   * @default process.cwd()
   */
  cwd: string;
  /**
   * 被忽略的 glob
   */
  ignores: string[];
  /**
   * 启用 gitignore 支持
   *
   * @default true
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   */
  gitignore?: boolean | FlatGitignoreOptions;
  /**
   * 覆盖的规则
   */
  overrides?: FlatConfigItem['rules'];
  /**
   * 默认的Prettier配置
   *
   * @default
   * ```json
   * {
   *    "useTabs": false,
   *    "tabWidth": 2,
   *    "printWidth": 100,
   *    "singleQuote": true,
   *    "trailingComma": "es5",
   *    "bracketSpacing": true,
   *    "semi": true
   * }
   * ```
   */
  prettierRules: PartialPrettierExtendedOptions;
  /**
   * 是否使用 prettierrc 进行 prettier 配置
   *
   * 如果为 true，prettierrc 中的规则将会覆盖默认规则
   *
   * @default true
   */
  usePrettierrc: boolean;

  /**
   * 格式化器
   * @default 默认支持的格式化器
   * {
   *  "html": true,
   *  "css": true,
   * }
   */
  formatter: {
    html?: boolean;
    css?: boolean;
    markdown?: boolean;
    yaml?: boolean;
    toml?: boolean;
  };
  vue?: VueOptions | boolean;
  react?: RuleBaseOptions | boolean;
  'react-native'?: RuleBaseOptions | boolean;
  solid?: RuleBaseOptions | boolean;
  svelte?: RuleBaseOptions | boolean;
  astro?: RuleBaseOptions | boolean;
}

type RuleBaseOptions<T = NonNullable<unknown>> = T & {
  /**
   * 需要被检测的文件
   */
  files?: string[];
};

type VueOptions = RuleBaseOptions<{
  /**
   * Vue 版本
   *
   * @default 3
   */
  version?: 2 | 3;
}>;
````

## 感谢

- [Antfu's eslint-config](https://github.com/antfu/eslint-config)
- [Sxzz's eslint-config](https://github.com/sxzz/eslint-config)

## License

[MIT](./LICENSE) License &copy; 2024-PRESENT [sankeyangshu](https://github.com/sankeyangshu)
