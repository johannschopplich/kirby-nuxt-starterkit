<script setup lang="ts">
import slugify from '@sindresorhus/slugify'
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  block?: KirbyBlock<'heading'>
}>()
</script>

<template>
  <!-- eslint-disable vue/no-v-text-v-html-on-component -->
  <component
    :is="block.content.level"
    :id="slugify(block.content.text)"
    v-html="block.content.text"
  />
  <!-- eslint-enable vue/no-v-text-v-html-on-component -->
</template>
