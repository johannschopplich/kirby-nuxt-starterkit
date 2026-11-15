import type {
  KirbyLayout,
  KirbyQueryResponse,
  KirbyQuerySchema,
} from 'kirby-types'
import type { KirbySharedPageData } from './page'
import { sharedQuerySelects } from './page'

export interface KirbyAboutData extends KirbySharedPageData {
  layouts: KirbyLayout[]
  address: string
  email: string
  phone: string
  social: {
    platform: string
    url: string
  }[]
}

export type KirbyAboutResponse = KirbyQueryResponse<KirbyAboutData>

export function getAboutQuery(pageId: string): KirbyQuerySchema {
  return {
    query: `page("${pageId}")`,
    select: {
      ...sharedQuerySelects,
      layouts: 'page.layout.toResolvedLayouts',
      address: 'page.address.kirbytext',
      email: true,
      phone: true,
      social: 'page.social.toStructure',
    },
  }
}
