<template>
  <section
    class="relative min-h-[100dvh] pt-24 pb-12 md:pt-32 md:pb-16 px-4 md:px-6 overflow-hidden flex flex-col justify-between transition-colors duration-700 bg-white dark:bg-[#050505]">
    
    <!-- BACKGROUND EFFECT (AURORA ENGINE) -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div
        class="aurora-bg-engine absolute -inset-[10px] opacity-40 dark:opacity-40 filter blur-[60px] invert dark:invert-0 will-change-transform">
      </div>
    </div>
    
    <!-- MAIN HERO CONTENT -->
    <div class="container max-w-7xl mx-auto relative z-10 my-auto w-full">
      <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        <!-- LEFT COLUMN: COPYWRITING & CTA -->
        <div class="lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left">
          <div class="space-y-4">

            <!-- Badge Atas -->
            <div
              class="reveal-up inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span class="text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                SOFTWARE & DIGITAL DEVELOPMENT STUDIO
              </span>
            </div>

            <!-- Headline -->
            <h1
              class="reveal-up text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-black text-slate-900 dark:text-white leading-[1.05] tracking-tighter"
              style="--delay: 100ms">
              BUILDING SCALABLE <br />
              <span class="text-primary tracking-tight">DIGITAL INNOVATION.</span>
            </h1>

            <!-- Sub-headline -->
            <p class="reveal-left max-w-xl mx-auto lg:mx-0 text-sm md:text-base text-slate-400 dark:text-neutral-400 leading-relaxed border-l-2 border-primary/70 pl-4 text-left"
              style="--delay: 200ms">
              We transform your business vision into high-performance digital products through software development, web systems, and custom applications.
            </p>
          </div>

          <!-- AREA CTA & SOCIAL PROOF -->
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-2">
            
            <div class="reveal-up w-full sm:w-auto" style="--delay: 300ms">
              <BaseButton variant="dark" size="lg" icon="solar:arrow-right-up-bold"
                class="w-full sm:w-auto bg-primary text-slate-950 font-bold hover:bg-primary/90 shadow-lg shadow-primary/10"
                @click="handleExplore('#portfolio', true)">
                See Our Work
              </BaseButton>
            </div>

            <div class="reveal-right flex items-center gap-3" style="--delay: 400ms">
              <div class="flex -space-x-3 md:-space-x-4">
                <div v-for="i in 3" :key="i"
                  class="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-slate-50 dark:border-[#050505] bg-slate-200 overflow-hidden shadow-sm">
                  <img :src="`https://i.pravatar.cc/150?img=${i + 15}`" alt="client" class="w-full h-full object-cover" />
                </div>
                <div
                  class="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-slate-50 dark:border-[#050505] bg-neutral-800 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
                  40+
                </div>
              </div>
              <div class="text-left">
                <p class="text-[11px] font-bold text-slate-800 dark:text-white leading-none">Trusted by Founders</p>
                <p class="text-[9px] text-slate-500 dark:text-neutral-500 mt-0.5">National Scale</p>
              </div>
            </div>

          </div>
        </div>

        <!-- RIGHT COLUMN: INTERACTIVE INTERFACES CARDS -->
        <div
          class="reveal-right lg:col-span-6 relative flex justify-center items-center h-[400px] sm:h-[500px] md:h-[600px] mt-10 lg:mt-0"
          style="--delay: 500ms">
          <div class="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] aspect-[4/5]">

            <div v-for="(image, index) in heroImages" :key="index"
              class="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer"
              :class="[
                activeIndex === index ? 'z-30 translate-x-0 translate-y-0 scale-100 rotate-0 opacity-100' : '',
                (activeIndex + 1) % heroImages.length === index ? 'z-20 translate-x-6 md:translate-x-10 translate-y-3 md:translate-y-5 scale-95 rotate-2 opacity-80' : '',
                (activeIndex + 2) % heroImages.length === index ? 'z-10 translate-x-12 md:translate-x-20 translate-y-6 md:translate-y-10 scale-90 rotate-4 opacity-40' : ''
              ]" @click="activeIndex = index">

              <div
                class="relative w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-200/80 dark:border-neutral-800 shadow-2xl transition-all duration-500">
                <img :src="image.url" class="w-full h-full object-cover transition-transform duration-700"
                  :class="activeIndex === index ? 'grayscale-0 scale-100' : 'grayscale opacity-40 dark:opacity-30'" />

                <div
                  class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90">
                </div>

                <div
                  class="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 transition-all duration-500"
                  :class="activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
                  <p class="text-primary font-black text-3xl md:text-5xl tracking-tighter mb-0.5">{{ image.stat }}</p>
                  <p class="text-white/60 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">{{ image.title }}</p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>

    <!-- INTEGRATED TRUSTED PARTNERS (Diletakkan di bagian bawah Hero) -->
    <div class="container max-w-7xl mx-auto relative z-10 w-full pt-12 mt-auto">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div class="shrink-0">
          <p class="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-neutral-500 text-center sm:text-left">
            Trusted by teams at
          </p>
        </div>

        <div class="flex flex-wrap items-center justify-center sm:justify-end gap-8 md:gap-12 opacity-80">
          <!-- Amazon -->
          <div class="logo-wrapper h-5 md:h-6 cursor-pointer transition-all duration-500 hover:-translate-y-0.5">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" class="h-full object-contain logo-img" />
          </div>
          <!-- Google -->
          <div class="logo-wrapper h-5 md:h-6 cursor-pointer transition-all duration-500 hover:-translate-y-0.5">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" class="h-full object-contain logo-img" />
          </div>
          <!-- Netflix -->
          <div class="logo-wrapper h-4 md:h-5 cursor-pointer transition-all duration-500 hover:-translate-y-0.5">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" class="h-full object-contain logo-img" />
          </div>
          <!-- Slack -->
          <div class="logo-wrapper h-5 md:h-6 cursor-pointer transition-all duration-500 hover:-translate-y-0.5">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" alt="Slack" class="h-full object-contain logo-img" />
          </div>
        </div>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const activeIndex = ref(0);

const heroImages = [
  { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop', stat: '99.4%', title: 'Uptime & System Reliability' },
  { url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2340&auto=format&fit=crop', stat: '45+', title: 'Custom Systems Deployed' },
  { url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2342&auto=format&fit=crop', stat: '3x', title: 'Faster Business Efficiency' }
];

let timer: any = null;

onMounted(() => {
  timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % heroImages.length;
  }, 4500);

  if (import.meta.client) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // 🌟 Perbaikan Glitch: Stop observe setelah aktif
        }
      });
    }, { 
      threshold: 0.01,
      rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
  }
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const handleExplore = async (path: string, isAnchor: boolean) => {
  if (isAnchor && path.startsWith('#')) {
    if (route.path !== '/') {
      await router.push('/');
      setTimeout(() => scrollToSection(path), 500);
    } else {
      scrollToSection(path);
    }
  } else {
    router.push(path);
  }
};

const scrollToSection = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped>
/* Transisi Animasi Dasar */
.reveal-up, .reveal-left, .reveal-right {
  opacity: 0;
  transition: all 1s cubic-bezier(0.25, 1, 0.5, 1);
  transition-delay: var(--delay, 0ms);
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.reveal-up { transform: translateY(30px); }
.reveal-left { transform: translateX(-20px); }
.reveal-right { transform: translateX(20px); }
.active.reveal-up, .active.reveal-left, .active.reveal-right {
  opacity: 1;
  transform: translate(0, 0);
}

/* Aurora Effect */
.aurora-bg-engine {
  --base-white: repeating-linear-gradient(100deg, #ffffff 0%, #ffffff 7%, transparent 10%, transparent 12%, #ffffff 16%);
  --base-dark: repeating-linear-gradient(100deg, #000000 0%, #000000 7%, transparent 10%, transparent 12%, #000000 16%);
  --aurora-gradient: repeating-linear-gradient(100deg, #93c5fd 10%, #c7d2fe 15%, #99f6e4 20%, #e9d5ff 25%, #bae6fd 30%);
  background-image: var(--base-white), var(--aurora-gradient);
  background-size: 300%, 200%;
  background-position: 50% 50%, 50% 50%;
  mask-image: radial-gradient(ellipse at 50% 50%, #000000 10%, transparent 90%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 50%, #000000 10%, transparent 90%);
}
:deep(.dark) .aurora-bg-engine, .dark .aurora-bg-engine {
  background-image: var(--base-dark), var(--aurora-gradient);
  --aurora-gradient: repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, #7dd3fc 20%, #ddd6fe 25%, #60a5fa 30%);
}
.aurora-bg-engine::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--base-white), var(--aurora-gradient);
  background-size: 200%, 100%;
  background-attachment: fixed;
  mix-blend-mode: difference;
  animation: move-aurora 40s linear infinite;
}
:deep(.dark) .aurora-bg-engine::after, .dark .aurora-bg-engine::after { background-image: var(--base-dark), var(--aurora-gradient); }
@keyframes move-aurora {
  from { background-position: 50% 50%, 50% 50%; }
  to { background-position: 350% 50%, 350% 50%; }
}

/* ================= LOGO FILTERS (LIGHT & DARK ACCURACY) ================= */
.logo-img {
  filter: brightness(0);
  opacity: 0.3;
  transition: all 0.5s ease;
}
.logo-wrapper:hover .logo-img {
  opacity: 1;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.05));
}
:deep(.dark) .logo-img, .dark .logo-img {
  filter: brightness(0) invert(1);
  opacity: 0.25;
}
:deep(.dark) .logo-wrapper:hover .logo-img, .dark .logo-wrapper:hover .logo-img {
  filter: brightness(0) invert(1) drop-shadow(0 0 8px rgba(255, 255, 255, 0.1));
  opacity: 0.9;
}
</style>