<script setup lang="ts">
import type { KirbyAlbumData } from '~/queries'
import { getAlbumQuery } from '~/queries'

const { data } = await useKqlPage<KirbyAlbumData>(
  getAlbumQuery(useRoute().path),
)

const page = data.value!.result!
setPage(page)
</script>

<template>
  <article>
    <AppIntro />

    <div class="grid">
      <div class="column" style="--columns: 4">
        <div class="text" v-html="page.text" />
      </div>

      <div class="column" style="--columns: 8">
        <ul class="album-gallery">
          <li v-for="(image, index) in page.gallery" :key="index">
            <figure
              class="img"
              :style="`
                  --w: ${image.width};
                  --h: ${image.height};
                `"
            >
              <ElementMediumZoom
                :src="image.resized.url"
                :data-zoom-src="image.url"
                :alt="image.alt ?? ''"
                :loading="index < 2 ? undefined : 'lazy'"
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
