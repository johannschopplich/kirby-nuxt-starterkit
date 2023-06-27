<script setup lang="ts">
import {
  LazyKirbyBlockHeading,
  LazyKirbyBlockImage,
  LazyKirbyBlockLine,
  LazyKirbyBlockList,
  LazyKirbyBlockQuote,
  LazyKirbyBlockText,
} from '#components'
import type { KirbyBlock } from 'kirby-fest'

defineProps<{
  blocks: KirbyBlock<string>[]
}>()

type ComponentConstructor<
  T extends ComponentPublicInstance<Props> = ComponentPublicInstance<any>,
  Props = any
> = new (...args: any[]) => T

const blockComponents: Partial<Record<string, ComponentConstructor>> = {
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
