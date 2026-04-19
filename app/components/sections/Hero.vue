<template>
  <section class="relative min-h-[100dvh] -mt-px pt-24 pb-12 md:pt-32 md:pb-20 px-4 md:px-6 overflow-hidden flex items-center transition-colors duration-700 bg-white dark:bg-[#050505]">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 md:left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>

    <div class="container max-w-7xl mx-auto relative z-10">
      <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <div class="lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left">
          <div class="space-y-4">
            <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Pioneering Digital Future</span>
            </div>

            <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-dark dark:text-white leading-[0.9] tracking-tighter">
              BEYOND <br />
              <span class="text-primary">EXCELLENT.</span>
            </h1>

            <p class="max-w-md mx-auto lg:mx-0 text-base md:text-lg text-dark/60 dark:text-white/50 leading-relaxed italic border-l-4 border-primary pl-6">
              "Digital Excellent menghadirkan simfoni antara teknologi mutakhir dan estetika premium untuk visi bisnis Anda."
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
            <BaseButton 
              variant="dark" 
              size="lg" 
              icon="solar:arrow-right-up-bold"
              class="w-full sm:w-auto shadow-xl shadow-primary/10"
              @click="handleExplore('#portfolio', true)"
            >
              EXPLORE OUR WORKS
            </BaseButton>

            <div class="flex -space-x-3 md:-space-x-4">
              <div v-for="i in 3" :key="i" class="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-white dark:border-[#050505] bg-gray-300 overflow-hidden">
                <img :src="`https://i.pravatar.cc/150?img=${i + 15}`" alt="client" class="w-full h-full object-cover" />
              </div>
              <div class="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-white dark:border-[#050505] bg-primary flex items-center justify-center text-[10px] font-bold text-dark">
                40+
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-6 relative flex justify-center items-center h-[400px] sm:h-[500px] md:h-[600px] mt-10 lg:mt-0">
          <div class="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] aspect-[4/5]">
            <div v-for="(image, index) in heroImages" :key="index"
              class="absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer"
              :style="getCardStyle(index)" @click="activeIndex = index">
              <div class="relative w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-primary/20 shadow-2xl">
                <img :src="image.url" class="w-full h-full object-cover transition-all duration-1000"
                  :class="activeIndex === index ? 'grayscale-0 scale-100' : 'grayscale scale-110 opacity-50'" />
                
                <div class="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent opacity-80"></div>
                
                <div class="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 transition-all duration-700"
                  :class="activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
                  <p class="text-primary font-black text-3xl md:text-5xl tracking-tighter">{{ image.stat }}</p>
                  <p class="text-white/70 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">{{ image.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const isMenuOpen = ref(false);
const router = useRouter();
const route = useRoute();

const activeIndex = ref(0);
const heroImages = [
  { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop', stat: '250+', title: 'Digital Excellence' },
  { url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2340&auto=format&fit=crop', stat: '99%', title: 'Client Satisfaction' },
  { url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2342&auto=format&fit=crop', stat: '12', title: 'Elite Partners' }
];

let timer: any = null;

const nextSlide = () => { 
  activeIndex.value = (activeIndex.value + 1) % heroImages.length; 
};

const handleExplore = async (path: string, isAnchor: boolean) => {
  isMenuOpen.value = false;

  if (isAnchor && path.startsWith('#')) {
    // Jika kita tidak di halaman home, pindah ke home dulu
    if (route.path !== '/') {
      await router.push('/');
      // Tunggu render selesai
      setTimeout(() => {
        scrollToSection(path);
      }, 500);
    } else {
      scrollToSection(path);
    }
  } else {
    router.push(path);
  }
};

const scrollToSection = (id: string) => {
  // Ambil instance GSAP dari window (kita akan set ini di app.vue)
  const smoother = (window as any).smoother;
  if (smoother) {
    smoother.scrollTo(id, true, "top top");
  } else {
    // Fallback jika smoother belum siap
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
};

const getCardStyle = (index: number) => {
  const diff = (index - activeIndex.value + heroImages.length) % heroImages.length;
  
  // Deteksi jika layar kecil untuk mengurangi offset transformasi
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 768;
  const offsetBase = isSmallScreen ? 20 : 40;

  if (diff === 0) {
    return { zIndex: 30, transform: 'translateX(0) translateY(0) scale(1) rotate(0deg)', opacity: 1 };
  }
  if (diff === 1) {
    return { 
      zIndex: 20, 
      transform: `translateX(${offsetBase}px) translateY(${offsetBase/2}px) scale(0.9) rotate(4deg)`, 
      opacity: 0.8 
    };
  }
  return { 
    zIndex: 10, 
    transform: `translateX(${offsetBase * 2}px) translateY(${offsetBase}px) scale(0.8) rotate(8deg)`, 
    opacity: 0.4 
  };
};

onMounted(() => { 
  timer = setInterval(nextSlide, 3500); 
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>