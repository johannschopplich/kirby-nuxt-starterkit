/**
 * Resolves a UUID to an entity in a collection, i.e. Kirby files or pages
 */
export function resolveUuid<T extends Record<string, any>>(
  collection: T[],
  uuid: string
) {
  return collection.find((i) => i.uuid === uuid)
}

/**
 * Returns a function that resolves a UUID to an entity in a collection
 */
export function createUuidResolver<T extends Record<string, any>>(
  collection: T[]
) {
  return (uuid: string) => resolveUuid(collection, uuid)
}
