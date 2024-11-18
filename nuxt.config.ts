import { siteQuery } from './queries'

export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', 'nuxt-kql'],

  compatibilityDate: '2024-04-03',

  runtimeConfig: {
    public: {
      siteUrl: 'https://kirby-nuxt-starter.pages.dev',
    },
  },

  kql: {
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
