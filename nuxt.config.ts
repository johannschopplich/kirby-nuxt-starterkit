import { defineNuxtConfig } from 'nuxt'

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
    typeCheck: 'build',
    shim: false,
  },
})
