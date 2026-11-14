import { joinURL } from 'ufo'

/**
 * Returns the currently active page, similar to Kirby's `$page` global variable.
 */
export function usePage<T extends Record<string, any> = Record<string, any>>() {
  return useState<T>('app.page', () => ({}) as T)
}

/**
 * Sets the currently active page and updates the document head.
 */
export function setPage<T extends Record<string, any>>(page: T) {
  usePage().value = page

  // Build the page meta tags.
  const { siteUrl } = useRuntimeConfig().public
  const site = useSite()
  const title = page.title
    ? `${page.title} – ${site.value.title}`
    : site.value.title
  const description = page.description || site.value.description
  const url = joinURL(siteUrl, useRoute().path)

  useHead({
    bodyAttrs: {
      'data-template': page.intendedTemplate || 'default',
    },
  })

  useSeoMeta({
    title,
  })

  if (import.meta.server) {
    useHead({
      link: [{ rel: 'canonical', href: url }],
    })

    useSeoMeta({
      description,
      ogTitle: title,
      ogDescription: description,
      ogUrl: url,
      ogType: 'website',
      twitterTitle: title,
      twitterDescription: description,
    })
  }
}
