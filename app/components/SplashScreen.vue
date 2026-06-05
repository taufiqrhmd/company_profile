<template>
  <div v-if="isVisible" ref="splashRef"
    class="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-neutral-950 text-white select-none">
    <div ref="contentRef" class="flex flex-col items-center text-center px-6 opacity-0">

      <span class="text-[12px] tracking-[0.4em] text-neutral-500 uppercase mb-3 font-medium">
        Welcome to
      </span>

      <div class="overflow-hidden mb-6">
        <h1 ref="titleRef"
          class="text-2xl md:text-4xl font-light tracking-[0.25em] text-neutral-100 uppercase leading-none">
          Digital <span class="font-medium text-amber-400/90">Excellent</span>
        </h1>
      </div>

      <div class="w-40 h-[2px] bg-neutral-800/60 relative overflow-hidden">
        <div ref="progressRef" class="absolute left-0 top-0 w-0 h-full bg-gradient-to-r from-amber-500 to-amber-300">
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits(['loaded'])
const isVisible = ref(true)

const splashRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const progressRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!import.meta.client) return

  // Timeline Utama dengan easing yang sangat smooth (Custom Power4/Expo)
  const tl = gsap.timeline({
    onComplete: () => {
      isVisible.value = false
      emit('loaded')
    }
  })

  // Set initial state untuk animasi masuk (Y sedikit turun & blur)
  gsap.set(titleRef.value, { y: 30, filter: 'blur(5px)' })

  // 1. Konten muncul secara halus (Fade In & Unblur)
  tl.to(contentRef.value, {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out'
  })

    // 2. Teks naik ke atas dengan efek unblur (Cinematic Reveal)
    .to(titleRef.value, {
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'expo.out'
    }, '-=0.3')

    // 3. Progress bar berjalan tipis & elegan
    .to(progressRef.value, {
      width: '100%',
      duration: 1.8,
      ease: 'power3.inOut'
    }, '-=0.8')

    // 4. Efek Keluar Premium: Konten mengecil + Splash memudar (Fade Out)
    .to(contentRef.value, {
      scale: 1.05,
      filter: 'blur(4px)',
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut'
    }, '+=0.3')

    .to(splashRef.value, {
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut'
    }, '-=0.4')
})
</script>
