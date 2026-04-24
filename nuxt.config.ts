// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxtjs/supabase'
  ],

  runtimeConfig: {
    // Variabel di sini hanya tersedia di SISI SERVER
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,

    public: {
      // Variabel di dalam public tersedia di SISI SERVER & CLIENT
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }
  },

  supabase: {
    redirect: false,
    types: "~/types/database.types.ts",
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'gsap',
        'gsap/ScrollTrigger',
        'gsap/ScrollSmoother',
      ]
    }
  },

  colorMode: {
    classSuffix: '', 
    preference: 'light',
    fallback: 'light',
    storageKey: 'nuxt-color-mode'
  },
})