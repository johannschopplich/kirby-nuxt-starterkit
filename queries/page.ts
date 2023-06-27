import type { KirbyQueryResponse, KirbyQuerySchema } from 'kirby-fest'

export interface KirbyPageData {
  id: string
  title: string
  intendedTemplate: string
  // description: string
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
      // description: true,
      text: 'page.text.kirbytext',
    },
  }
}
