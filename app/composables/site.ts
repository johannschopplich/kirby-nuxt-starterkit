import type { KirbySite } from 'kirby-types'

/**
 * Access the global site context, similar to Kirby's `$site` global variable
 */
export function useSite() {
  return useState<Partial<KirbySite>>('app.site', () => ({}))
}
