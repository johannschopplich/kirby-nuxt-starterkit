<script setup lang="ts">
import type { KirbyBlock } from 'kirby-types'
import type { ResolvedKirbyImage } from '#shared/types/kirby'

const props = defineProps<{
  block: KirbyBlock<
    'image',
    {
      location: string
      image: ResolvedKirbyImage[]
      src: string
      alt: string
      caption: string
      link: string
      ratio: string
      crop: 'true' | 'false'
    }
  >
  isEager?: boolean
}>()

const isWeb = props.block.content.location === 'web'
const image = isWeb ? undefined : props.block.content.image?.[0]
const src = isWeb ? props.block.content.src : image?.url
</script>

<template>
  <figure v-if="src">
    <a :href="block.content.link || src">
      <img
        :src="src"
        :srcset="image?.srcset"
        :width="image?.width"
        :height="image?.height"
        :sizes="image ? 'auto, 100vw' : undefined"
        :loading="isEager ? undefined : 'lazy'"
        :alt="block.content.alt || image?.alt || ''"
        :style="{
          aspectRatio: block.content.ratio || undefined,
          objectFit: block.content.crop === 'false' ? 'contain' : 'cover',
        }"
      />
    </a>

    <figcaption
      v-if="block.content.caption"
      class="img-caption"
      v-html="block.content.caption"
    />
  </figure>
</template>
