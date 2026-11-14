import type { KirbyQueryResponse, KirbyQuerySchema } from 'kirby-types'

export interface KirbySiteData {
  title: string
  description: string
  children: {
    id: string
    title: string
    isListed: boolean
  }[]
}

export type KirbySiteResponse = KirbyQueryResponse<KirbySiteData>

export const siteQuery: KirbyQuerySchema = {
  query: 'site',
  select: {
    title: true,
    description: true,
    children: {
      query: 'site.children',
      select: ['id', 'title', 'isListed'],
    },
  },
}
