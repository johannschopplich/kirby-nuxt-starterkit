import zoom from 'medium-zoom'

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp

  vueApp.directive('zoom', {
    mounted(el) {
      zoom().attach(el)
    },

    beforeUnmount(el) {
      zoom().detach(el)
    },
  })
})
