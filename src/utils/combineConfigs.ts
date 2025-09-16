import type { Awaitable, TypedConfigItem } from '../types';

export async function combineConfigs(
  ...configs: Awaitable<TypedConfigItem | TypedConfigItem[]>[]
): Promise<TypedConfigItem[]> {
  const promises = configs.map(async (config) => config);
  const resolved = await Promise.all(promises);
  return resolved.flat();
}
