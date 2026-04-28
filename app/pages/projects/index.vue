<template>
  <main class="min-h-screen bg-soft dark:bg-[#050505] transition-colors duration-700 relative overflow-hidden">

    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style="background-image: linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px); background-size: 100px 100px;">
      </div>
      <div class="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]"></div>
      <div class="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
    </div>

    <div class="container max-w-7xl mx-auto px-4 relative z-10 pt-16 pb-40">

      <header class="mb-32 md:mb-36">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
          <div class="inline-flex items-center gap-4 group">
            <div class="relative flex items-center">
              <span class="w-12 h-[2px] bg-primary rounded-full relative z-10"></span>
              <span
                class="absolute inset-0 w-12 h-[2px] bg-primary blur-[4px] opacity-0 group-hover:opacity-100 dark:opacity-40 transition-opacity duration-700"></span>
            </div>
            <span
              class="text-[10px] font-black uppercase tracking-[0.6em] text-primary/80 dark:text-primary transition-colors duration-700">
              The Complete Archive
            </span>
          </div>

          <div class="flex items-center gap-4 self-start md:self-center">
            <button @click="toggleColorMode"
              class="relative flex items-center gap-2 p-1.5 pr-4 bg-white dark:bg-soft/5 border border-dark/5 dark:border-soft/10 rounded-full shadow-sm hover:shadow-md transition-all duration-500 group"
              aria-label="Toggle Theme">
              <div
                class="w-8 h-8 rounded-full bg-dark dark:bg-primary flex items-center justify-center text-primary dark:text-dark transition-all duration-500 group-hover:rotate-45">
                <Icon v-if="colorMode.value === 'dark'" name="heroicons:sun-20-solid" class="w-4 h-4" />
                <Icon v-else name="heroicons:moon-20-solid" class="w-4 h-4" />
              </div>

              <span class="text-[10px] font-black uppercase tracking-widest text-dark/60 dark:text-soft/60">
                {{ colorMode.value === 'dark' ? 'Light mode' : 'Dark mode' }}
              </span>
            </button>
          </div>
        </div>
        <h1 class="text-6xl md:text-9xl font-black text-dark dark:text-soft tracking-tighter uppercase leading-[0.85]">
          Full Story<br />
          <span class="text-transparent custom-stroke">Behind Results.</span>
        </h1>
        <p
          class="mt-10 text-dark/40 dark:text-soft/40 max-w-xl text-sm md:text-base leading-relaxed italic border-l-2 border-primary pl-6">
          Kami percaya setiap pixel memiliki cerita dan setiap baris kode memiliki tujuan.
          Berikut adalah dokumentasi lengkap dari visi yang kami wujudkan menjadi solusi digital.
        </p>
      </header>

      <div class="space-y-32 md:space-y-40">
        <section v-for="(project, index) in allProjects" :key="project.title"
          class="flex flex-col gap-16 md:gap-24 items-start md:items-center"
          :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'">
          <div class="w-full md:w-[55%]">
            <div class="relative group">
              <div class="absolute -inset-4 border border-primary/20 dark:border-primary/10 rounded-[3rem] 
             translate-x-2 translate-y-2 -z-10 
             group-hover:translate-x-0 group-hover:translate-y-0 
             group-hover:bg-primary/[0.02] transition-all duration-700">
              </div>

              <div
                class="relative overflow-hidden rounded-[2.5rem] bg-dark dark:bg-[#111] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]">

                <div class="absolute inset-0 bg-gradient-to-tr from-dark/20 to-transparent z-10 pointer-events-none">
                </div>

                <img :src="project.image" :alt="project.title" class="w-full aspect-[16/10] object-cover opacity-90 dark:opacity-80 
               group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out" loading="lazy" />

                <div
                  class="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20
               px-6 py-4 rounded-2xl
               bg-white/10 dark:bg-dark/40 backdrop-blur-xl 
               border border-white/20 dark:border-white/10
               shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]
               transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">

                  <div class="flex flex-col">
                    <p class="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-1">
                      Success Metric
                    </p>
                    <div class="flex items-baseline gap-1">
                      <span class="text-2xl md:text-3xl font-black text-white leading-none">
                        {{ project.impact }}
                      </span>
                      <span class="text-xs font-bold text-primary italic uppercase">Increase</span>
                    </div>
                  </div>
                </div>

                <div
                  class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none
                  bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%]">
                </div>
              </div>
            </div>
          </div>

          <div class="w-full md:w-[60%] space-y-10">
            <div class="space-y-4">
              <div class="flex items-center gap-4 text-primary font-mono font-black italic text-2xl">
                <span>0{{ index + 1 }}.</span>
                <span class="h-px flex-1 bg-primary/20"></span>
              </div>
              <h2
                class="text-5xl md:text-7xl font-black text-dark dark:text-soft tracking-tighter leading-none uppercase">
                {{ project.title }}
              </h2>
              <p
                class="text-[10px] font-black uppercase tracking-[0.4em] text-primary bg-primary/5 inline-block px-3 py-1 rounded">
                {{ project.project_details?.category || 'General Project' }}
              </p>
            </div>

            <div class="space-y-4">
              <p class="text-xl md:text-2xl text-dark/80 dark:text-soft/70 leading-snug font-bold tracking-tight">
                {{ project.project_details?.description }}
              </p>

              <div class="prose prose-sm dark:prose-invert text-dark/70 dark:text-soft/50 space-y-2">
                <p>
                  {{ project.project_details?.full_story_1 }}
                </p>
                <p>
                  {{ project.project_details?.full_story_2 }}
                </p>
              </div>
            </div>

            <div class="pt-6 border-t border-dark/30 dark:border-soft/30">
              <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-dark/40 dark:text-soft/40 mb-5">Tech
                Stack & Tools</h4>
              <div class="flex flex-wrap gap-3">
                <span v-for="tech in project.project_details?.tech_stack" :key="tech"
                  class="px-5 py-2 bg-white dark:bg-soft/5 border border-dark/5 dark:border-soft/10 rounded-xl text-[11px] font-black text-dark/60 dark:text-soft/50 shadow-sm">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer class="mt-48 text-center">
        <div class="max-w-3xl mx-auto space-y-12">
          <h2 class="text-5xl md:text-8xl font-black text-dark dark:text-soft tracking-tighter leading-none uppercase">
            Start Your Own <span class="text-transparent custom-stroke">Story.</span>
          </h2>
          <BaseButton variant="primary" size="xl" rounded="full" icon="solar:magic-stick-3-bold"
            @click="handleNav('#contact', true)" class="mx-auto">
            Get In Touch
          </BaseButton>
        </div>
      </footer>
    </div>
  </main>
</template>

<script setup lang="ts">
const { allProjects } = await useProjects();
const router = useRouter();
const route = useRoute();

const colorMode = useColorMode(); // Hook dari Nuxt Color Mode

// Logic untuk switch mode
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

definePageMeta({
  hideTopbar: true
});

useHead({
  title: 'All Projects — Digital Excellent Studio',
});

// Fungsi untuk navigasi antar halaman & anchor scroll
const handleNav = async (path: string, isAnchor: boolean) => {
  if (isAnchor && path.startsWith('#')) {
    // Jika user sedang tidak di Home, balik ke Home dulu
    if (route.path !== '/') {
      await router.push('/');
      // Beri jeda sedikit agar DOM Home ter-render sebelum scroll
      setTimeout(() => {
        scrollToSection(path);
      }, 100);
    } else {
      scrollToSection(path);
    }
  } else {
    router.push(path);
  }
};

const scrollToSection = (id: string) => {
  const smoother = (window as any).smoother;
  if (smoother) {
    smoother.scrollTo(id, true, "top top");
  } else {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
.custom-stroke {
  -webkit-text-stroke: 1.5px #D4AF37;
}

@media (max-width: 768px) {
  .custom-stroke {
    -webkit-text-stroke: 1px #D4AF37;
  }
}

/* Smooth reveal animation on scroll */
section {
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>