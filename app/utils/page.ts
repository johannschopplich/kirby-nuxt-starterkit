import type { KirbyQueryResponse } from 'kirby-types'
import type { Ref } from 'vue'

export function getPageOrThrow<T>(
  {
    data,
    error,
  }: { data: Ref<KirbyQueryResponse<T> | undefined>; error: Ref<unknown> },
  isNotFound?: (page: T) => boolean,
): T {
  if (error.value) {
    throw createError({
      status: 500,
      statusText: 'Failed to Load the Page',
      fatal: true,
    })
  }

  const page = data.value?.result
  if (!page || isNotFound?.(page)) {
    throw createError({
      status: 404,
      statusText: 'Page Not Found',
      fatal: true,
    })
  }

  return page
}
