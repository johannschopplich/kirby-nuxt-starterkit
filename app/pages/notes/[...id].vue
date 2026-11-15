<script setup lang="ts">
import type { KirbyNoteData } from '~/queries'
import { getNoteQuery } from '~/queries'

const route = useRoute()
const { data, error } = await useKqlPage<KirbyNoteData>(
  getNoteQuery(route.path),
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

const parentRoute = computed(() => route.path.split('/').slice(0, -1).join('/'))
</script>

<template>
  <div>
    <a
      v-if="page.cover"
      :href="page.cover.original"
      class="img"
      style="--w: 2; --h: 1"
    >
      <img :src="page.cover.url" :alt="page.cover.alt ?? ''" />
    </a>

    <article class="note">
      <header class="note-header h1">
        <h1 class="note-title">{{ page.title }}</h1>
        <p v-if="page.subheading" class="note-subheading">
          <small>{{ page.subheading }}</small>
        </p>
      </header>

      <KirbyBlocks :blocks="page.text" class="note text" />

      <footer class="note-footer">
        <ul v-if="page.tags" class="note-tags">
          <li v-for="(tag, index) in page.tags" :key="index">
            <NuxtLink :to="{ path: parentRoute, query: { tag } }">
              {{ tag }}
            </NuxtLink>
          </li>
        </ul>

        <time v-if="page.published" class="note-date" :datetime="page.date">
          Published on {{ page.published }}
        </time>
      </footer>

      <LazyAppPrevNext />
    </article>
  </div>
</template>

<style scoped>
.note {
  max-width: 35rem;
  margin: 0 auto;
}
.note-header {
  padding-top: 3rem;
  margin-bottom: 3rem;
}
.note-footer {
  padding: 6rem 0;
}
.note-date {
  color: var(--color-text-grey);
}
.note-tags {
  display: flex;
  margin-bottom: 1.5rem;
}
.note-tags li {
  margin-right: 0.5rem;
}
.note-tags a {
  padding: 0.5rem 1rem;
  display: block;
  background: var(--color-light);
}
.note-tags a:hover {
  background: var(--color-black);
  color: var(--color-white);
}
</style>
