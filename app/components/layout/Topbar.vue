<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
    <div
      class="container max-w-[1350px] flex items-center justify-between px-8 py-4 border border-primary/10 shadow-2xl bg-soft/80 dark:bg-darkBg/80 backdrop-blur-xl rounded-3xl">
      <div class="flex items-center gap-2 group cursor-pointer">
        <div
          class="w-10 h-10 bg-dark dark:bg-primary rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
          <span class="text-primary dark:text-dark font-black text-xl">D</span>
        </div>
        <div class="flex flex-col leading-none">
          <span class="text-lg font-black tracking-tighter text-dark dark:text-soft">DIGITAL</span>
          <span class="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">Excellent</span>
        </div>
      </div>

      <div class="hidden md:flex items-center gap-10">
        <NuxtLink v-for="item in navLinks" :key="item.name" :to="item.path"
          class="relative text-[11px] font-bold uppercase tracking-[0.2em] text-dark/60 dark:text-soft/60 hover:text-primary dark:hover:text-primary transition-colors group">
          {{ item.name }}
          <span class="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
        </NuxtLink>
      </div>

      <div class="flex items-center gap-5">
        <button @click="toggleColorMode"
          class="relative overflow-hidden p-2.5 rounded-full border border-primary/20 hover:bg-primary/5 transition-colors group"
          aria-label="Toggle Color Mode">
          <svg v-if="colorMode.value === 'dark'" xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-primary group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>

          <svg v-else xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-primary group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <BaseButton variant="primary" size="md" rounded="md" icon="solar:map-arrow-square-bold"
          class="hidden lg:flex shadow-lg shadow-primary/20" @click="handleStartProject">
          Start Project
        </BaseButton>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
// Nuxt auto-imports BaseButton if it's in components/base/

const colorMode = useColorMode();
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Expertise', path: '#services' },
  { name: 'Case Studies', path: '#portfolio' },
  { name: 'Our Story', path: '#about' }
];

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

const handleStartProject = () => {
  console.log('Opening project inquiry modal...');
};
</script>