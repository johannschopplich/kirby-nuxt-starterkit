<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block?: KirbyBlock<'list'>
}>()
</script>

<template>
  <div v-html="block.content.text" />
</template>
