<template>
  <section class="relative min-h-screen -mt-px pt-32 pb-20 px-6 overflow-hidden flex items-center transition-colors duration-700 bg-white dark:bg-[#050505]">
    <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="container max-w-7xl mx-auto relative z-10">
      <div class="grid lg:grid-cols-12 gap-16 items-center">
        <div class="lg:col-span-6 space-y-8">
          <div class="space-y-4">
            <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span class="text-[10px] font-black uppercase tracking-widest text-primary">Pioneering Digital Future</span>
            </div>

            <h1 class="text-6xl md:text-8xl font-black text-dark dark:text-white leading-[0.9] tracking-tighter">
              BEYOND <br />
              <span class="text-primary">EXCELLENT.</span>
            </h1>

            <p class="max-w-md text-lg text-dark/60 dark:text-white/50 leading-relaxed italic border-l-4 border-primary pl-6">
              "Digital Excellent menghadirkan simfoni antara teknologi mutakhir dan estetika premium untuk visi bisnis Anda."
            </p>
          </div>

          <div class="flex flex-wrap gap-4 pt-4">
            <BaseButton 
              variant="dark" 
              size="lg" 
              icon="solar:arrow-right-up-bold"
              class="shadow-xl shadow-primary/10"
              @click="handleExplore"
            >
              EXPLORE OUR WORKS
            </BaseButton>

            <div class="flex -space-x-4">
              <div v-for="i in 3" :key="i" class="w-12 h-12 rounded-full border-4 border-white dark:border-[#050505] bg-gray-300 overflow-hidden">
                <img :src="`https://i.pravatar.cc/150?img=${i + 15}`" alt="client" />
              </div>
              <div class="w-12 h-12 rounded-full border-4 border-white dark:border-[#050505] bg-primary flex items-center justify-center text-[10px] font-bold text-dark">
                40+
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-6 relative flex justify-center items-center h-[550px]">
          <div class="relative w-full max-w-[420px] aspect-[4/5]">
            <div v-for="(image, index) in heroImages" :key="index"
              class="absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer"
              :style="getCardStyle(index)" @click="activeIndex = index">
              <div class="relative w-full h-full rounded-[3rem] overflow-hidden border border-primary/20 shadow-2xl">
                <img :src="image.url" class="w-full h-full object-cover transition-all duration-1000"
                  :class="activeIndex === index ? 'grayscale-0 scale-100' : 'grayscale scale-110 opacity-50'" />
                <div class="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent opacity-80"></div>
                <div class="absolute bottom-10 left-10 right-10 transition-all duration-700"
                  :class="activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
                  <p class="text-primary font-black text-5xl tracking-tighter">{{ image.stat }}</p>
                  <p class="text-white/70 text-[10px] uppercase tracking-[0.3em] font-bold">{{ image.title }}</p>
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
import { ref, onMounted } from 'vue';

const activeIndex = ref(0);
const heroImages = [
  { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop', stat: '250+', title: 'Digital Excellence' },
  { url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2340&auto=format&fit=crop', stat: '99%', title: 'Client Satisfaction' },
  { url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2342&auto=format&fit=crop', stat: '12', title: 'Elite Partners' }
];

const nextSlide = () => { activeIndex.value = (activeIndex.value + 1) % heroImages.length; };

const handleExplore = () => {
  console.log('Navigating to portfolio...');
};

const getCardStyle = (index: number) => {
  const diff = (index - activeIndex.value + heroImages.length) % heroImages.length;
  if (diff === 0) return { zIndex: 30, transform: 'translateX(0) translateY(0) scale(1) rotate(0deg)', opacity: 1 };
  if (diff === 1) return { zIndex: 20, transform: 'translateX(40px) translateY(20px) scale(0.9) rotate(4deg)', opacity: 0.6 };
  return { zIndex: 10, transform: 'translateX(80px) translateY(40px) scale(0.8) rotate(8deg)', opacity: 0.3 };
};

onMounted(() => { setInterval(nextSlide, 3500); });
</script>