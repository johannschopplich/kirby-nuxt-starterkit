<script setup lang="ts">
import type { KirbyQueryResponse } from '#nuxt-kql'

const route = useRoute()

const { data: defaultData } = await useKql({
  query: `kirby.page("${route.path}")`,
  select: {
    id: true,
    title: true,
    // description: true,
    text: 'page.text.kirbytext',
  },
})

let data = ref<KirbyQueryResponse>(defaultData.value)

// Fall back to error page if no page data is found
if (!data.value?.result) {
  const { data: errorData } = await useKql({
    query: 'kirby.page("error")',
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
const page = setCurrentPage(() => data.value.result)
</script>

<template>
  <article>
    <h1 class="h1">{{ page?.title }}</h1>
    <div v-internal-links class="text" v-html="page?.text" />
  </article>
</template>
