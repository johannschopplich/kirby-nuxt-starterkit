<script setup lang="ts">
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
        <slot />
      </main>

      <AppFooter />
    </Body>
  </Html>
</template>
