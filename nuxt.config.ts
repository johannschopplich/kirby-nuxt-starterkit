export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', 'nuxt-kql'],

  runtimeConfig: {
    public: {
      siteUrl: '',
    },
  },

  kql: {
    prefix: 'api/kql',
    auth: 'bearer',
  },

  typescript: {
    strict: true,
    // Recommended: type check in dev and on build
    // typeCheck: true,
    shim: false,
  },
})
