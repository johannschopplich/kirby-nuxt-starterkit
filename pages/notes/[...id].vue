<script setup lang="ts">
const route = useRoute()

const { data } = await useKql({
  query: `kirby.page("${route.path}")`,
  select: {
    id: true,
    title: true,
    // description: true,
    subheading: true,
    tags: 'page.tags.split(",")',
    text: 'page.text.toBlocks',
    published: 'page.date.toDate("c")',
    cover: {
      query: 'page.content.cover.toFile',
      select: ['id', 'url'],
    },
    // Required for image blocks and also for the cover fallback
    images: {
      query: 'page.images',
      select: ['id', 'filename', 'url', 'alt'],
    },
  },
})

// Set the current page data for the global page context
const page = storePageData(() => data.value?.result)

const parentRoute = computed(() => route.path.split('/').slice(0, -1).join('/'))
const coverUrl = computed(
  () => page.value?.cover?.url || page.value?.images?.[0]?.url
)

function formatDateShort(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}
</script>

<template>
  <div>
    <div v-if="coverUrl" class="img" style="--w: 2; --h: 1">
      <img :src="coverUrl" alt="" />
    </div>

    <article class="note">
      <header class="note-header h1">
        <h1 class="note-title">{{ page?.title }}</h1>
        <p v-if="page?.subheading" class="note-subheading">
          <small>{{ page?.subheading }}</small>
        </p>
      </header>

      <KirbyBlocks :blocks="page?.text ?? []" class="note text" />

      <footer class="note-footer">
        <ul v-if="page?.tags" class="note-tags">
          <li v-for="(tag, index) in page.tags" :key="index">
            <NuxtLink :to="{ path: parentRoute, query: { tag } }">{{
              tag
            }}</NuxtLink>
          </li>
        </ul>

        <time
          v-if="page?.published"
          class="note-date"
          :datetime="page.published"
        >
          Published on
          {{ formatDateShort(new Date(page.published)) }}
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
