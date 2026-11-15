<script setup lang="ts">
import type { KirbyNoteCardData, KirbyNoteExcerptData } from '~/queries'

defineProps<{
  note: KirbyNoteCardData | KirbyNoteExcerptData
  isExcerpt?: boolean
  isEager?: boolean
}>()
</script>

<template>
  <article class="note-excerpt">
    <NuxtLink :to="`/${note.id}`">
      <header>
        <figure class="img" style="--w: 16; --h: 9">
          <img
            v-if="note.cover"
            :src="note.cover.url"
            :alt="note.cover.alt ?? ''"
            :loading="isEager ? undefined : 'lazy'"
          />
        </figure>

        <h2 class="note-excerpt-title">{{ note.title }}</h2>
        <time
          v-if="note.published"
          class="note-excerpt-date"
          :datetime="note.date"
        >
          {{ note.published }}
        </time>
      </header>

      <div v-if="isExcerpt && 'text' in note" class="note-excerpt-text">
        {{ note.text }}
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
