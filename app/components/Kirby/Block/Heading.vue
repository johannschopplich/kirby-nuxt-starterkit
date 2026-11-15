<script setup lang="ts">
import type { KirbyBlock } from 'kirby-types'

defineProps<{
  block: KirbyBlock<'heading'>
}>()
</script>

<template>
  <component :is="block.content.level || 'h2'">
    <span v-html="block.content.text" />
  </component>
</template>
