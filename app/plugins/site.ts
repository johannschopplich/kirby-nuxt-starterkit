import type { FetchError } from 'ofetch'
import { siteQuery } from '#shared/queries'

export default defineNuxtPlugin(async () => {
  const site = useSite()

  try {
    // Response is cached server-side and passed to the client in the Nuxt payload
    const data = await $kql(siteQuery)
    site.value = data?.result || {}
  } catch (e) {
    console.error('Failed to load site data:', (e as FetchError).message)
  }
})
