<script setup lang="ts">
import type { KirbyBlock } from '#nuxt-kql'
import type { KirbyImage } from '~/types'

const props = defineProps<{
  block?: KirbyBlock<'image'>
}>()

const page = usePage()
const image = computed(() =>
  ((page.value?.images ?? []) as KirbyImage[]).find(
    (i) => i.filename === props.block.content.image?.[0]
  )
)

const ratio = computed(() => props.block.content.ratio ?? 'auto')
</script>

<template>
  <figure>
    <a
      :href="block.content.link || block.content.src"
      :data-contain="block.content.crop === false || undefined"
      :data-lightbox="block.content.link || undefined"
      :class="[ratio === 'auto' ? 'auto' : 'img']"
      :style="`--w: ${ratio.split('/')[0] ?? 1}; --h: ${
        ratio.split('/')[1] ?? 1
      };`"
    >
      <img
        :src="block.content.location === 'web' ? block.content.src : image?.url"
        :alt="block.content.alt || image?.alt"
      />
    </a>

    <figcaption
      v-if="block.content.caption"
      class="img-caption"
      v-html="block.content.caption"
    />
  </figure>
</template>
