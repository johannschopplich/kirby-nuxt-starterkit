import type { KirbyQueryResponse, KirbyQuerySchema } from 'kirby-types'
import type { KirbySharedPageData } from './page'
import { sharedQuerySelects } from './page'

export interface KirbyNoteCardData {
  id: string
  title: string
  tags: string[]
  text: string
  published: number
  cover: {
    id: string
    url: string
  } | null
}

export interface KirbyNotesData extends KirbySharedPageData {
  subheadline: string
  text: string
  children: KirbyNoteCardData[]
}

export type KirbyNotesResponse = KirbyQueryResponse<KirbyNotesData>

export const notesQuery: KirbyQuerySchema = {
  query: 'page("notes")',
  select: {
    ...sharedQuerySelects,
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
