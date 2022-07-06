import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()

    return new Promise((resolve) => {
      // On Suspense resolved event
      nuxtApp.hook('page:finish', () => {
        if (to.hash) {
          resolve({
            el: to.hash,
            behavior: 'smooth',
          })
        } else {
          resolve(savedPosition ?? { top: 0 })
        }
      })
    })
  },
}
