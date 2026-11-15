<script setup lang="ts">
import type { KirbyBlock } from 'kirby-types'

defineProps<{
  block: KirbyBlock<'code'>
}>()
</script>

<template>
  <pre><code :class="`language-${block.content.language || 'text'}`">{{ block.content.code }}</code></pre>
</template>
