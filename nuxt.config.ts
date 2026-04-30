// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
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
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,

    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }
  },

  supabase: {
    redirect: false,
    types: resolve(__dirname, './types/database.types.ts'),
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'gsap',
        'gsap/ScrollTrigger',
        'gsap/ScrollSmoother',
        'vue-sonner',
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