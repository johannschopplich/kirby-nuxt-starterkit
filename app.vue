<script setup lang="ts">
import { resolveURL } from 'ufo'

import '~/assets/css/main.css'
import '~/assets/css/lightbox.css'

const { baseUrl } = useRuntimeConfig().public
const site = useSite()
const page = usePage()
const route = useRoute()

const title = computed(() =>
  page.value?.title
    ? `${page.value?.title} – ${site.value.title}`
    : site.value.title
)
const description = computed(
  () => page.value?.description ?? site.value.description
)
const url = computed(() => resolveURL(baseUrl, route.path))

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>

    <Link rel="icon" href="/favicon.ico" type="image/x-icon" />

    <Meta name="description" :content="description" />
    <Meta property="og:title" :content="title" />
    <Meta property="og:description" :content="description" />
    <Meta property="og:url" :content="url" />
    <Meta property="og:type" :content="'website'" />
    <Meta name="twitter:title" :content="title" />
    <Meta name="twitter:description" :content="description" />
    <Meta name="twitter:url" :content="url" />
    <Meta name="twitter:card" content="summary" />
  </Head>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
