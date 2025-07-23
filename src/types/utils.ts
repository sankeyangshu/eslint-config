/**
 * A type that can be awaited
 */
export type Awaitable<T> = Promise<T> | T;

/**
 * Make types human readable
 */
export type InteropModuleDefault<T> = T extends { default: infer U } ? U : T;

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;
