import type { KirbySiteData } from '#shared/queries'

/**
 * Returns the global site context, similar to Kirby's `$site` global variable.
 */
export function useSite() {
  return useState<Partial<KirbySiteData>>('app.site', () => ({}))
}
