/**
 * Shared perfectionist plugin settings
 * @descCN 共享的 perfectionist 插件设置
 */
const pluginSettings = {
  fallbackSort: { order: 'asc', type: 'alphabetical' }, // 备用排序配置：升序字母排序
  ignoreCase: true, // 忽略大小写
  order: 'asc', // 排序顺序：升序
  partitionByNewLine: false, // 不按换行符分组
  specialCharacters: 'keep', // 保留特殊字符
  type: 'alphabetical', // 排序类型：字母排序
} as const;

/**
 * Shared perfectionist rule options for some rules
 * @descCN 部分规则的共享 perfectionist 规则选项
 */
const partialRuleOptions = {
  newlinesBetween: 'ignore', // 忽略组之间的换行
  partitionByComment: ['@pg', '@perfectionist-group'] as string[], // 按注释分组的标记
} as const;

/**
 * Shared option `groups` for rule `sort-objects`
 * @descCN 规则 `sort-objects` 的共享 `groups` 选项
 *
 * @see {@link https://perfectionist.dev/rules/sort-objects}
 */
const sortObjectsGroups: string[] = [
  'property', // 属性
  'multiline-property', // 多行属性
  'method', // 方法
  'multiline-method', // 多行方法
  'unknown', // 未知类型
];

/**
 * Shared option `groups` for rules
 * - `sort-interfaces`
 * - `sort-object-types`
 * @descCN 以下规则的共享 `groups` 选项：
 * - `sort-interfaces`
 * - `sort-object-types`
 *
 * @see {@link https://perfectionist.dev/rules/sort-interfaces}
 * @see {@link https://perfectionist.dev/rules/sort-object-types}
 */
const sortInterfacesOrObjectTypesGroups: string[] = [
  'required-property', // 必需属性
  'optional-property', // 可选属性
  'required-method', // 必需方法
  'optional-method', // 可选方法
  'required-multiline-property', // 必需多行属性
  'optional-multiline-property', // 可选多行属性
  'required-multiline-method', // 必需多行方法
  'optional-multiline-method', // 可选多行方法
  'unknown', // 未知类型
  'index-signature', // 索引签名
  'multiline-index-signature', // 多行索引签名
];

/**
 * Shared option `groups` for rules:
 * - `sort-intersection-types`
 * - `sort-union-types`
 *
 * Philosophy: keep simple thing first except null & undefined
 * @descCN 设计理念：简单类型优先，除了 null 和 undefined
 *
 * @see {@link https://perfectionist.dev/rules/sort-intersection-types}
 * @see {@link https://perfectionist.dev/rules/sort-union-types}
 */
const sortIntersectionTypesOrUnionTypesGroups: string[] = [
  /**
   * eg. 'foobar', 24, false
   * @descCN 例如：'foobar', 24, false - 字面量类型
   */
  'literal',

  /**
   * eg. number, string
   * @descCN 例如：number, string - 关键字类型
   */
  'keyword',

  /**
   * eg. FooBar
   * @descCN 例如：FooBar - 命名类型
   */
  'named',

  /**
   * eg. Foo & Bar
   * @descCN 例如：Foo & Bar - 交叉类型
   */
  'intersection',

  /**
   * eg. Foobar extends string ? Foo : Bar
   * @descCN 例如：Foobar extends string ? Foo : Bar - 条件类型
   */
  'conditional',

  /**
   * eg. (...args: any[]) => void
   * @descCN 例如：(...args: any[]) => void - 函数类型
   */
  'function',

  /**
   * eg. import('eslint').Linter
   * @descCN 例如：import('eslint').Linter - 导入类型
   */
  'import',

  /**
   * eg. { foo: string; bar: number; }
   * @descCN 例如：{ foo: string; bar: number; } - 对象类型
   */
  'object',

  /**
   * eg. keyof T
   * @descCN 例如：keyof T - 操作符类型
   */
  'operator',

  /**
   * eg. [string, number]
   * @descCN 例如：[string, number] - 元组类型
   */
  'tuple',

  /**
   * eg. Foo | Bar
   * @descCN 例如：Foo | Bar - 联合类型
   */
  'union',

  /**
   * eg. null | undefined
   * @descCN 例如：null | undefined - 空值类型
   */
  'nullish',
];

/**
 * Shared option `groups` for rule `sort-imports`
 * @descCN 规则 `sort-imports` 的共享 `groups` 选项
 *
 * @see {@link https://perfectionist.dev/rules/sort-imports}
 */
const sortImportsTypes: string[] = [
  // Side effect style imports (e.g. 'normalize.css')
  // 副作用样式导入（例如 'normalize.css'）
  'side-effect-style',

  // Styles (e.g. *.{css,scss,less})
  // 样式文件（例如 *.{css,scss,less}）
  'value-style',

  // Node.js built-in modules. (e.g. fs, path)
  // Node.js 内置模块（例如 fs, path）
  'value-builtin',

  // External modules installed in the project (e.g. vue, lodash)
  // 项目中安装的外部模块（例如 vue, lodash）
  'value-external',

  // Node.js subpath imports (e.g. fs/promises)
  // Node.js 子路径导入（例如 fs/promises）
  'value-subpath',

  // Internal modules (e.g. @/utils, @/components)
  // 内部模块（例如 @/utils, @/components）
  'value-internal',

  // Modules from parent directory (e.g. ../utils)
  // 父目录模块（例如 ../utils）
  'value-parent',

  // Modules from the same directory (e.g. ./utils)
  // 同目录模块（例如 ./utils）
  'value-sibling',

  // Main file from the current directory (e.g. ./index)
  // 当前目录主文件（例如 ./index）
  'value-index',

  // TypeScript import-equals imports (e.g. import log = console.log)
  // TypeScript import-equals 导入（例如 import log = console.log）
  'ts-equals-import',

  // Side effect imports (e.g. import 'babel-polyfill')
  // 副作用导入（例如 import 'babel-polyfill'）
  'side-effect',

  /**
   * Type import at the end
   * @descCN 类型导入放在最后
   */
  'type-builtin', // 内置类型
  'type-external', // 外部类型
  'type-subpath', // 子路径类型
  'type-internal', // 内部类型
  'type-parent', // 父目录类型
  'type-sibling', // 同级类型
  'type-index', // 索引类型

  /**
   * Imports that don't fit into any other group
   * @descCN 不符合任何其他分组的导入
   */
  'unknown',
];

/**
 * Shared option `groups` for rule `sort-exports`
 * @descCN 规则 `sort-exports` 的共享 `groups` 选项
 *
 * @see {@link https://perfectionist.dev/rules/sort-exports}
 */
const sortExportsGroups: string[] = ['value-export', 'type-export', 'unknown']; // 值导出、类型导出、未知类型

/**
 * Shared option `groups` for rule `sort-named-exports`
 * @descCN 规则 `sort-named-exports` 的共享 `groups` 选项
 *
 * @see {@link https://perfectionist.dev/rules/sort-named-exports}
 */
const sortNamedExportsGroups: string[] = [
  'value-export', // 值导出
  'type-export', // 类型导出
  'unknown', // 未知类型
];

/**
 * Shared option `groups` for rule `sort-named-imports`
 * @descCN 规则 `sort-named-imports` 的共享 `groups` 选项
 *
 * @see {@link https://perfectionist.dev/rules/sort-named-imports}
 */
const sortNamedImportsGroups: string[] = [
  'value-import', // 值导入
  'type-import', // 类型导入
  'unknown', // 未知类型
];

/**
 * Shared option `groups` for rule `sort-classes`
 * @descCN 规则 `sort-classes` 的共享 `groups` 选项
 *
 * @see {@link https://perfectionist.dev/rules/sort-classes}
 */
const sortClassesGroups: string[] = ['unknown']; // 未知类型

/**
 * Shared constants about eslint-plugin-perfectionist
 * @descCN 关于 eslint-plugin-perfectionist 的共享常量
 */
export const PERFECTIONIST = Object.freeze({
  partialRuleOptions, // 部分规则选项
  pluginSettings, // 插件设置
  sortClassesGroups, // 类排序分组
  sortExportsGroups, // 导出排序分组
  sortImportsTypes, // 导入排序类型
  sortInterfacesOrObjectTypesGroups, // 接口或对象类型排序分组
  sortIntersectionTypesOrUnionTypesGroups, // 交叉类型或联合类型排序分组
  sortNamedExportsGroups, // 命名导出排序分组
  sortNamedImportsGroups, // 命名导入排序分组
  sortObjectsGroups, // 对象排序分组
});
