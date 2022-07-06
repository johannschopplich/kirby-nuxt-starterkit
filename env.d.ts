declare module '@nuxt/schema' {
  interface RuntimeConfig {
    public: {
      baseUrl: string
    }
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
  }
}

// Ensure to import/export something when augmenting a type
export {}
