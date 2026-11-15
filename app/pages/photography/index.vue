<script setup lang="ts">
import type { KirbyPhotographyData } from '~/queries'
import { photographyQuery } from '~/queries'

const page = getPageOrThrow(
  await useKqlPage<KirbyPhotographyData>(photographyQuery),
)
setPage(page)
</script>

<template>
  <div>
    <AppIntro />

    <ul class="grid" style="--gutter: 1.5rem">
      <li
        v-for="(album, index) in page.children"
        :key="index"
        class="column"
        style="--columns: 3"
      >
        <NuxtLink :to="`/${album.id}`">
          <figure>
            <span class="img" style="--w: 4; --h: 5">
              <img
                v-if="album.cover"
                :src="album.cover.cropped.url"
                :alt="album.cover.alt ?? ''"
                :loading="index < 4 ? undefined : 'lazy'"
              />
            </span>
            <figcaption class="img-caption">
              {{ album.title }}
            </figcaption>
          </figure>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
