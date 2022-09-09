// Instead of `Record<string, any>` you can use a more specific type
export interface KirbySite {
  title: string
  description: string
  children: {
    id: string
    title: string
    isListed: boolean
  }[]
}

/**
 * Access the global site context
 */
export function useSite() {
  return useState<Record<string, any>>('kql.site', () => ({}))
}
