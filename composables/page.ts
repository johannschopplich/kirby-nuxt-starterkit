import { resolveURL, withHttps } from 'ufo'
import type { MaybeComputedRef } from '@vueuse/core'

/**
 * Returns the currently active page
 */
export function usePageData<
  T extends Record<string, any> = Record<string, any>
>() {
  return useState<T>('kql.page', () => ({} as T))
}

/**
 * Sets the currently active page
 */
export function storePageData<
  T extends Record<string, any> = Record<string, any>
>(data: MaybeComputedRef<T>) {
  const _data = computed(() => resolveUnref(data))
  const site = useSite()
  const page = usePageData<T>()

  const { siteUrl } = useRuntimeConfig().public
  const route = useRoute()
  const origin =
    siteUrl ||
    (process.server
      ? withHttps(useRequestHeaders().host!)
      : window.location.origin)

  watch(
    _data,
    (value) => {
      if (!value) return

      const title = value?.title
        ? `${value?.title} – ${site.value.title}`
        : site.value.title
      const description = value?.description || site.value.description
      const url = resolveURL(origin, route.path)

      // Store page data
      page.value = value

      // Update meta tags
      useHead({
        title,
        meta: [
          { name: 'description', content: description },
          { property: 'og:title', content: title },
          { property: 'og:description', content: description },
          { property: 'og:url', content: url },
          { property: 'og:type', content: 'website' },
          { name: 'twitter:title', content: title },
          { name: 'twitter:description', content: description },
          { name: 'twitter:url', content: url },
          { name: 'twitter:card', content: 'summary' },
        ],
        link: [{ rel: 'canonical', href: url }],
      })
    },
    { immediate: true }
  )

  return _data
}
