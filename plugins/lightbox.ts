import { defineNuxtPlugin } from '#app'
import basiclightbox from 'basiclightbox'

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp

  vueApp.directive('lightbox', {
    mounted(el) {
      el.addEventListener('click', openLightbox)
    },

    beforeUnmount(el) {
      el.removeEventListener('click', openLightbox)
    },
  })

  function openLightbox(
    event: MouseEvent & {
      target: HTMLElement
    }
  ) {
    const link = event.target.closest('a')
    if (!link) return

    event.preventDefault()
    basiclightbox.create(`<img src="${link.href}">`).show()
  }
})
