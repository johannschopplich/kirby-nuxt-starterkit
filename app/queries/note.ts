import type { KirbyBlock, KirbyQuerySchema } from 'kirby-types'
import type { KirbySharedPageData } from './page'
import { sharedQuerySelects } from './page'

export interface KirbyNoteData extends KirbySharedPageData {
  subheading: string
  tags: string[]
  text: KirbyBlock[]
  published: number
  cover: {
    id: string
    url: string
  } | null
}

export function getNoteQuery(pageId: string): KirbyQuerySchema {
  return {
    query: `page("${pageId}")`,
    select: {
      ...sharedQuerySelects,
      subheading: true,
      tags: 'page.tags.split(",")',
      text: 'page.text.toResolvedBlocks',
      published: 'page.date.toDate',
      cover: {
        query: 'page.content.cover.toFile ?? page.image',
        select: ['id', 'url'],
      },
    },
  }
}
