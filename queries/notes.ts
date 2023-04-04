import type { KirbyQuerySchema } from '#nuxt-kql'

export const notesQuery: KirbyQuerySchema = {
  query: 'page("notes")',
  select: {
    title: true,
    intendedTemplate: true,
    // description: true,
    subheadline: true,
    text: 'page.text.kirbytext',
    children: {
      query: 'page.children.listed.sortBy("date", "desc")',
      select: {
        id: true,
        title: true,
        tags: 'page.tags.split(",")',
        text: 'page.text.toBlocks.excerpt(280)',
        published: 'page.date.toDate("c")',
        cover: {
          query: 'page.content.cover.toFile',
          select: ['id', 'url'],
        },
        images: {
          query: 'page.images',
          select: ['id', 'uuid', 'url', 'alt'],
        },
      },
    },
  },
}
