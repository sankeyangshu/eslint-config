import type { Awaitable, InteropModuleDefault } from '../types';

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
export async function interopDefault<T>(mod: Awaitable<T>): Promise<InteropModuleDefault<T>> {
  const resolved = await mod;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (resolved as { default?: any }).default || resolved;
}
