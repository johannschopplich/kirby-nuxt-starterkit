<script setup lang="ts">
import {
  KirbyBlockHeading,
  KirbyBlockImage,
  KirbyBlockLine,
  KirbyBlockList,
  KirbyBlockQuote,
  KirbyBlockText,
  // @ts-expect-error: To be fixed in Nuxt upstream
} from '#components'
import type { ComponentPublicInstance } from 'vue'
import type { KirbyBlock } from '#nuxt-kql'

defineProps<{
  blocks: KirbyBlock<string>[]
}>()

const blockComponents: Partial<
  Record<string, new () => ComponentPublicInstance>
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
