<script lang="ts">
/* eslint-disable import/first */
export interface KirbyImage {
  id: string
  uuid: string
  url: string
  alt: string | null
}
</script>

<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'

const props = defineProps<{
  block: KirbyBlock<'image'>
}>()

const page = usePage()

// Use static data to avoid reactivity when redirecting to another page
const images = page.value.images

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
        v-if="block.content.location === 'web'"
        :src="block.content.src"
        :alt="block.content.alt"
      />
      <KirbyUuidResolver
        v-else
        v-slot="{ item: image }"
        :uuid="props.block.content.image?.[0]"
        :collection="images"
      >
        <img :src="image.url" :sizes="`${width}px`" :alt="image.alt" />
      </KirbyUuidResolver>
    </component>

    <figcaption
      v-if="block.content.caption"
      class="img-caption"
      v-html="block.content.caption"
    />
  </figure>
</template>
