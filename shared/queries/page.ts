import type { KirbyQueryResponse, KirbyQuerySchema } from 'kirby-types'

export interface KirbyPageData {
  id: string
  title: string
  intendedTemplate: string
  text: string
}

export type KirbyPageResponse = KirbyQueryResponse<KirbyPageData>

export function getPageQuery(pageId: string): KirbyQuerySchema {
  return {
    query: `page("${pageId}")`,
    select: {
      id: true,
      title: true,
      intendedTemplate: true,
      text: 'page.text.kirbytext',
    },
  }
}
