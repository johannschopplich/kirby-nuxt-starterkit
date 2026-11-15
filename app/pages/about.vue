<script setup lang="ts">
import type { KirbyAboutData } from '~/queries'
import { getAboutQuery } from '~/queries'

const { data } = await useKqlPage<KirbyAboutData>(
  getAboutQuery(useRoute().path),
)

const page = data.value!.result!
setPage(page)
</script>

<template>
  <div>
    <AppIntro />

    <KirbyLayouts :layouts="page.layouts" />

    <aside class="contact">
      <h2 class="h1">Get in contact</h2>
      <div class="grid" style="--gutter: 1.5rem">
        <section class="column text" style="--columns: 4">
          <h3>Address</h3>
          <div v-html="page.address" />
        </section>

        <section class="column text" style="--columns: 4">
          <h3>Email</h3>
          <p>
            <a :href="`mailto:${page.email}`">{{ page.email }}</a>
          </p>
          <h3>Phone</h3>
          <p>
            <a :href="`tel:${page.phone.replace(/[^0-9+]/g, '')}`">
              {{ page.phone }}
            </a>
          </p>
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
