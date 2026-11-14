<script setup lang="ts">
import type { KirbyPageResponse } from '~/queries'
import { getPageQuery } from '~/queries'

const kirbyPath = useRoute().path
const { data: pageData } = await useKql<KirbyPageResponse>(
  getPageQuery(kirbyPath),
)

let data = pageData.value

if (!data?.result) {
  const { data: errorPageData } = await useKql<KirbyPageResponse>(
    getPageQuery('error'),
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

const content = useTemplateRef('content')
useInternalLinks(content)
</script>

<template>
  <article>
    <h1 class="h1">{{ page.title }}</h1>
    <div ref="content" class="text" v-html="page.text" />
  </article>
</template>
