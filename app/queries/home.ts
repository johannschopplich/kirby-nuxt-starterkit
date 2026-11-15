import type { KirbyQueryResponse, KirbyQuerySchema } from 'kirby-types'
import type { KirbySharedPageData } from './page'
import { sharedQuerySelects } from './page'

export interface KirbyHomeData extends KirbySharedPageData {
  headline: string
  subheadline: string
  albums: {
    id: string
    title: string
    cover: {
      resized: { url: string }
      alt: string | null
    } | null
  }[]
}

export type KirbyHomeResponse = KirbyQueryResponse<KirbyHomeData>

export const homeQuery: KirbyQuerySchema = {
  query: 'page("home")',
  select: {
    ...sharedQuerySelects,
    headline: true,
    subheadline: true,
    albums: {
      query: 'page("photography").children.listed',
      select: {
        id: true,
        title: true,
        cover: {
          query: 'page.content.cover.toFile ?? page.image',
          select: {
            resized: {
              query: 'file.resize(1024, 1024)',
              select: ['url'],
            },
            alt: true,
          },
        },
      },
    },
  },
}
