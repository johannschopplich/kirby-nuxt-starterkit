<script setup lang="ts">
import {
  LazyKirbyBlockHeading,
  LazyKirbyBlockImage,
  LazyKirbyBlockLine,
  LazyKirbyBlockList,
  LazyKirbyBlockQuote,
  LazyKirbyBlockText,
} from '#components'
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  blocks: KirbyBlock<string>[]
}>()

type Component = abstract new (...args: any) => any

const blockComponents: Partial<Record<string, Component>> = {
  heading: LazyKirbyBlockHeading,
  image: LazyKirbyBlockImage,
  line: LazyKirbyBlockLine,
  list: LazyKirbyBlockList,
  quote: LazyKirbyBlockQuote,
  text: LazyKirbyBlockText,
}
</script>

<template>
  <div v-router-links>
    <template v-for="(block, index) in blocks" :key="index">
      <component :is="blockComponents[block.type]" :block="block" />
    </template>
  </div>
</template>
