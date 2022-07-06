<script setup lang="ts">
const { data } = await usePhotographyPage()
const albums = computed(() => data.value?.result?.children)
</script>

<template>
  <div>
    <AppIntro />

    <ul class="grid" style="--gutter: 1.5rem">
      <li
        v-for="(album, index) in albums ?? []"
        :key="index"
        class="column"
        style="--columns: 3"
      >
        <NuxtLink :to="`/${album.id}`">
          <figure>
            <span class="img" style="--w: 4; --h: 5">
              <img :src="album?.cover?.url ?? album?.images?.[0]?.url" alt="" />
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
