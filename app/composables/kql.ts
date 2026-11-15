import type { KirbyQueryResponse, KirbyQuerySchema } from 'kirby-types'
import type { MaybeRefOrGetter } from 'vue'
import type { KirbySiteData } from '~/queries'
import { siteQuery } from '~/queries'

export interface UseKqlPageOptions {
  /**
   * Payload key, stable across server and client for the same page.
   * @default `page:${route.path}`
   */
  key?: MaybeRefOrGetter<string>
}

/**
 * Fetches a page query and, while the site state is still empty, the site
 * data along with it in the same request.
 *
 * @remarks
 * The explicit key lets the client reuse the server payload, even though it
 * would build the request body without the site.
 */
export function useKqlPage<T>(
  query: MaybeRefOrGetter<KirbyQuerySchema>,
  options: UseKqlPageOptions = {},
) {
  const route = useRoute()
  const site = useSite()
  // Decided once, so filling the site state doesn't change the body and refetch.
  const isSiteBundled = Object.keys(site.value).length === 0

  return useKql<KirbyQueryResponse<T>>(
    () =>
      isSiteBundled
        ? {
            query: siteQuery.query,
            select: { ...siteQuery.select, page: toValue(query) },
          }
        : toValue(query),
    {
      key: options.key ?? (() => `page:${route.path}`),
      transform: (response) => {
        if (!isSiteBundled) return response

        const { page, ...siteData } =
          response.result as unknown as KirbySiteData & {
            page: T | null
          }
        site.value = siteData
        return {
          ...response,
          result: page ?? undefined,
        } as KirbyQueryResponse<T>
      },
    },
  )
}
