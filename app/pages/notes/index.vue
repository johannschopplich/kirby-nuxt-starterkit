<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { KirbyNotesData } from '~/queries'
import { getNotesQuery } from '~/queries'

// Remounts on a query change, so the 404 check below runs for every page and tag.
definePageMeta({ key: (route) => route.fullPath })

const route = useRoute()
const tag = computed(() =>
  typeof route.query.tag === 'string' && route.query.tag
    ? route.query.tag
    : undefined,
)
const currentPage = computed(
  () => Math.max(Number.parseInt(String(route.query.page)), 1) || 1,
)

const { data, error } = await useKqlPage<KirbyNotesData>(
  () => getNotesQuery({ tag: tag.value, page: currentPage.value }),
  { key: () => `page:${route.path}:${tag.value ?? ''}:${currentPage.value}` },
)

if (error.value) {
  throw createError({
    status: 500,
    statusText: 'Failed to load the page',
    fatal: true,
  })
}

const page = data.value?.result
// Kirby answers a page past the last one with the last page, and an empty list
// with zero pages.
if (!page || currentPage.value > Math.max(page.children.pagination.pages, 1)) {
  throw createError({ status: 404, statusText: 'Page Not Found', fatal: true })
}

setPage(page, {
  path: useRouter().resolve(getPageLink(currentPage.value)).fullPath,
})

const notes = computed(() => data.value?.result?.children)

function getPageLink(page: number): RouteLocationRaw {
  return {
    path: route.path,
    query: { tag: tag.value, page: page > 1 ? page : undefined },
  }
}
</script>

<template>
  <div>
    <header v-if="tag" class="h1">
      <h1>
        <small>Tag:</small>
        {{ tag }}
        <NuxtLink :to="route.path" aria-label="All Notes">&times;</NuxtLink>
      </h1>
    </header>
    <AppIntro v-else />

    <ul class="grid">
      <li
        v-for="(item, index) in notes?.data"
        :key="item.id"
        class="column"
        style="--columns: 4"
      >
        <AppNote :note="item" is-excerpt :is-eager="index < 3" />
      </li>
    </ul>

    <!-- Vue Router ignores the query when it marks the current page, so the page links opt out of `aria-current`. -->
    <nav v-if="notes && notes.pagination.pages > 1" class="pagination">
      <NuxtLink
        v-if="notes.pagination.page > 1"
        class="pagination-prev"
        :to="getPageLink(notes.pagination.page - 1)"
        aria-label="Previous page"
        :aria-current="undefined"
      >
        &larr;
      </NuxtLink>
      <span v-else class="pagination-prev">&larr;</span>

      <NuxtLink
        v-if="notes.pagination.page < notes.pagination.pages"
        class="pagination-next"
        :to="getPageLink(notes.pagination.page + 1)"
        aria-label="Next page"
        :aria-current="undefined"
      >
        &rarr;
      </NuxtLink>
      <span v-else class="pagination-next">&rarr;</span>
    </nav>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  padding-top: 6rem;
}
.pagination > span {
  color: var(--color-text-grey);
}
.pagination > * {
  padding: 0.5rem;
  width: 3rem;
  text-align: center;
  border: 2px solid currentColor;
  margin-right: 1.5rem;
}
.pagination > a:hover {
  background: var(--color-black);
  color: var(--color-white);
  border-color: var(--color-black);
}
</style>
