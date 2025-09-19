<script setup lang="ts">
const { data } = await useKql({
  query: `page("${useRoute().path}")`,
  select: {
    id: true,
    title: true,
    intendedTemplate: true,
    // description: true,
    layouts: 'page.layout.toResolvedLayouts',
    address: 'page.address.kirbytext',
    email: true,
    phone: true,
    social: 'page.social.toStructure',
  },
})

// Set the current page data for the global page context
const page = data.value?.result
setPage(page)

const content = ref<HTMLElement | undefined>()
useInternalLinks(content)
</script>

<template>
  <div>
    <KirbyLayouts :layouts="page.layouts ?? []" />

    <aside class="contact">
      <h2 class="h1">Get in contact</h2>
      <div ref="content" class="grid" style="--gutter: 1.5rem">
        <section class="column text" style="--columns: 4">
          <h3>Address</h3>
          <div v-html="page.address" />
        </section>

        <section class="column text" style="--columns: 4">
          <h3>Email</h3>
          <p v-html="page.email" />
          <h3>Phone</h3>
          <p v-html="page.phone" />
        </section>

        <section class="column text" style="--columns: 4">
          <h3>On the web</h3>
          <ul>
            <li v-for="(item, index) in page.social" :key="index">
              <a :href="item.url">
                {{ item.platform }}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.contact {
  padding: 3rem;
  border: 2px solid #000;
}
.contact .h1 {
  margin-bottom: 1.5rem;
}
</style>
