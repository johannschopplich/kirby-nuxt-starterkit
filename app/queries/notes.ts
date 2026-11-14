import type { KirbyQuerySchema } from 'kirby-types'

export const notesQuery: KirbyQuerySchema = {
  query: 'page("notes")',
  select: {
    title: true,
    intendedTemplate: true,
    subheadline: true,
    text: 'page.text.kirbytext',
    children: {
      query: 'page.children.listed.sortBy("date", "desc")',
      select: {
        id: true,
        title: true,
        tags: 'page.tags.split(",")',
        text: 'page.text.toResolvedBlocks.excerpt(280)',
        published: 'page.date.toDate',
        cover: {
          query: 'page.content.cover.toFile ?? page.image',
          select: ['id', 'url'],
        },
      },
    },
  },
}
