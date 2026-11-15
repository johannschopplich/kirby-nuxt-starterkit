<script setup lang="ts">
import type { KirbyBlock } from 'kirby-types'
import type { Component } from 'vue'
import {
  LazyKirbyBlockHeading,
  LazyKirbyBlockImage,
  LazyKirbyBlockLine,
  LazyKirbyBlockList,
  LazyKirbyBlockQuote,
  LazyKirbyBlockText,
} from '#components'

defineProps<{
  blocks: KirbyBlock[]
  isAboveFold?: boolean
}>()

const blockComponents: Record<string, Component> = {
  heading: LazyKirbyBlockHeading,
  image: LazyKirbyBlockImage,
  line: LazyKirbyBlockLine,
  list: LazyKirbyBlockList,
  quote: LazyKirbyBlockQuote,
  text: LazyKirbyBlockText,
}

const content = useTemplateRef('content')
useInternalLinks(content)
</script>

<template>
  <div ref="content">
    <template v-for="(block, index) in blocks" :key="index">
      <component
        :is="blockComponents[block.type]"
        :block="block"
        v-bind="
          isAboveFold && index === 0 && block.type === 'image'
            ? { isEager: true }
            : {}
        "
      />
    </template>
  </div>
</template>
