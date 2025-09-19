<script setup lang="ts">
import type { KirbyLayout } from '#nuxt-kirby'

defineProps<{
  layouts: KirbyLayout[]
}>()

/** Returns the number of columns this column spans */
function span(width: `${string}/${string}`, columns = 12) {
  const [a, b] = width.split('/')
  return columns * (Number.parseInt(a) / Number.parseInt(b))
}
</script>

<template>
  <div>
    <section
      v-for="layout in layouts"
      :id="layout.id"
      :key="layout.id"
      class="grid margin-xl"
      style="--gutter: 1.5rem"
    >
      <div
        v-for="(column, index) in layout.columns"
        :key="index"
        class="column"
        :style="`--columns: ${span(column.width)}`"
      >
        <KirbyBlocks :blocks="column.blocks" class="text" />
      </div>
    </section>
  </div>
</template>
