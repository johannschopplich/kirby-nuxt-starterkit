<script setup lang="ts">
import type { KirbyBlock } from 'kirby-types'
import type { ResolvedKirbyImage } from '#shared/types/kirby'

defineProps<{
  block: KirbyBlock<
    'gallery',
    {
      images: ResolvedKirbyImage[]
      caption: string
      ratio: string
      crop: 'true' | 'false'
    }
  >
}>()
</script>

<template>
  <figure>
    <ul>
      <li v-for="image in block.content.images" :key="image.url">
        <a :href="image.url">
          <img
            :src="image.url"
            :srcset="image.srcset"
            :width="image.width"
            :height="image.height"
            sizes="auto, 33vw"
            loading="lazy"
            :alt="image.alt ?? ''"
            :style="getBlockImageStyle(block.content)"
          />
        </a>
      </li>
    </ul>

    <figcaption v-if="block.content.caption" v-html="block.content.caption" />
  </figure>
</template>
