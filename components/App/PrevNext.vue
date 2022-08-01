<script setup lang="ts">
const page = useCurrentPage()
const { data } = await useNotesPage()
const children = computed(() => data.value?.result?.children)

// Get the next page
const nextPage = computed(() => {
  const index = children.value?.findIndex((item) => item.id === page.value?.id)
  return children.value?.[index + 1]
})

// Get the previous page
const prevPage = computed(() => {
  const index = children.value?.findIndex((item) => item.id === page.value?.id)
  return children.value?.[index - 1]
})
</script>

<template>
  <nav class="blog-prevnext">
    <h2 class="h2">Keep on reading</h2>

    <div class="autogrid" style="--gutter: 1.5rem">
      <AppNote v-if="nextPage" :note="nextPage" :excerpt="false" />
      <AppNote v-if="prevPage" :note="prevPage" :excerpt="false" />
    </div>
  </nav>
</template>
