import type { KirbyQueryResponse, KirbyQuerySchema } from 'kirby-types'
import type { KirbySharedPageData } from './page'
import { sharedQuerySelects } from './page'

export interface KirbyAlbumData extends KirbySharedPageData {
  subheadline: string
  text: string
  gallery: {
    resized: { url: string }
    width: number
    height: number
    url: string
    alt: string | null
  }[]
}

export type KirbyAlbumResponse = KirbyQueryResponse<KirbyAlbumData>

export function getAlbumQuery(pageId: string): KirbyQuerySchema {
  return {
    query: `page("${pageId}")`,
    select: {
      ...sharedQuerySelects,
      subheadline: true,
      text: true,
      gallery: {
        query: 'page.images.sortBy("sort", "filename")',
        select: {
          resized: {
            query: 'file.resize(800)',
            select: ['url'],
          },
          width: true,
          height: true,
          url: true,
          alt: true,
        },
      },
    },
  }
}
