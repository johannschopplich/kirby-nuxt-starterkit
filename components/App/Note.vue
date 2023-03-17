<script setup lang="ts">
defineProps<{
  note?: Record<string, any>
  excerpt?: boolean
}>()

function formatDateShort(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}
</script>

<template>
  <article class="note-excerpt">
    <NuxtLink :to="`/${note?.id}`">
      <header>
        <figure class="img" style="--w: 16; --h: 9">
          <img :src="note?.cover?.url ?? note?.images?.[0]?.url" alt="" />
        </figure>

        <h2 class="note-excerpt-title">{{ note?.title }}</h2>
        <time
          v-if="note?.published"
          class="note-excerpt-date"
          :datetime="note.published"
        >
          {{ formatDateShort(new Date(note.published)) }}
        </time>
      </header>

      <div v-if="excerpt" class="note-excerpt-text">
        {{ note?.text }}
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.note-excerpt {
  line-height: 1.5em;
}
.note-excerpt header {
  margin-bottom: 1.5rem;
}
.note-excerpt figure {
  margin-bottom: 0.5rem;
}
.note-excerpt-title {
  font-weight: 600;
}
.note-excerpt-date {
  color: var(--color-text-grey);
}
</style>
