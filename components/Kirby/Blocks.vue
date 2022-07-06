<script setup lang="ts">
import {
  KirbyBlockHeading,
  KirbyBlockImage,
  KirbyBlockLine,
  KirbyBlockList,
  KirbyBlockQuote,
  KirbyBlockText,
} from '#components'
import type { ComponentPublicInstance } from 'vue'
import type { KirbyBlock, KirbyBlockType } from '#nuxt-kql'

defineProps<{
  blocks: KirbyBlock<string>[]
}>()

const blockComponents: Partial<
  Record<KirbyBlockType, new (...args: any[]) => ComponentPublicInstance>
> = {
  heading: KirbyBlockHeading,
  image: KirbyBlockImage,
  line: KirbyBlockLine,
  list: KirbyBlockList,
  quote: KirbyBlockQuote,
  text: KirbyBlockText,
}
</script>

<template>
  <div v-internal-links>
    <template v-for="(block, index) in blocks ?? []" :key="index">
      <component :is="blockComponents[block.type]" :block="block" />
    </template>
  </div>
</template>
