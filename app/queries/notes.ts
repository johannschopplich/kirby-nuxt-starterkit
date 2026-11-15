import type { KirbyQuerySchema } from 'kirby-types'
import type { KirbySharedPageData } from './page'
import { sharedQuerySelects } from './page'

export interface KirbyNoteCardData {
  id: string
  title: string
  published: number
  cover: {
    id: string
    url: string
  } | null
}

export interface KirbyNoteExcerptData extends KirbyNoteCardData {
  tags: string[]
  text: string
}

export interface KirbyNotesData extends KirbySharedPageData {
  subheadline: string
  text: string
  children: KirbyNoteExcerptData[]
}

export const noteCardQuerySelects = {
  id: true,
  title: true,
  published: 'page.date.toDate',
  cover: {
    query: 'page.content.cover.toFile ?? page.image',
    select: ['id', 'url'],
  },
} satisfies KirbyQuerySchema['select']

export const notesQuery: KirbyQuerySchema = {
  query: 'page("notes")',
  select: {
    ...sharedQuerySelects,
    subheadline: true,
    text: 'page.text.kirbytext',
    children: {
      query: 'page.children.listed.sortBy("date", "desc")',
      select: {
        ...noteCardQuerySelects,
        tags: 'page.tags.split(",")',
        text: 'page.text.toResolvedBlocks.excerpt(280)',
      },
    },
  },
}
