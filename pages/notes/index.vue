<script setup lang="ts">
import { notesQuery } from '~/queries'

const route = useRoute()
const { data } = await useKql(notesQuery)

// Set the current page data for the global page context
const page = data.value?.result
setPage(page)

const tag = computed(() => route.query.tag as string)

// Filter page children by tags
const notes = computed(() =>
  (page?.children ?? []).filter((i: any) =>
    tag.value ? i.tags?.includes(tag.value) : true
  )
)
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
        v-for="(item, index) in notes"
        :key="index"
        class="column"
        style="--columns: 4"
      >
        <AppNote :note="item" :excerpt="true" />
      </li>
    </ul>
  </div>
</template>
