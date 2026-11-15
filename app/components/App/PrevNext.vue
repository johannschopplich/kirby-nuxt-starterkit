<script setup lang="ts">
import type { KirbyNoteData } from '~/queries'

// Explicitly not using `computed` here to avoid new page's content being
// rendered before the new page is visited.
const page = usePage<KirbyNoteData>().value
</script>

<template>
  <nav class="blog-prevnext">
    <h2 class="h2">Keep on reading</h2>

    <div class="autogrid" style="--gutter: 1.5rem">
      <AppNote v-if="page.prev" :note="page.prev" :excerpt="false" />
      <AppNote v-if="page.next" :note="page.next" :excerpt="false" />
    </div>
  </nav>
</template>
