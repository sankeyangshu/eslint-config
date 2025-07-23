import { GLOB_SRC, GLOB_SRC_EXT, GLOB_TYPES, PERFECTIONIST } from '../constants';
import { pluginPerfectionist } from '../eslint';
import type { OptionsOverrides, TypedConfigItem } from '../types';

/**
 * Option `partitionByComment` type
 *
 * @see {@link https://perfectionist.dev/rules/sort-imports#partitionbycomment}
 */
export type PerfectionistPartitionByComment =
  | boolean
  | string
  | string[]
  | {
      block?: boolean | string | string[];
      line?: boolean | string | string[];
    };

/**
 * Options type of {@link createPerfectionistConfig}
 */
export type ConfigPerfectionistOptions = OptionsOverrides & {
  /**
   * Enable all perfectionist rule
   *
   * Once enabled, all `types`, `enums` and `constants` related options will be ignores
   *
   * @default false
   */
  all?: boolean;

  /**
   * files for `constants`, will overrides default values
   */
  filesConstants?: TypedConfigItem['files'];

  /**
   * files for `enums`, will overrides default values
   */
  filesEnums?: TypedConfigItem['files'];

  /**
   * files for `types`, will overrides default values
   */
  filesTypes?: TypedConfigItem['files'];

  /**
   * Overrides rules for `constants`
   */
  overridesConstantsRules?: TypedConfigItem['rules'];

  /**
   * Overrides rules for `enums`
   */
  overridesEnumsRules?: TypedConfigItem['rules'];

  /**
   * Overrides rules for `types`
   */
  overridesTypesRules?: TypedConfigItem['rules'];

  /**
   * Shared `partitionByComment` option
   *
   * @default ['@pg', '@perfectionist-group']
   */
  partitionByComment?: PerfectionistPartitionByComment;

  /**
   * Enable sort `constants`
   *
   * @default true
   */
  sortConstants?: boolean;

  /**
   * Enable sort `enums`
   *
   * @default true
   */
  sortEnums?: boolean;

  /**
   * Enable sort `types`
   *
   * @default true
   */
  sortTypes?: boolean;
};

/**
 * Config for sorting imports, exports, objects and etc
 *
 * @see {@link https://github.com/azat-io/eslint-plugin-perfectionist}
 *
 * @param options - {@link ConfigPerfectionistOptions}
 * @returns ESLint configs
 */
export function createPerfectionistConfig(options: ConfigPerfectionistOptions = {}): TypedConfigItem[] {
  const {
    filesEnums = [`**/enums/${GLOB_SRC}`, `**/enums.${GLOB_SRC_EXT}`], // 枚举文件默认匹配模式
    filesTypes = [...GLOB_TYPES], // 类型文件默认匹配模式
    partitionByComment = PERFECTIONIST.partialRuleOptions.partitionByComment, // 按注释分组的默认配置
    sortConstants: enableSortConstants = true, // 是否启用常量排序
    sortEnums: enableSortEnums = true, // 是否启用枚举排序
    sortTypes: enableSortTypes = true, // 是否启用类型排序
    filesConstants = [`**/constants/${GLOB_SRC}`, `**/constants.${GLOB_SRC_EXT}`], // 常量文件默认匹配模式
  } = options;

  const sharedOptionsWithNewlinesBetween = {
    newlinesBetween: 'ignore', // 忽略组之间的换行
    partitionByComment, // 按注释分组
  } as const;

  const commonRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-exports': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortExportsGroups, // 导出排序分组
        type: 'line-length', // 按行长度排序
      },
    ],
    'perfectionist/sort-imports': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortImportsTypes, // 导入排序类型
        internalPattern: ['^~/.+', '^@/.+', '^#.+'], // 内部模块匹配模式
      },
    ],
    'perfectionist/sort-named-exports': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortNamedExportsGroups, // 命名导出排序分组
        ignoreAlias: false, // 不忽略别名
      },
    ],
    'perfectionist/sort-named-imports': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortNamedImportsGroups, // 命名导入排序分组
        ignoreAlias: false, // 不忽略别名
      },
    ],
  };
  const sharedRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-enums': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
      },
    ],
  };
  const sortEnumsRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-modules': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
      },
    ],
  };
  const sortTypesRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-heritage-clauses': 'error',
    'perfectionist/sort-interfaces': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortInterfacesOrObjectTypesGroups,
      },
    ],
    'perfectionist/sort-intersection-types': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortIntersectionTypesOrUnionTypesGroups,
      },
    ],
    'perfectionist/sort-object-types': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortInterfacesOrObjectTypesGroups,
      },
    ],
    'perfectionist/sort-union-types': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortIntersectionTypesOrUnionTypesGroups,
      },
    ],
  };
  const sortConstantsRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-maps': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
      },
    ],
    'perfectionist/sort-objects': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortObjectsGroups,
      },
    ],
    'perfectionist/sort-sets': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
      },
    ],
  };
  const extraRules: TypedConfigItem['rules'] = {
    'perfectionist/sort-array-includes': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: ['literal', 'spread'],
      },
    ],
    'perfectionist/sort-classes': [
      'error',
      {
        ...sharedOptionsWithNewlinesBetween,
        groups: PERFECTIONIST.sortClassesGroups,
      },
    ],
    'perfectionist/sort-decorators': [
      'error',
      {
        partitionByComment,
      },
    ],
    'perfectionist/sort-jsx-props': [
      'error',
      {
        groups: ['shorthand', 'multiline', 'unknown'],
      },
    ],
    'perfectionist/sort-switch-case': 'error',
    'perfectionist/sort-variable-declarations': [
      'error',
      {
        partitionByComment,
      },
    ],
  };

  const configs: TypedConfigItem[] = [
    {
      name: options.all ? 'sankeyangshu/perfectionist/all' : 'sankeyangshu/perfectionist/common',
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      settings: {
        perfectionist: PERFECTIONIST.pluginSettings,
      },
      rules: {
        ...commonRules,

        ...(options.all
          ? {
              ...sharedRules,
              ...sortEnumsRules,
              ...sortTypesRules,
              ...sortConstantsRules,
              ...extraRules,
            }
          : {}),

        // Overrides rules
        ...options.overrides,
      },
    },
  ];

  // return in advanced, ignore other options
  if (options.all) {
    return configs;
  }

  if (enableSortEnums) {
    configs.push({
      name: 'sankeyangshu/perfectionist/enums',
      files: filesEnums,
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      settings: {
        perfectionist: PERFECTIONIST.pluginSettings,
      },
      rules: {
        ...sharedRules,

        ...sortEnumsRules,

        // Overrides rules
        ...options.overridesEnumsRules,
      },
    });
  }

  if (enableSortTypes) {
    configs.push({
      name: 'sankeyangshu/perfectionist/types',
      files: filesTypes,
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      settings: {
        perfectionist: PERFECTIONIST.pluginSettings,
      },
      rules: {
        ...sharedRules,

        ...sortTypesRules,

        // Overrides rules
        ...options.overridesTypesRules,
      },
    });
  }

  if (enableSortConstants) {
    configs.push({
      name: 'sankeyangshu/perfectionist/constants',
      files: filesConstants,
      plugins: {
        perfectionist: pluginPerfectionist,
      },
      settings: {
        perfectionist: PERFECTIONIST.pluginSettings,
      },
      rules: {
        ...sharedRules,

        ...sortConstantsRules,

        // Overrides rules
        ...options.overridesConstantsRules,
      },
    });
  }

  return configs;
}
