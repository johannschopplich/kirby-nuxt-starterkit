import { siteQuery } from './shared/queries'

export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', 'nuxt-kirby'],

  compatibilityDate: '2025-01-01',

  runtimeConfig: {
    public: {
      siteUrl: 'https://kirby-nuxt-starter.pages.dev',
    },
  },

  kirby: {
    auth: 'bearer',
    prefetch: {
      // Currently only used to infer the type of the `site` query
      kirbySite: siteQuery,
    },
  },

  nitro: {
    prerender: {
      // Prerender the index page
      routes: ['/'],
    },
  },
})
