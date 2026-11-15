import type { KirbyQuerySchema } from 'kirby-types'
import type { KirbySharedPageData } from './page'
import { sharedQuerySelects } from './page'

export interface KirbyNoteCardData {
  id: string
  title: string
  /** ISO 8601 date for the `datetime` attribute. */
  date: string
  published: string
  cover: {
    url: string
    alt: string | null
  } | null
}

export interface KirbyNoteExcerptData extends KirbyNoteCardData {
  tags: string[]
  text: string
}

export interface KirbyNotesData extends KirbySharedPageData {
  subheadline: string
  text: string
  children: {
    data: KirbyNoteExcerptData[]
    pagination: {
      page: number
      pages: number
    }
  }
}

export const noteCardQuerySelects = {
  id: true,
  title: true,
  date: 'page.date.toDate("yyyy-MM-dd")',
  published: 'page.date.toDate("d MMM, y")',
  cover: {
    query: 'page.content.cover.toFile ?? page.image',
    select: {
      url: 'file.crop(320, 180).url',
      alt: true,
    },
  },
} satisfies KirbyQuerySchema['select']

const notesPerPage = 6

export function getNotesQuery({
  tag,
  page = 1,
}: { tag?: string; page?: number } = {}): KirbyQuerySchema {
  // A quote or backslash would break the KQL string literal.
  const tagFilter = tag
    ? `.filterBy("tags", "${tag.replace(/["\\]/g, '')}", ",")`
    : ''

  return {
    query: 'page("notes")',
    select: {
      ...sharedQuerySelects,
      subheadline: true,
      text: 'page.text.kirbytext',
      children: {
        query: `page.children.listed.sortBy("date", "desc")${tagFilter}`,
        select: {
          ...noteCardQuerySelects,
          tags: 'page.tags.split(",")',
          text: 'page.text.toResolvedBlocks.excerpt(280)',
        },
        pagination: { limit: notesPerPage, page },
      },
    },
  }
}
