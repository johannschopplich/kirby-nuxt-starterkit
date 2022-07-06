import { unref } from 'vue'
import type { Ref } from 'vue'

export function usePage<T extends Record<string, any>>(data?: T | Ref<T>) {
  const page = useState<T>('kql.page', () => ({} as T))

  if (data) {
    page.value = unref(data)
  }

  return page
}
