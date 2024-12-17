# @sankeyangshu/eslint-config

English | [简体中文](./README.zh_CN.md)

Sankeyangshu's ESLint flat configuration preset, includes Prettier.

## Features

- Format code with Prettier
- Default configuration supports JavaScript and TypeScript
- Supports JSON(5), YAML, Markdown, and other formats
- Opinionated, but highly customizable
- Optional support for Vue, React, ReactNative, Solid, Svelte, and Astro
- Optional formatter support for CSS, HTML, YAML, Markdown, etc.
- Automatically sorts imports, `package.json`, `tsconfig.json`, and more
- Supports [ESLint Flat configuration](https://eslint.org/docs/latest/use/configure/configuration-files-new), easy to compose!
- Ignores common folders like `dist`, `node_modules`, and `coverage`
- By default respects `.gitignore`
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
> Check out [Options](#options) for more details.

### ESLint Settings in VSCode

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },
  "eslint.useFlatConfig": true,
  "editor.formatOnSave": false,
  "eslint.validate": [
    // "javascript", // Default support
    // "javascriptreact", // Default support
    // "typescript",  // Default support
    // "typescriptreact", // Default support
    // Add any languages you want to lint and format
    "vue",
    "svelte",
    "astro",
    "html",
    "css",
    "json",
    "jsonc",
    "yaml",
    "toml",
    "markdown"
  ],
  "prettier.enable": false
}
```

### Scripts in package.json

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## Options

````typescript
interface Options {
  /**
   * Project root directory
   *
   * @default process.cwd()
   */
  cwd: string;
  /**
   * Glob patterns to ignore
   */
  ignores: string[];
  /**
   * Enable gitignore support
   *
   * @default true
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   */
  gitignore?: boolean | FlatGitignoreOptions;
  /**
   * Override rules
   */
  overrides?: FlatConfigItem['rules'];
  /**
   * Default Prettier configuration
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
   * Whether to use prettierrc for Prettier configuration
   *
   * If true, rules in prettierrc will override the default rules
   *
   * @default true
   */
  usePrettierrc: boolean;

  /**
   * Formatters
   * @default Default supported formatters
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
   * Files to lint
   */
  files?: string[];
};

type VueOptions = RuleBaseOptions<{
  /**
   * Vue version
   *
   * @default 3
   */
  version?: 2 | 3;
}>;
````

## Thanks

- [Antfu's eslint-config](https://github.com/antfu/eslint-config)
- [Sxzz's eslint-config](https://github.com/sxzz/eslint-config)

## License

[MIT](./LICENSE) License &copy; 2024-PRESENT [sankeyangshu](https://github.com/sankeyangshu)
