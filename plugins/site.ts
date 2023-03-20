import { siteQuery } from '~/queries'
import type { FetchError } from 'ofetch'

export default defineNuxtPlugin(async () => {
  const site = useSite()

  try {
    // Response will be cached in payload by default, thus no need to
    // handle server/client side differently
    const data = await $kql(siteQuery)

    site.value = data?.result || {}
  } catch (e) {
    console.error('Error loading site data:', (e as FetchError).message)
  }
})
