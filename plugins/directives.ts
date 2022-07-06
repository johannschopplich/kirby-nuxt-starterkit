import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp

  /**
   * Directive to replace the current element with its raw HTML content
   * Especially useful with `<div v-hoist v-html="html" />` to replace the
   * wrapping `<div>` element with its raw inner HTML
   */
  vueApp.directive('hoist', (el) => {
    // Return if no child elements of type element nodes are found
    if (![...el.childNodes].some((i) => i.nodeType === 1)) return

    if (el.tagName === 'TEMPLATE') {
      el.replaceWith(el.content)
    } else {
      el.replaceWith(...el.children)
    }
  })

  /**
   * Directive to let the Vue Router handle internal links,
   * instead of a hard refresh
   */
  vueApp.directive('internal-links', {
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
    }
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

      const route = useRoute()

      if (hash && (!path || path === route.path)) {
        window.history.replaceState({}, '', link.href)
        navigate()
      } else {
        useRouter().push({ path, hash })
      }
    }
  }
})
