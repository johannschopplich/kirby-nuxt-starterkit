<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

interface KirbyImage {
  id: string
  uuid: string
  url: string
  alt: string
}

const props = defineProps<{
  block: KirbyBlock<'image'>
}>()

const page = usePageData()

// Explicitly not using `computed` here
const image = page.value?.images?.find(
  ({ uuid }: KirbyImage) => uuid === props.block.content.image?.[0]
)

const ratio = props.block.content.ratio || 'auto'
let size: { w?: string; h?: string } = {}

if (ratio !== 'auto') {
  const [w = '1', h = '1'] = ratio.split('/')
  size = { w, h }
}

// Auto sizes for `srcset` attribute if used
const figure = ref<HTMLElement | undefined>()
const { width } = useElementSize(figure)
</script>

<template>
  <figure ref="figure">
    <component
      :is="block.content.link ? 'a' : 'div'"
      :href="block.content.link || undefined"
      :data-contain="block.content.crop === false || undefined"
      :class="[ratio === 'auto' ? 'auto' : 'img']"
      :style="`--w: ${size.w}; --h: ${size.h};`"
    >
      <img
        :src="block.content.location === 'web' ? block.content.src : image?.url"
        :sizes="`${width}px`"
        :alt="block.content.alt || image?.alt"
      />
    </component>

    <figcaption
      v-if="block.content.caption"
      class="img-caption"
      v-html="block.content.caption"
    />
  </figure>
</template>
