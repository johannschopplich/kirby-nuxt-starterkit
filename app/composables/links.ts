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

    const handleAnchorClicks = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest('a')

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
        const { origin, pathname: path, search, hash } = new URL(link.href)
        if (origin !== window.location.origin) return

        event.preventDefault()

        if (hash && path === route.path && search === window.location.search) {
          window.history.replaceState({}, '', link.href)
          scrollToHash()
        } else {
          navigateTo(path + search + hash)
        }
      }
    }

    onMounted(() => {
      window.addEventListener('hashchange', scrollToHash)
      toValue(element)?.addEventListener('click', handleAnchorClicks)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('hashchange', scrollToHash)
      toValue(element)?.removeEventListener('click', handleAnchorClicks)
    })
  }
}
