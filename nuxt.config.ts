import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', 'nuxt-kql'],

  kql: {
    prefix: 'api/kql',
    auth: 'bearer',
  },

  typescript: {
    shim: false,
  },
})
