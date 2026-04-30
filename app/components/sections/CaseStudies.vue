<template>
  <section
    id="portfolio"
    class="relative -mt-px py-16 md:py-24 px-4 md:px-6 bg-soft dark:bg-darkBg/[.98] transition-colors duration-500 overflow-hidden"
  >
    <div class="container max-w-7xl mx-auto relative">

      <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-20 gap-8">
        <div class="portfolio-header space-y-4 reveal-up">
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary">Case Studies</span>
          </div>
          <h2 class="text-5xl sm:text-6xl md:text-8xl font-black text-dark dark:text-soft leading-[0.9] tracking-tighter">
            PROVING <br />
            <span class="text-transparent border-b border-primary custom-stroke">RESULTS.</span>
          </h2>
        </div>

        <p class="portfolio-desc max-w-[280px] text-xs md:text-sm text-dark/40 dark:text-soft/40 italic leading-relaxed border-l-2 border-primary/30 pl-4 md:border-none md:pl-0 reveal-right">
          In-depth analysis and artistic execution that results in real growth impact for our clients.
        </p>
      </div>

      <div class="flex flex-col border-t border-dark/10 dark:border-soft/10">
        <div v-for="(project, index) in projects" :key="index" @mouseenter="activeHover = index"
          @mouseleave="activeHover = null"
          class="project-item reveal-up-stagger group relative py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between border-b border-dark/10 dark:border-soft/10 cursor-pointer transition-all duration-500 hover:md:px-8"
          :style="{ '--delay': `${(index + 1) * 150}ms` }">

          <div class="flex items-center gap-4 md:gap-6 relative z-10">
            <span
              class="text-[10px] md:text-xs font-black text-primary group-hover:text-dark dark:group-hover:text-soft transition-colors duration-500">
              0{{ index + 1 }}
            </span>
            <h3
              class="text-3xl sm:text-4xl md:text-6xl font-black text-dark dark:text-soft group-hover:text-primary dark:group-hover:text-primary transition-all duration-500 uppercase tracking-tighter">
              {{ project.title }}
            </h3>
          </div>

          <div class="flex items-center justify-between md:justify-end gap-6 md:gap-12 mt-4 md:mt-0 relative z-10">
            <div class="text-left md:text-right">
              <p class="text-xl md:text-2xl font-black text-dark dark:text-soft group-hover:text-primary transition-colors leading-none">
                {{ project.impact }}
              </p>
              <p class="text-[8px] uppercase tracking-widest text-dark group-hover:text-primary dark:text-soft transition-colors mt-1">
                {{ project.impact_label }}
              </p>
            </div>

            <div class="w-12 h-12 md:w-16 md:h-16 rounded-full border border-dark/10 dark:border-soft/10 flex items-center justify-center dark:text-soft group-hover:border-dark/20 group-hover:bg-dark group-hover:text-soft dark:group-hover:bg-soft dark:group-hover:text-primary transition-all duration-500">
              <Icon :name="project.icon" class="w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>

          <div
            class="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 w-64 aspect-[3/4] pointer-events-none opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 delay-75 z-50"
            :style="{ transform: `translate(-50%, -50%) rotate(${index % 2 === 0 ? '5deg' : '-5deg'})` }">
            <div class="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-soft dark:border-darkCard">
              <img :src="project.image" class="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      <div class="portfolio-footer mt-12 md:mt-20 flex justify-center reveal-up" style="--delay: 600ms">
        <BaseButton variant="dark" size="lg" class="w-full sm:w-auto" rounded="full" icon="solar:gallery-bold"
          @click="handleSeeProjects">
          See Full Portfolio
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const activeHover = ref<number | null>(null);
const { allProjects } = await useProjects();
const projects = computed(() => {
  return (allProjects.value || []).slice(0, 4);
});
const router = useRouter();

onMounted(() => {
  if (!import.meta.client) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.reveal-up, .reveal-right, .reveal-up-stagger');
  elements.forEach((el) => observer.observe(el));
});

const handleSeeProjects = () => {
  if (import.meta.client) {
    window.scrollTo(0, 0);
  }
  router.push('/projects');
};
</script>

<style scoped>
.custom-stroke {
  -webkit-text-stroke: 1px #D4AF37;
}

@media (max-width: 768px) {
  .custom-stroke {
    -webkit-text-stroke: 0.5px #D4AF37;
    text-shadow: none;
  }
}

img {
  backface-visibility: hidden;
}

.reveal-up, 
.reveal-right, 
.reveal-up-stagger {
  opacity: 0;
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.reveal-up {
  transform: translateY(40px);
}

.reveal-right {
  transform: translateX(20px);
}

.reveal-up-stagger {
  transform: translateY(30px);
  transition-delay: var(--delay, 0ms);
}

.portfolio-footer.reveal-up {
  transition-delay: var(--delay, 400ms);
}

.reveal-up.active,
.reveal-right.active,
.reveal-up-stagger.active {
  opacity: 1;
  transform: translate(0, 0);
}
</style>