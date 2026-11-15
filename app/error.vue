<script setup lang="ts">
import type { KirbyQueryResponse } from 'kirby-types'
import type { NuxtError } from '#app'
import type { KirbyPageData, KirbySiteData } from '~/queries'
import { getPageQuery, siteQuery } from '~/queries'

const props = defineProps<{
  error: NuxtError
}>()

const site = useSite()

// Kirby renders its `error` page for a missing page too.
const page =
  props.error.status === 404
    ? (
        await useKqlPage<KirbyPageData>(getPageQuery('error'), {
          key: 'page:error',
        })
      ).data.value?.result
    : undefined

if (page) {
  setPage(page)
} else if (Object.keys(site.value).length === 0) {
  const { data } = await useKql<KirbyQueryResponse<KirbySiteData>>(siteQuery)
  site.value = data.value?.result ?? {}
}
</script>

<template>
  <NuxtLayout>
    <article v-if="page">
      <h1 class="h1">{{ page.title }}</h1>
      <div class="text" v-html="page.text" />
    </article>
    <article v-else>
      <h1 class="h1">{{ error.status }}</h1>
      <p>{{ error.message }}</p>
    </article>
  </NuxtLayout>
</template>
