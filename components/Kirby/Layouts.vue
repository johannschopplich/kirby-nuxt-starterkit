<script setup lang="ts">
import type { KirbyLayout } from '#nuxt-kql'

defineProps<{
  layouts: KirbyLayout[]
}>()

/** Returns the number of columns this column spans */
function span(width: `${string}/${string}`, columns = 12) {
  const [a, b] = width.split('/')
  return columns * (parseInt(a) / parseInt(b))
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
        <div class="text">
          <KirbyBlocks :blocks="column.blocks" />
        </div>
      </div>
    </section>
  </div>
</template>
