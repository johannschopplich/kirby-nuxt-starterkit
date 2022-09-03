import { resolveURL, withHttps } from 'ufo'
import type { MaybeComputedRef } from '@vueuse/core'

export function useCurrentPage<
  T extends Record<string, any> = Record<string, any>
>() {
  return useState<T>('kql.page', () => ({} as T))
}

export function setCurrentPage<
  T extends Record<string, any> = Record<string, any>
>(data: MaybeComputedRef<T>) {
  const _data = computed(() => resolveUnref(data))

  const page = useCurrentPage()
  page.value = _data.value

  // Generate meta tags for the current page
  usePageMeta(_data.value)

  return _data
}

function usePageMeta(page: Record<string, any>) {
  const site = useSite()
  const route = useRoute()
  const { deployUrl } = useRuntimeConfig().public
  const origin =
    deployUrl ||
    (process.server
      ? withHttps(useRequestHeaders().host || '/')
      : window.location.origin)

  const title = computed(() =>
    page.value?.title
      ? `${page.value?.title} – ${site.value.title}`
      : site.value.title
  )
  const description = computed(
    () => page.value?.description || site.value.description
  )
  const url = computed(() => resolveURL(origin, route.path))

  useHead({
    title: title.value,
    meta: [
      { name: 'description', content: description.value },
      { property: 'og:title', content: title.value },
      { property: 'og:description', content: description.value },
      { property: 'og:url', content: url.value },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:title', content: title.value },
      { name: 'twitter:description', content: description.value },
      { name: 'twitter:url', content: url.value },
      { name: 'twitter:card', content: 'summary' },
    ],
  })
}
