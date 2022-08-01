<script setup lang="ts">
const route = useRoute()

const { data } = await useKql({
  query: `kirby.page("${route.path}")`,
  select: {
    id: true,
    title: true,
    // description: true,
    subheadline: true,
    text: true,
    gallery: {
      query: 'page.images.sortBy("sort", "filename")',
      select: {
        resized: {
          query: 'file.resize(800)',
          select: ['url'],
        },
        width: true,
        height: true,
        url: true,
        alt: true,
      },
    },
  },
})

// Set the current page data for the global page context
const page = setCurrentPage(() => data.value.result)
</script>

<template>
  <article>
    <AppIntro />

    <div class="grid">
      <div class="column" style="--columns: 4">
        <div class="text" v-html="page?.text" />
      </div>

      <div class="column" style="--columns: 8">
        <ul class="album-gallery">
          <li v-for="(image, index) in page?.gallery ?? []" :key="index">
            <figure
              class="img"
              :style="`
                  --w: ${image.width};
                  --h: ${image.height};
                `"
            >
              <img
                v-zoom
                :src="image.resized.url"
                :data-zoom-src="image.url"
                :alt="image.alt"
              />
            </figure>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<style scoped>
.album-gallery {
  line-height: 0;
  columns: 1;
  column-gap: 1.5rem;
}
.album-gallery li {
  display: block;
  margin-bottom: 1.5rem;
  break-inside: avoid;
}
@media screen and (min-width: 60rem) {
  .album-gallery {
    columns: 2;
  }
}
</style>
