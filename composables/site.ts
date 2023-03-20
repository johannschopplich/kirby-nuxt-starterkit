import type { KirbySite } from '#build/kql'

/**
 * Access the global site context
 */
export function useSite() {
  return useState<Partial<KirbySite>>('kql.site', () => ({}))
}
