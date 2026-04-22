<template>
  <div :class="isAdminPage ? 'admin-mode' : 'landing-mode'">
    <template v-if="isAdminPage">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </template>

    <template v-else>
      <ClientOnly>
        <LayoutTopbar v-if="!route.meta.hideTopbar" />
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

<script lang="ts" setup>
import { nextTick, ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

// Tipe data untuk ScrollSmoother agar TS tidak komplain
const smoother = ref < ScrollSmoother | null > (null)
const route = useRoute()
const isAdminPage = computed(() => route.path.startsWith('/admin'))

// Register plugin hanya sekali di level client
if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
}

useHead({
  bodyAttrs: {
    class: computed(() => isAdminPage.value ? 'admin-mode' : 'landing-mode')
  }
});

useSeoMeta({
  titleTemplate: (title) => title ? `${title} | Digital Excellent` : 'Digital Excellent Studio - Premium Web Engineer',
  ogTitle: 'Digital Excellent Studio',
  description: 'Freelance fullstack developer & frontend engineer spesialisasi Vue, Nuxt, dan High-Fidelity UI/UX.',
  ogDescription: 'Premium Web Development & Interactive Design Studio.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
});

// Fungsi inisialisasi Smoother agar bisa dipanggil berulang
const initSmoother = () => {
  if (!import.meta.client || isAdminPage.value) return

  // Kill smoother lama jika ada sebelum membuat yang baru
  if (smoother.value) {
    smoother.value.kill()
  }

  try {
    smoother.value = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      effects: true,
      normalizeScroll: { allowNestedScroll: true } // Lebih aman untuk elemen modal/scrollable
    })

      // Masukkan ke window untuk akses global (gunakan type casting)
      ; (window as any).smoother = smoother.value
    ScrollTrigger.refresh()
  } catch (e) {
    console.error("GSAP Init Error:", e)
  }
}

// Watcher untuk handle route change
watch(() => route.fullPath, async () => {
  if (!import.meta.client) return

  // 1. Jika pindah ke admin, matikan smoother
  if (isAdminPage.value) {
    if (smoother.value) {
      smoother.value.kill()
      smoother.value = null
        ; (window as any).smoother = null
    }
    return
  }

  // 2. Reset scroll posisi
  if (smoother.value) {
    smoother.value.scrollTop(0)
  } else {
    window.scrollTo(0, 0)
  }

  // 3. Re-init atau refresh setelah DOM update
  await nextTick()

  // Jika smoother belum ada (misal balik dari admin ke landing)
  if (!smoother.value && !isAdminPage.value) {
    initSmoother()
  } else if (smoother.value) {
    // Jika sudah ada, cukup refresh perhitungan tinggi content
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
  }
})

onMounted(async () => {
  if (import.meta.client) {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    await nextTick()
    // Beri jeda sedikit lebih lama di awal untuk memastikan layout selesai
    setTimeout(() => {
      initSmoother()
    }, 300)
  }
})

onUnmounted(() => {
  if (smoother.value) {
    smoother.value.kill()
      ; (window as any).smoother = null
  }
})
</script>

<style>
html,
body {
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