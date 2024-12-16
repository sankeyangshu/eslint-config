import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { isPackageExists } from 'local-pkg';
import type { Awaitable, PartialPrettierExtendedOptionsType } from '../types';

/**
 * Loads a module and returns the default export if it exists, otherwise returns the module itself.
 * Useful for loading both CommonJS and ESM modules.
 *
 * @example
 *   const express = await interopDefault(import('express'));
 *   const app = express();
 *
 * @example
 *   const express = await interopDefault(import('express'));
 *   const { default: app } = express;
 */
export async function interopDefault<T>(
  m: Awaitable<T>
): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m;
  return (resolved as any).default || resolved;
}

/**
 * Prompts user to install required packages if they are not installed.
 *
 * @example
 *   ensurePackages(['eslint', 'prettier']);
 *
 * @param packages List of package names to check.
 */
export async function ensurePackages(packages: string[]) {
  if (process.env.CI || process.stdout.isTTY === false) return;

  const nonExistingPackages = packages.filter((i) => !isPackageExists(i));
  if (nonExistingPackages.length === 0) return;

  const { default: prompts } = await import('prompts');

  const message = `${
    nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'
  } required for this config: ${nonExistingPackages.join(', ')}. Do you want to install them?`;

  const { result } = await prompts([
    {
      message,
      name: 'result',
      type: 'confirm',
    },
  ]);

  if (result) {
    const { installPackage } = await import('@antfu/install-pkg');
    await installPackage(nonExistingPackages, { dev: true });
  }
}

/**
 * Load prettier config from .prettierrc file.(加载 .prettierrc 文件中的 prettier 配置)
 *
 * @param cwd Current working directory.
 * @returns The loaded prettier config.
 */
export async function loadPrettierConfig(cwd: string) {
  let prettierConfig: PartialPrettierExtendedOptionsType = {};

  try {
    const prettierrc = await readFile(path.join(cwd, '.prettierrc'), 'utf-8');

    prettierConfig = JSON.parse(prettierrc);
  } catch {}

  return prettierConfig;
}

/** Override rules key (所有使用的规则插件包名) */
type OverrideRuleKey =
  | 'ts'
  | 'import'
  | 'perfectionist'
  | 'jsdoc'
  | 'jsonc'
  | 'n'
  | 'unicorn'
  | 'vue'
  | 'react'
  | 'react-native'
  | 'astro'
  | 'svelte'
  | 'solid'
  | 'unocss';

/**
 * Get Override rules (获取所有需要覆盖的规则)
 *
 * @param overrides The overrides rules.
 * @returns The override record object.
 */
export function getOverridesRules(overrides: Record<string, string> = {}) {
  const overrideRecord = {
    js: {},
  } as Record<OverrideRuleKey | 'js', Record<string, string>>;

  const rulePrefixes: Record<OverrideRuleKey, string> = {
    ts: '@typescript-eslint/',
    import: 'import/',
    perfectionist: 'perfectionist/',
    jsdoc: 'jsdoc/',
    jsonc: 'jsonc/',
    n: 'n/',
    unicorn: 'unicorn/',
    vue: 'vue/',
    'react-native': 'react-native/',
    react: 'react/',
    astro: 'astro/',
    svelte: 'svelte/',
    solid: 'solid/',
    unocss: 'unocss/',
  };

  const overrideRuleKeys = Object.keys(rulePrefixes) as OverrideRuleKey[];

  overrideRuleKeys.forEach((key) => {
    overrideRecord[key] = {};
  });

  const ruleKeys = Object.keys(overrides);

  ruleKeys.forEach((key) => {
    const hasMatch = overrideRuleKeys.some((overrideKey) => {
      const prefix = rulePrefixes[overrideKey];

      const matched = key.startsWith(prefix);

      if (matched) {
        overrideRecord[overrideKey][key] = overrides[key];
      }

      return matched;
    });

    if (!hasMatch) {
      overrideRecord.js[key] = overrides[key];
    }
  });

  return overrideRecord;
}
