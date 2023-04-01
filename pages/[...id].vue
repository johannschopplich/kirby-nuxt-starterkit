<script setup lang="ts">
import type { KirbyQueryResponse } from '#nuxt-kql'

const data = ref(await usePageDataById(useRoute().path))

// If page content is empty, load the error page
if (!data.value?.result) {
  data.value = await usePageDataById('error')
}

// Set the current page data for the global page context
const page = data.value?.result
setPage(page)

async function usePageDataById<T = any>(id: string) {
  const { data } = await useKql<KirbyQueryResponse<T>>({
    query: `page("${id}")`,
    select: {
      id: true,
      title: true,
      intendedTemplate: true,
      // description: true,
      text: 'page.text.kirbytext',
    },
  })

  return unref(data)
}
</script>

<template>
  <article>
    <h1 class="h1">{{ page?.title }}</h1>
    <div v-router-links class="text" v-html="page?.text" />
  </article>
</template>
