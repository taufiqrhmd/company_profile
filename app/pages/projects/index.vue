<template>
  <main class="min-h-screen bg-soft dark:bg-[#050505] transition-colors duration-700 relative overflow-hidden">

    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style="background-image: linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px); background-size: 100px 100px;">
      </div>
      <div class="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]"></div>
      <div class="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
    </div>

    <div class="container max-w-7xl mx-auto px-6 relative z-10 pt-16 pb-40">

      <header class="mb-32 md:mb-48">
        <div class="inline-flex items-center gap-3 mb-8">
          <span class="w-12 h-px bg-primary"></span>
          <span class="text-[10px] font-black uppercase tracking-[0.5em] text-primary">The Complete Archive</span>
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

      <div class="space-y-48 md:space-y-72">
        <section v-for="(project, index) in allProjects" :key="project.title"
          class="flex flex-col gap-16 md:gap-24 items-start"
          :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'">
          <div class="w-full md:w-[55%] sticky top-32">
            <div class="relative group">
              <div
                class="absolute -inset-4 border border-primary/20 rounded-[3rem] translate-x-2 translate-y-2 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700">
              </div>

              <div class="relative overflow-hidden rounded-[2.5rem] bg-dark shadow-2xl">
                <img :src="project.image" :alt="project.title"
                  class="w-full aspect-[16/10] object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                  loading="lazy" />

                <div
                  class="absolute bottom-8 right-8 px-6 py-3 bg-soft/10 backdrop-blur-2xl border border-soft/20 rounded-2xl">
                  <p class="text-[9px] font-black text-soft uppercase tracking-widest mb-1 opacity-60">Success Metric
                  </p>
                  <p class="text-2xl font-black text-primary">{{ project.impact }} Increase</p>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full md:w-[45%] space-y-10">
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
                {{ project.category }}
              </p>
            </div>

            <div class="space-y-6">
              <p class="text-xl md:text-2xl text-dark/80 dark:text-soft/70 leading-snug font-bold tracking-tight">
                {{ project.description }}
              </p>

              <div class="prose prose-sm dark:prose-invert text-dark/70 dark:text-soft/50 space-y-4">
                <p>
                  Proyek ini dimulai dengan tantangan utama dalam meningkatkan retensi pengguna dan efisiensi alur kerja
                  digital. Melalui fase riset mendalam, kami menemukan bahwa integrasi teknologi yang tepat
                  dikombinasikan dengan UI yang intuitif adalah kunci utama kesuksesan.
                </p>
                <p>
                  Hasil akhirnya bukan sekadar produk yang fungsional, melainkan sebuah ekosistem digital yang mampu
                  beradaptasi dengan pertumbuhan bisnis klien di masa depan.
                </p>
              </div>
            </div>

            <div class="pt-10 border-t border-dark/10 dark:border-soft/10">
              <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-dark/40 dark:text-soft/40 mb-5">Tech
                Stack & Tools</h4>
              <div class="flex flex-wrap gap-3">
                <span v-for="tech in project.tech" :key="tech"
                  class="px-5 py-2 bg-white dark:bg-soft/5 border border-dark/5 dark:border-soft/10 rounded-xl text-[11px] font-black text-dark/60 dark:text-soft/50 shadow-sm">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer class="mt-64 text-center">
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
const { allProjects } = useProjects();
const router = useRouter();
const route = useRoute();

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

/* Sticky behavior logic for desktop */
@media (min-width: 768px) {
  .sticky {
    position: sticky;
    top: 8rem;
    align-self: flex-start;
  }
}

/* Smooth reveal animation on scroll */
section {
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>