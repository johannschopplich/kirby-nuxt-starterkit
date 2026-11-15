export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', 'nuxt-kirby'],

  compatibilityDate: '2026-11-01',

  runtimeConfig: {
    public: {
      siteUrl: 'https://kirby-nuxt-starter.byjohann.dev',
    },
  },

  kirby: {
    auth: 'bearer',
  },

  prerender: {
    routes: ['/'],
  },

  routeRules: {
    '/home': { redirect: { to: '/', statusCode: 302 } },
  },
})
