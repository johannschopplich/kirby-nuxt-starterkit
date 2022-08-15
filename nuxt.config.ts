import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', 'nuxt-kql'],

  runtimeConfig: {
    public: {
      deployUrl: '',
    },
  },

  kql: {
    prefix: 'api/kql',
    auth: 'bearer',
  },

  typescript: {
    strict: true,
    // typeCheck: true,
    shim: false,
  },
})
