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
  },

  prerender: {
    routes: ['/'],
  },
})
