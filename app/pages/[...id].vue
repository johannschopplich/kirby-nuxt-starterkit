<script setup lang="ts">
import type { KirbyPageData } from '~/queries'
import { getPageQuery } from '~/queries'

const { data: pageData } = await useKqlPage<KirbyPageData>(
  getPageQuery(useRoute().path),
)

let data = pageData.value

if (!data?.result) {
  const { data: errorPageData } = await useKqlPage<KirbyPageData>(
    getPageQuery('error'),
    { key: 'page:error' },
  )
  data = errorPageData.value
  const event = useRequestEvent()
  if (event) setResponseStatus(event, 404)
}

const page = data?.result

if (!page) {
  throw createError({
    status: 500,
    statusText: 'Failed to load the page',
  })
}

setPage(page)
</script>

<template>
  <article>
    <h1 class="h1">{{ page.title }}</h1>
    <div class="text" v-html="page.text" />
  </article>
</template>
