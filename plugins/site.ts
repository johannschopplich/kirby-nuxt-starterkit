import type { FetchError } from 'ofetch'

export default defineNuxtPlugin(async () => {
  const site = useSite()

  try {
    // Response will be cached in payload by default, thus no need to
    // handle server/client side differently
    const data = await $kql({
      query: 'site',
      select: {
        title: true,
        // description: true,
        children: {
          query: 'site.children',
          select: ['id', 'title', 'isListed'],
        },
      },
    })

    site.value = data?.result || {}
  } catch (e) {
    console.error('Error loading site data:', (e as FetchError).message)
  }
})
