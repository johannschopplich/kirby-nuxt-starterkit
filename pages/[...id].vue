<script setup lang="ts">
import type { KirbyQueryResponse } from '#nuxt-kql'

const { data: defaultData } = await useKql({
  query: `page("${useRoute().path}")`,
  select: {
    id: true,
    title: true,
    // description: true,
    text: 'page.text.kirbytext',
  },
})

const data = ref<KirbyQueryResponse | null>(defaultData.value)

// Fall back to error page if no page data is found
if (!data.value?.result) {
  const { data: errorData } = await useKql({
    query: 'page("error")',
    select: {
      id: true,
      title: true,
      // description: true,
      text: 'page.text.kirbytext',
    },
  })

  data.value = errorData.value
}

// Set the current page data for the global page context
const page = setPage(() => data.value?.result)
</script>

<template>
  <article>
    <h1 class="h1">{{ page?.title }}</h1>
    <div v-router-links class="text" v-html="page?.text" />
  </article>
</template>
