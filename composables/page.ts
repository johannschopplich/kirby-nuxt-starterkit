import type { MaybeComputedRef } from '@vueuse/core'

export function useCurrentPage() {
  return useState<Record<string, any>>('kql.page', () => ({}))
}

export function setCurrentPage<T extends Record<string, any>>(
  data: MaybeComputedRef<T>
) {
  const page = useCurrentPage()
  page.value = resolveUnref(data)

  return computed(() => resolveUnref(data))
}
