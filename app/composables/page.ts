import type { HookResult } from '@nuxt/schema'
import type { KirbySharedPageData } from '~/queries'
import { joinURL } from 'ufo'

/**
 * Returns the currently active page, similar to Kirby's `$page` global variable.
 */
export function usePage<T extends Record<string, any> = Record<string, any>>() {
  return useState<T>('app.page', () => ({}) as T)
}

export function setPage<T extends KirbySharedPageData & Record<string, any>>(
  page: T,
  options: {
    /** Path for the canonical URL, if the route's query matters for it. */
    path?: string
  } = {},
) {
  usePage().value = page

  const { siteUrl } = useRuntimeConfig().public
  const site = useSite()
  const title = page.title
    ? `${page.title} – ${site.value.title}`
    : site.value.title
  const description = page.description || site.value.description
  const url = joinURL(siteUrl, options.path ?? useRoute().path)
  const image = page.cover?.url

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
      ...(image && { ogImage: image }),
      twitterTitle: title,
      twitterDescription: description,
      twitterCard: image ? 'summary_large_image' : 'summary',
      ...(image && { twitterImage: image }),
    })
  }

  // Resolve components that depend on the full page data.
  const nuxtApp = useNuxtApp()
  nuxtApp._pageDependenciesRendered = true
  return nuxtApp.callHook('page-dependencies:rendered')
}

export async function waitForPage() {
  if (import.meta.client) return

  const nuxtApp = useNuxtApp()
  const error = useError()

  return new Promise<void>((resolve) => {
    if (error.value || nuxtApp._pageDependenciesRendered) return resolve()

    nuxtApp.hooks.hookOnce('page-dependencies:rendered', () => resolve())
    nuxtApp.hooks.hookOnce('app:error', () => resolve())
    nuxtApp.hooks.hookOnce('vue:error', () => resolve())
  })
}

declare module '#app' {
  interface RuntimeNuxtHooks {
    'page-dependencies:rendered': () => HookResult
  }
}
