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

// Daftarkan Plugin
if (process.client) {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
}

useHead({
  bodyAttrs: {
    class: computed(() => isAdminPage.value ? 'admin-mode' : 'landing-mode')
  }
})

onMounted(async () => {
  if (process.client && !isAdminPage.value) {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    await nextTick()
    
    // Delay sedikit lebih lama (200ms) untuk memastikan layout & page selesai render
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
/* Reset Global */
html, body {
  margin: 0;
  padding: 0;
  min-height: 100%;
}

/* Landing Mode: Kunci body agar GSAP yang pegang kendali */
body.landing-mode {
  overflow: hidden !important;
}

/* Admin Mode: Lepaskan semua kuncian */
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