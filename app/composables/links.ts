import type { MaybeRefOrGetter } from 'vue'

export function useInternalLinks(
  element: MaybeRefOrGetter<HTMLElement | undefined | null>,
) {
  if (import.meta.client) {
    const route = useRoute()

    const scrollToHash = () => {
      if (window.location.hash) {
        document
          .querySelector(window.location.hash)
          ?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    const handleAnchorClicks = (
      event: MouseEvent & {
        target: HTMLElement
      },
    ) => {
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

        if (hash && (!path || path === route.path)) {
          window.history.replaceState({}, '', link.href)
          scrollToHash()
        } else {
          navigateTo({ path, hash })
        }
      }
    }

    useEventListener(window, 'hashchange', scrollToHash)
    useEventListener(element, 'click', handleAnchorClicks)
  }
}
