<script setup lang="ts">
import { getPageQuery } from '#shared/queries'

const kirbyPath = useRoute().path
const { data: pageData } = await useKql(getPageQuery(kirbyPath))

let data = pageData.value

// If page content is empty, load the error page
if (!data?.result) {
  const { data: pageData } = await useKql(getPageQuery('error'))
  data = pageData.value
  const event = useRequestEvent()
  if (event) setResponseStatus(event, 404)
}

// Set the current page data for the global page context
const page = data?.result
setPage(page)

const content = ref<HTMLElement | undefined>()
useInternalLinks(content)
</script>

<template>
  <article>
    <h1 class="h1">{{ page?.title }}</h1>
    <div ref="content" class="text" v-html="page?.text" />
  </article>
</template>
