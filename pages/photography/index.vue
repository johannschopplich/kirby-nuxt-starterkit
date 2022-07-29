<script setup lang="ts">
const { data } = await useKql({
  query: 'kirby.page("photography")',
  select: {
    title: true,
    // description: true,
    children: {
      query: 'page.children.listed',
      select: {
        id: true,
        title: true,
        cover: {
          query: 'page.content.cover.toFile',
          select: {
            cropped: {
              query: 'file.crop(400, 500)',
              select: ['url'],
            },
            url: true,
            alt: true,
          },
        },
        image: {
          query: 'page.images.first',
          select: {
            cropped: {
              query: 'file.crop(400, 500)',
              select: ['url'],
            },
            url: true,
            alt: true,
          },
        },
      },
    },
  },
})

// Set the current page data for the global page context
const page = setPage(data.value.result)

const albums = computed(() => page.value.children ?? [])
</script>

<template>
  <div>
    <AppIntro />

    <ul class="grid" style="--gutter: 1.5rem">
      <li
        v-for="(album, index) in albums"
        :key="index"
        class="column"
        style="--columns: 3"
      >
        <NuxtLink :to="`/${album.id}`">
          <figure>
            <span class="img" style="--w: 4; --h: 5">
              <img
                :src="
                  album?.cover?.cropped?.url ?? album?.images?.[0]?.cropped?.url
                "
                :alt="album?.cover?.alt ?? album?.images?.[0]?.alt"
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
