import fs from 'node:fs/promises';
import { green } from 'ansis';
import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import {
  createAstroConfig,
  createCommandConfig,
  createCommentsConfig,
  createDisablesConfig,
  createGitIgnoresConfig,
  createIgnoresConfig,
  createImportsConfig,
  createJavaScriptConfig,
  createJsdocConfig,
  createJsoncConfig,
  createJSXConfig,
  createMarkdownConfig,
  createNodeConfig,
  createPerfectionistConfig,
  createPnpmConfig,
  createPrettierConfig,
  createReactConfig,
  createRegexpConfig,
  createSolidConfig,
  createSortConfig,
  createSvelteConfig,
  createTestConfig,
  createTomlConfig,
  createTypeScriptConfig,
  createUnicornConfig,
  createUnoCssConfig,
  createVueConfig,
  createYamlConfig,
} from '../src/configs';
import { combineConfigs } from '../src/utils';

/**
 * Sorted alphabetically
 */
const configs = await combineConfigs(
  {
    plugins: {
      '': {
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  createAstroConfig(),
  createCommandConfig(),
  createCommentsConfig(),
  createDisablesConfig(),
  createGitIgnoresConfig(),
  createIgnoresConfig(),
  createImportsConfig(),
  createJavaScriptConfig(),
  createJsdocConfig(),
  createJsoncConfig(),
  createJSXConfig(),
  createMarkdownConfig(),
  createNodeConfig(),
  createPerfectionistConfig(),
  createPnpmConfig(),
  createPrettierConfig(),
  createReactConfig(),
  createRegexpConfig(),
  createSolidConfig(),
  createSortConfig(),
  createSvelteConfig(),
  createTestConfig(),
  createTomlConfig(),
  createTypeScriptConfig(),
  createUnicornConfig(),
  createUnoCssConfig(),
  createVueConfig(),
  createYamlConfig()
);

const configNames = configs.map((i) => i.name).filter(Boolean) as string[];

const dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
});

export async function generateTypes() {
  await fs.writeFile(
    'src/types/typegen.d.ts',
    [
      dts,
      `// Names of all the configs
export type ConfigNames = ${configNames.map((i) => `'${i}'`).join(' | ')}
`,
    ].join('\n')
  );
}

try {
  console.info(`${green('TYPES')} start generating types...`);
  await generateTypes();
  console.info(`${green('TYPES')} generated success.`);
} catch (err) {
  console.error(err);
}
