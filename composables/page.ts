import { joinURL } from 'ufo'

/**
 * Returns the currently active page, similar to Kirby's `$page` global variable
 */
export function usePage<T extends Record<string, any> = Record<string, any>>() {
  return useState<T>('app.page', () => ({} as T))
}

/**
 * Sets the currently active page and updates the document head
 */
export function setPage<T extends Record<string, any>>(page?: T) {
  const pageState = usePageState()

  if (!page) {
    pageState.value = 'rejected'
    return
  }

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
    link: [{ rel: 'canonical', href: url }],
  })

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogType: 'website',
    twitterTitle: title,
    twitterDescription: description,
    twitterCard: 'summary',
  })

  pageState.value = 'resolved'
}

/**
 * Returns a promise that resolves when the page data has been loaded or rejected
 */
export async function hasPage() {
  const state = usePageState()

  await until(state).not.toBe('pending')
  await nextTick()

  return state.value === 'resolved'
}

function usePageState() {
  return useState<'pending' | 'resolved' | 'rejected'>(
    'app.state.page',
    () => 'pending'
  )
}
