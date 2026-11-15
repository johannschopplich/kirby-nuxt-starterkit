<script setup lang="ts">
import type { KirbyBlock } from 'kirby-types'

const props = defineProps<{
  block: KirbyBlock<
    'video',
    {
      location: string
      url: string
      /** Embed HTML for `url`, added by the backend's blocks resolver. */
      embed?: string | null
      video: { url: string }[]
      poster: { url: string }[]
      caption: string
      autoplay: 'true' | 'false'
      muted: 'true' | 'false'
      loop: 'true' | 'false'
      controls: 'true' | 'false'
      preload: string
    }
  >
}>()

const content = props.block.content
const file = content.location === 'kirby' ? content.video?.[0] : undefined
const isAutoplay = content.autoplay === 'true'
</script>

<template>
  <figure v-if="file || content.embed">
    <!-- Same attributes as Kirby's core video block. -->
    <video
      v-if="file"
      :src="file.url"
      :poster="content.poster?.[0]?.url"
      :autoplay="isAutoplay"
      :controls="content.controls === 'true'"
      :loop="content.loop === 'true'"
      :muted="content.muted === 'true' || isAutoplay"
      :playsinline="isAutoplay"
      :preload="content.preload || undefined"
    />
    <span v-else class="video" style="--w: 16; --h: 9" v-html="content.embed" />

    <figcaption
      v-if="content.caption"
      class="video-caption"
      v-html="content.caption"
    />
  </figure>
</template>
