<script setup lang="ts">
import slugify from '@sindresorhus/slugify'
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block?: KirbyBlock<'heading'>
}>()
</script>

<template>
  <component :is="block.content.level" :id="slugify(block.content.text)">
    <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
    <span v-html="block.content.text" />
  </component>
</template>
