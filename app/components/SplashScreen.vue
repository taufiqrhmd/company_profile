<!-- components/SplashScreen.vue -->
<template>
  <div 
    v-if="isVisible" 
    ref="splashRef" 
    class="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-neutral-950 text-white"
  >
    <!-- Ganti dengan Logo / Animasi Anda -->
    <div class="overflow-hidden mb-4">
      <h1 ref="titleRef" class="text-3xl font-bold tracking-wider translate-y-[100%]">
        DIGITAL EXCELLENT
      </h1>
    </div>
    <div class="w-32 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
      <div ref="progressRef" class="w-0 h-full bg-primary"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits(['loaded'])
const isVisible = ref(true)
const splashRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const progressRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!import.meta.client) return

  const tl = gsap.timeline({
    onComplete: () => {
      isVisible.value = false
      emit('loaded') // Beritahu app.vue bahwa splash screen selesai
    }
  })

  // 1. Animasi teks muncul & progress bar jalan
  tl.to(titleRef.value, { y: 0, duration: 0.8, ease: 'power3.out' })
    .to(progressRef.value, { width: '100%', duration: 1.5, ease: 'power2.inOut' }, '-=0.5')
    
  // 2. Animasi Splash Screen keluar (Slide up / Fade out)
  tl.to(splashRef.value, {
    yPercent: -100, // Geser ke atas
    duration: 0.8,
    ease: 'power4.inOut'
  })
})
</script>