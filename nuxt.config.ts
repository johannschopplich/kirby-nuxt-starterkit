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

  hooks: {
    // @ts-expect-error: workaround will be removed in the future
    'vite:extendConfig'(config, { isServer }) {
      if (isServer) {
        // Workaround for Netlify issue
        // https://github.com/nuxt/framework/issues/6204
        config.build.rollupOptions.output.inlineDynamicImports = true
      }
    },
  },

  typescript: {
    strict: true,
    typeCheck: 'build',
    shim: false,
  },
})
