<template>
  <div :class="isAdminPage ? 'admin-mode' : 'landing-mode'">
    <template v-if="isAdminPage">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </template>

    <template v-else>
      <ClientOnly>
        <LayoutTopbar />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <NuxtLayout>
              <NuxtPage />
            </NuxtLayout>
          </div>
        </div>
      </ClientOnly>
    </template>
  </div>
</template>

<script setup>
import { nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

const smoother = ref(null)
const route = useRoute()
const isAdminPage = computed(() => route.path.startsWith('/admin'))

if (process.client) {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
}

useHead({
  bodyAttrs: {
    class: computed(() => isAdminPage.value ? 'admin-mode' : 'landing-mode')
  }
})

useSeoMeta({
  titleTemplate: (title) => title ? `${title} | Digital Excellent` : 'Digital Excellent Studio - Premium Web Engineer',
  ogTitle: 'Digital Excellent Studio',
  description: 'Freelance fullstack developer & frontend engineer spesialisasi Vue, Nuxt, dan High-Fidelity UI/UX.',
  ogDescription: 'Premium Web Development & Interactive Design Studio.',
  ogImage: '/og-image.jpg', // Pastikan file ini ada di folder public
  twitterCard: 'summary_large_image',
})

onMounted(async () => {
  if (process.client && !isAdminPage.value) {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    await nextTick()
    
    setTimeout(() => {
      try {
        smoother.value = ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 1.5,
          effects: true,
          normalizeScroll: true
        })
        ScrollTrigger.refresh()
      } catch (e) {
        console.error("GSAP Init Error:", e)
      }
    }, 200)
  }
})

onUnmounted(() => {
  if (smoother.value) {
    smoother.value.kill()
  }
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  min-height: 100%;
}

body.landing-mode {
  overflow: hidden !important;
}

body.admin-mode {
  overflow: auto !important;
  height: auto !important;
}

#smooth-wrapper {
  overflow: hidden;
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
}

#smooth-content {
  width: 100%;
  position: relative;
  overflow: visible;
}
</style>