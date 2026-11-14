import type { KirbySiteData } from '#shared/queries'

/**
 * Access the global site context, similar to Kirby's `$site` global variable
 */
export function useSite() {
  return useState<Partial<KirbySiteData>>('app.site', () => ({}))
}
