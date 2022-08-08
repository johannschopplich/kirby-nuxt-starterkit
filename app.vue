<script setup lang="ts">
import '~/assets/css/main.css'
import '~/assets/css/medium-zoom.css'

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <Head>
    <Link rel="icon" href="/favicon.ico" type="image/x-icon" />
  </Head>

  <AppHeader />

  <main class="main">
    <NuxtPage />
  </main>

  <AppFooter />
</template>
