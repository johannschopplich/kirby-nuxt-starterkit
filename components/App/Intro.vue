<script setup lang="ts">
const page = usePage()
</script>

<template>
  <header class="h1">
    <h1>
      {{ page?.headline || page?.title }}
    </h1>
    <p v-if="page?.subheadline" class="color-grey">{{ page.subheadline }}</p>
  </header>
</template>
