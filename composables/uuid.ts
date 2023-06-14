/**
 * Resolves a UUID to an entity in a collection, i.e. Kirby files or pages
 */
export function resolveUuid<T extends Record<string, any>>(
  collection: T[],
  uuid: string
) {
  return collection.find((i) => i.uuid === uuid)
}
