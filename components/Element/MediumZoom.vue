<script setup lang="ts">
import mediumZoom from 'medium-zoom'
import type { ComponentPublicInstance } from 'vue'
import type { Zoom, ZoomOptions } from 'medium-zoom'

const props = defineProps<{
  options?: ZoomOptions
}>()

let zoom: Zoom | undefined = undefined

watch(
  () => props.options,
  (options) => {
    const zoom = getZoom()
    zoom.update(options || {})
  },
)

function getZoom() {
  return (zoom ??= mediumZoom(props.options))
}

function attachZoom(ref: Element | ComponentPublicInstance | null) {
  const image = ref as HTMLImageElement | null
  const zoom = getZoom()

  if (image) {
    zoom.attach(image)
  } else {
    zoom.detach()
  }
}
</script>

<template>
  <img :ref="attachZoom" />
</template>
