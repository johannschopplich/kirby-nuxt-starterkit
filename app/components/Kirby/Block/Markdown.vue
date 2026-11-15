<script setup lang="ts">
import type { KirbyBlock } from 'kirby-types'

defineProps<{
  block: KirbyBlock<'markdown'>
}>()
</script>

<template>
  <!-- The backend's blocks resolver renders the Markdown to HTML. -->
  <div v-html="block.content.text" />
</template>
