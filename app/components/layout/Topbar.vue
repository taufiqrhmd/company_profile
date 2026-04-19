<template>
  <nav class="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 md:p-6">

    <div
      class="container max-w-[1350px] flex items-center justify-between px-6 md:px-8 py-3 md:py-4 border border-primary/10 shadow-2xl bg-soft/80 dark:bg-darkBg/80 backdrop-blur-xl rounded-2xl md:rounded-3xl relative z-[150]">
      <div @click="handleNav('/', false)" class="flex items-center gap-2 group cursor-pointer">
        <div
          class="w-9 h-9 md:w-10 md:h-10 bg-dark dark:bg-primary rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
          <span class="text-primary dark:text-dark font-black text-lg md:text-xl">D</span>
        </div>
        <div class="flex flex-col leading-none">
          <span class="text-base md:text-lg font-black tracking-tighter text-dark dark:text-soft">DIGITAL</span>
          <span class="text-[8px] md:text-[10px] font-bold tracking-[0.3em] text-primary uppercase">Excellent</span>
        </div>
      </div>

      <div class="hidden md:flex items-center gap-8 lg:gap-10">
        <button v-for="item in navLinks" :key="item.name" @click="handleNav(item.path, true)"
          class="relative text-[11px] font-bold uppercase tracking-[0.2em] text-dark/60 dark:text-soft/60 hover:text-primary transition-colors group">
          {{ item.name }}
          <span class="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
        </button>
      </div>

      <div class="flex items-center gap-3 md:gap-5">
        <button @click="toggleColorMode"
          class="flex items-center justify-center transition-colors border rounded-full w-8 h-8 md:w-10 md:h-10 border-primary/20 hover:bg-primary/5 text-primary">
          <Icon v-if="colorMode.value === 'dark'" name="heroicons:sun-20-solid" class="w-4 h-4 md:w-5 md:h-5" />
          <Icon v-else name="heroicons:moon-20-solid" class="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <BaseButton variant="primary" size="md" rounded="md" icon="solar:magic-stick-3-bold"
          class="hidden lg:flex shadow-lg shadow-primary/20" @click="handleNav('#contact', true)">
          Get In Touch
        </BaseButton>

        <button @click.stop="isMenuOpen = !isMenuOpen"
          class="md:hidden relative p-2 flex items-center justify-center w-10 h-10" aria-label="Toggle Menu">
          <div class="w-6 h-4 flex flex-col justify-between items-end">
            <span class="h-0.5 bg-primary transition-all duration-300 ease-in-out"
              :class="isMenuOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'"></span>

            <span class="h-0.5 bg-primary transition-all duration-300 ease-in-out"
              :class="isMenuOpen ? 'opacity-0 w-0' : 'w-4'"></span>

            <span class="h-0.5 bg-primary transition-all duration-300 ease-in-out"
              :class="isMenuOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-5'"></span>
          </div>
        </button>
      </div>
    </div>

    <Transition enter-active-class="transition duration-500 ease-out" enter-from-class="opacity-0 -translate-y-full"
      enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-400 ease-in"
      leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-full">
      <div v-if="isMenuOpen"
        class="fixed inset-0 z-[90] md:hidden bg-soft dark:bg-darkBg px-8 pt-40 pb-12 flex flex-col justify-between">
        <div class="flex flex-col gap-6">
          <button v-for="(item, index) in navLinks" :key="item.name" @click="handleNav(item.path, true)"
            class="text-left text-5xl font-black uppercase tracking-tighter text-dark dark:text-soft hover:text-primary transition-colors"
            :style="{ transitionDelay: `${index * 50}ms` }">
            {{ item.name }}
          </button>
        </div>
        <div class="w-full">
          <BaseButton variant="primary" size="xl" icon="solar:magic-stick-3-bold" class="w-full"
            @click="handleNav('#contact', true)">
            Get In Touch
          </BaseButton>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const isMenuOpen = ref(false);
const colorMode = useColorMode();
const router = useRouter();
const route = useRoute();

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Expertise', path: '#services' },
  { name: 'Case Studies', path: '#portfolio' },
  { name: 'Our Story', path: '#about' }
];

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

const handleNav = async (path: string, isAnchor: boolean) => {
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
</script>