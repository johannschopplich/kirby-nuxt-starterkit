<script setup lang="ts">
import type { KirbyPageData } from '~/queries'
import { getPageQuery } from '~/queries'

const page = getPageOrThrow(
  await useKqlPage<KirbyPageData>(getPageQuery(useRoute().path)),
)
setPage(page)
</script>

<template>
  <article>
    <h1 class="h1">{{ page.title }}</h1>
    <div class="text" v-html="page.text" />
  </article>
</template>
