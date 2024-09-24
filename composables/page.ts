import type { HookResult } from '@nuxt/schema'
import { joinURL } from 'ufo'

/**
 * Returns the currently active page, similar to Kirby's `$page` global variable
 */
export function usePage<T extends Record<string, any> = Record<string, any>>() {
  return useState<T>('app.page', () => ({}) as T)
}

/**
 * Sets the currently active page and updates the document head
 */
export function setPage<T extends Record<string, any>>(page: T) {
  usePage().value = page

  // Build the page meta tags
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

  useServerHead({
    link: [{ rel: 'canonical', href: url }],
  })

  useSeoMeta({
    title,
  })

  useServerSeoMeta({
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogType: 'website',
    twitterTitle: title,
    twitterDescription: description,
  })

  // Resolve components that depend on the full page data
  const nuxtApp = useNuxtApp()
  nuxtApp._nuxtPageDependenciesRendered = true
  return nuxtApp.callHook('nuxt-page-dependencies:rendered')
}

/**
 * Returns a promise that resolves when the page setup is complete
 */
export async function hasPage() {
  if (import.meta.server) {
    const nuxtApp = useNuxtApp()
    const error = useError()

    // Defer rendering the component until the page component has rendered
    return new Promise<void>((resolve) => {
      const resolver = () => {
        resolve()
      }

      // If Nuxt has an error, immediately render the component
      if (error.value) {
        return resolver()
      }

      if (nuxtApp._nuxtPageDependenciesRendered) {
        return resolver()
      }

      // Called manually by using the `setPage` composable
      nuxtApp.hooks.hookOnce('nuxt-page-dependencies:rendered', resolver)

      // When any error happens, resolve
      nuxtApp.hooks.hookOnce('app:error', resolver)
      nuxtApp.hooks.hookOnce('vue:error', resolver)
    })
  }

  return Promise.resolve()
}

declare module '#app' {
  interface RuntimeNuxtHooks {
    'nuxt-page-dependencies:rendered': () => HookResult
  }
}
