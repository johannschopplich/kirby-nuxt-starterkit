import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', 'nuxt-kql'],

  runtimeConfig: {
    public: {
      baseUrl: '',
    },
  },

  kql: {
    prefix: 'api/kql',
    auth: 'bearer',
  },

  typescript: {
    shim: false,
  },
})
