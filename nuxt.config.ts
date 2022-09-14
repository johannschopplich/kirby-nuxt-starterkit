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
    // Recommended: type check on build
    // typeCheck: 'build',
    shim: false,
  },
})
