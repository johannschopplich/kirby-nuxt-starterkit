import { unref } from 'vue'
import type { Ref } from 'vue'

/**
 * Access the current page context
 */
export function usePage() {
  return useState<Record<string, any>>('kql.page', () => ({}))
}

/**
 * Set the current page context
 */
export function setPage<T extends Record<string, any>>(data?: T | Ref<T>) {
  if (data) {
    const page = usePage()
    page.value = unref(data)
  }

  return computed(() => unref(data))
}
