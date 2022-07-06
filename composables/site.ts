import type { KirbySite } from '~/types'

export function useSite() {
  return useState<Partial<KirbySite>>('kql.site', () => ({}))
}
