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

const ratio = computed(() => props.block.content.ratio || 'auto')
const style = computed(() => {
  if (ratio.value === 'auto') return {}
  const [w = 1, h = 1] = ratio.value.split('/')
  return { w, h }
})

// Auto sizes for `srcset` attribute if used
const figure = ref<HTMLElement | undefined>()
const { width } = useElementSize(figure)
</script>

<template>
  <figure ref="figure">
    <a
      :href="block.content.link || block.content.src"
      :data-contain="block.content.crop === false || undefined"
      :class="[ratio === 'auto' ? 'auto' : 'img']"
      :style="`--w: ${style.w}; --h: ${style.h};`"
    >
      <img
        :src="block.content.location === 'web' ? block.content.src : image?.url"
        :sizes="`${width}px`"
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
