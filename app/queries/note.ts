import type { KirbyBlock, KirbyQuerySchema } from 'kirby-types'
import type { KirbyNoteCardData } from './notes'
import type { KirbySharedPageData } from './page'
import { noteCardQuerySelects } from './notes'
import { sharedQuerySelects } from './page'

export interface KirbyNoteData extends KirbySharedPageData {
  subheading: string
  tags: string[]
  text: KirbyBlock[]
  /** ISO 8601 date for the `datetime` attribute. */
  date: string
  published: string
  cover: {
    url: string
    alt: string | null
  } | null
  prev: KirbyNoteCardData | null
  next: KirbyNoteCardData | null
}

export function getNoteQuery(pageId: string): KirbyQuerySchema {
  return {
    query: `page("${pageId}")`,
    select: {
      ...sharedQuerySelects,
      subheading: true,
      tags: 'page.tags.split(",")',
      text: 'page.text.toResolvedBlocks',
      date: 'page.date.toDate("yyyy-MM-dd")',
      published: 'page.date.toDate("d MMM, y")',
      cover: {
        query: 'page.content.cover.toFile ?? page.image',
        select: {
          url: 'file.crop(1200, 600).url',
          alt: true,
        },
      },
      // KQL refuses `prevListed` and `nextListed`.
      prev: {
        query: 'page.prevAll.listed.last',
        select: noteCardQuerySelects,
      },
      next: {
        query: 'page.nextAll.listed.first',
        select: noteCardQuerySelects,
      },
    },
  }
}
