export default defineNuxtConfig({
  modules: ['nuxt-kirby'],

  compatibilityDate: '2026-11-01',

  css: ['~/assets/css/main.css'],

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
