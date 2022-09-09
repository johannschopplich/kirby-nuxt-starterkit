<script setup lang="ts">
import slugify from '@sindresorhus/slugify'
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block: KirbyBlock<'heading'>
}>()
</script>

<template>
  <component :is="block.content.level" :id="slugify(block.content.text)">
    <span v-html="block.content.text" />
  </component>
</template>
