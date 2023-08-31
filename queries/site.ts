import type { KirbyQuerySchema } from '#nuxt-kql'

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
