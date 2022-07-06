import type { KirbySite } from '~/types'

/**
 * Access the global site context
 */
export function useSite() {
  return useState<Partial<KirbySite>>('kql.site', () => ({}))
}
