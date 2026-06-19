<template>
  <section id="services" ref="sectionRef"
    class="relative py-16 md:py-24 px-4 md:px-6 bg-soft dark:bg-[#050505] transition-colors duration-500 overflow-hidden">
    <div class="container max-w-7xl mx-auto">

      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 md:mb-20 gap-8">
        <div class="max-w-2xl space-y-4 md:space-y-6 reveal-up">
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary">Our
              Expertise</span>
          </div>
          <h2
            class="text-4xl sm:text-5xl md:text-7xl font-black text-dark dark:text-soft leading-[0.9] tracking-tighter">
            MASTERING <br />
            <span class="text-primary">DIGITAL CRAFT.</span>
          </h2>
        </div>

        <p
          class="reveal-right max-w-xs text-dark/50 dark:text-soft/40 text-sm leading-relaxed italic border-l-2 lg:border-l-0 lg:border-r-2 border-primary pl-6 lg:pl-0 lg:pr-6 text-left lg:text-right">
          We curate digital solutions that not only work technically, but also strengthen your brand's credibility.
        </p>
      </div>

      <div v-if="!pending && services?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div v-for="(service, index) in services" :key="service.id"
          class="service-card-reveal group relative h-[460px] sm:h-[480px] overflow-hidden rounded-[2rem] bg-white dark:bg-[#0F0F0F] border border-dark/5 dark:border-white/5 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-3 shadow-xl shadow-primary/5"
          :style="{ '--delay': `${index * 120}ms` }">

          <div
            class="absolute inset-0 bg-primary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
          </div>

          <div class="relative h-full p-8 md:p-10 flex flex-col z-10">

            <div class="flex justify-between items-center mb-6 md:mb-8">
              <div
                class="text-[10px] md:text-xs font-black tracking-[0.3em] text-primary group-hover:text-dark transition-colors duration-500">
                {{ String(index + 1).padStart(2, '0') }} //
              </div>
              <div
                class="w-11 h-11 md:w-12 md:h-12 rounded-full border border-primary/20 flex items-center justify-center dark:text-soft group-hover:border-dark/20 group-hover:bg-dark group-hover:text-primary transition-all duration-500">
                <Icon :name="service.icon || 'heroicons:cube-20-solid'" class="w-5 h-5" />
              </div>
            </div>

            <div class="flex-grow flex flex-col justify-between mt-2">
              <div class="space-y-4">
                <h3
                  class="text-2xl md:text-3xl font-black text-dark dark:text-soft group-hover:text-dark transition-colors duration-500 leading-[1] tracking-tighter uppercase">
                  {{ getTitleWords(service.title).first }}<br />
                  <span v-if="getTitleWords(service.title).rest"
                    class="text-primary group-hover:text-soft transition-colors duration-500">
                    {{ getTitleWords(service.title).rest }}
                  </span>
                </h3>

                <p
                  class="text-sm md:text-base text-dark/60 dark:text-soft/40 group-hover:text-dark transition-colors duration-500 leading-relaxed whitespace-pre-line">
                  {{ service.description }}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div v-for="i in 3" :key="i" class="h-[460px] rounded-[2rem] bg-slate-100 dark:bg-neutral-900/50 animate-pulse">
        </div>
      </div>

    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, nextTick, watch } from 'vue';

const { data: services, pending } = await useFetch('/api/services', {
  key: 'landing-services-data',
  default: () => []
});

const getTitleWords = (title: string) => {
  if (!title) return { first: '', rest: '' };
  const words = title.trim().split(' ');
  return {
    first: words[0],
    rest: words.slice(1).join(' ')
  };
};

const initObserver = () => {
  if (!import.meta.client) return;

  const observerOptions = {
    threshold: 0.01,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-up, .reveal-right, .service-card-reveal').forEach((el) => observer.observe(el));
};

onMounted(() => {
  if (!pending.value) {
    nextTick(() => initObserver());
  }
});

watch(pending, (isPending) => {
  if (!isPending) {
    nextTick(() => initObserver());
  }
});
</script>

<style scoped>
.reveal-up,
.reveal-right,
.service-card-reveal {
  opacity: 0;
  transition: all 1s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform, opacity;
}

.reveal-up {
  transform: translateY(35px);
}

.reveal-right {
  transform: translateX(25px);
}

.service-card-reveal {
  transform: translateY(45px);
  transition-delay: var(--delay, 0ms);
}

.reveal-up.active,
.reveal-right.active,
.service-card-reveal.active {
  opacity: 1;
  transform: translate(0, 0);
}
</style>