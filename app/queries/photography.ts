import type { KirbyQuerySchema } from 'kirby-types'
import type { KirbySharedPageData } from './page'
import { sharedQuerySelects } from './page'

export interface KirbyPhotographyData extends KirbySharedPageData {
  subheadline: string
  children: {
    id: string
    title: string
    cover: {
      cropped: { url: string }
      url: string
      alt: string | null
    } | null
  }[]
}

export const photographyQuery: KirbyQuerySchema = {
  query: 'page("photography")',
  select: {
    ...sharedQuerySelects,
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
}
