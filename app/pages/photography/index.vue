<script setup lang="ts">
import type { KirbyPhotographyResponse } from '~/queries'
import { photographyQuery } from '~/queries'

const { data } = await useKql<KirbyPhotographyResponse>(photographyQuery)

const page = data.value!.result!
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
              <img :src="album?.cover?.cropped?.url" :alt="album?.cover?.alt" />
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
