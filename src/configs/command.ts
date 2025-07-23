import { builtinCommands } from 'eslint-plugin-command/commands';
import createCommand from 'eslint-plugin-command/config';
import type { ESLintPluginCommandOptions } from 'eslint-plugin-command/types';
import type { TypedConfigItem } from '../types';

/**
 * Options type of {@link configCommand}
 */
export type ConfigCommandOptions = ESLintPluginCommandOptions;

/**
 * Config for useing comments as codemod
 *
 * @see {@link https://github.com/antfu/eslint-plugin-command}
 *
 * @param options - {@link ConfigCommandOptions}
 * @returns ESLint configs
 */
export function createCommandConfig(options: ConfigCommandOptions = {}): TypedConfigItem[] {
  return [
    {
      ...createCommand({
        ...options,
        commands: [
          // built-in commands
          ...builtinCommands,

          // user custom commands
          ...(options.commands || []),
        ],
      }),
      name: 'sankeyangshu/command',
    },
  ];
}
