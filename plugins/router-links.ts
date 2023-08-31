export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp

  /**
   * Directive to let the Vue Router handle internal links,
   * instead of a hard refresh
   */
  vueApp.directive('router-links', {
    mounted(el) {
      el.addEventListener('click', handleAnchors)
      // window.addEventListener('hashchange', navigate)
    },

    beforeUnmount(el) {
      el.removeEventListener('click', handleAnchors)
      // window.removeEventListener('hashchange', navigate)
    },
  })

  function navigate() {
    if (window.location.hash) {
      document
        .querySelector(window.location.hash)
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function handleAnchors(
    event: MouseEvent & {
      target: HTMLElement
    },
  ) {
    const link = event.target.closest('a')

    if (
      !event.defaultPrevented &&
      link &&
      event.button === 0 &&
      link.target !== '_blank' &&
      link.rel !== 'external' &&
      !link.download &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      const url = new URL(link.href)
      const { origin, pathname: path, hash } = url

      if (origin !== window.location.origin) return
      event.preventDefault()

      if (hash && (!path || path === useRoute().path)) {
        window.history.replaceState({}, '', link.href)
        navigate()
      } else {
        useRouter().push({ path, hash })
      }
    }
  }
})
