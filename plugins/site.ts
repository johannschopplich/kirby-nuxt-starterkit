import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async () => {
  const site = useSite()

  try {
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
    console.error('Error loading site data:', e.message)
  }
})
