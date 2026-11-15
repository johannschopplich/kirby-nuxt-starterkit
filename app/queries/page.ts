import type { KirbyQuerySchema } from 'kirby-types'

export interface KirbySharedPageData {
  id: string
  title: string
  intendedTemplate: string
}

export interface KirbyPageData extends KirbySharedPageData {
  text: string
}

export const sharedQuerySelects = {
  id: true,
  title: true,
  intendedTemplate: true,
} satisfies KirbyQuerySchema['select']

export function getPageQuery(pageId: string): KirbyQuerySchema {
  return {
    query: `page("${pageId}")`,
    select: {
      ...sharedQuerySelects,
      text: 'page.text.kirbytext',
    },
  }
}
