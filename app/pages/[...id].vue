<script setup lang="ts">
import type { KirbyPageData } from '~/queries'
import { getPageQuery } from '~/queries'

const { data, error } = await useKqlPage<KirbyPageData>(
  getPageQuery(useRoute().path),
)

if (error.value) {
  throw createError({
    status: 500,
    statusText: 'Failed to load the page',
    fatal: true,
  })
}

const page = data.value?.result
if (!page) {
  throw createError({ status: 404, statusText: 'Page Not Found', fatal: true })
}

setPage(page)
</script>

<template>
  <article>
    <h1 class="h1">{{ page.title }}</h1>
    <div class="text" v-html="page.text" />
  </article>
</template>
