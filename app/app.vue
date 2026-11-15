<script setup lang="ts">
import '~/assets/css/main.css'

// Routes internal links in Kirby's HTML content through the router.
const main = useTemplateRef('main')
useInternalLinks(main)
</script>

<template>
  <Html lang="en">
    <Head>
      <Link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </Head>

    <Body>
      <AppHeader />

      <main ref="main" class="main">
        <NuxtPage />
      </main>

      <AppFooter />
    </Body>
  </Html>
</template>
