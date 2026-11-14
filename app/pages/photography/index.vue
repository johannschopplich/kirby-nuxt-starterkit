<script setup lang="ts">
const { data } = await useKql({
  query: 'page("photography")',
  select: {
    id: true,
    title: true,
    intendedTemplate: true,
    subheadline: true,
    children: {
      query: 'page.children.listed',
      select: {
        id: true,
        title: true,
        cover: {
          query: 'page.content.cover.toFile ?? page.image',
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

const page = data.value?.result
setPage(page)
</script>

<template>
  <div>
    <AppIntro />

    <ul class="grid" style="--gutter: 1.5rem">
      <li
        v-for="(album, index) in page?.children ?? []"
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
