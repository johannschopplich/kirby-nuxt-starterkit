import type { FetchError } from 'ofetch'
import type { KirbySiteResponse } from '#shared/queries'
import { siteQuery } from '#shared/queries'

export default defineNuxtPlugin(async () => {
  const site = useSite()

  try {
    const data = await $kql<KirbySiteResponse>(siteQuery)
    site.value = data?.result || {}
  } catch (e) {
    console.error('Failed to load site data:', (e as FetchError).message)
  }
})
