<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kirby'

defineProps<{
  block: KirbyBlock<'line'>
}>()
</script>

<template>
  <hr />
</template>
