<template>
  <section
    ref="sectionRef"
    class="relative -mt-px py-16 md:py-24 px-4 md:px-6 bg-soft dark:bg-darkBg/[.98] transition-colors duration-500 overflow-hidden">
    <div class="container max-w-7xl mx-auto">

      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 md:mb-20 gap-8">
        <div class="max-w-2xl space-y-4 md:space-y-6 reveal-up">
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary">Our Expertise</span>
          </div>
          <h2 class="text-4xl sm:text-5xl md:text-7xl font-black text-dark dark:text-soft leading-[0.9] tracking-tighter">
            MASTERING <br />
            <span class="text-primary">DIGITAL CRAFT.</span>
          </h2>
        </div>

        <p class="reveal-right max-w-xs text-dark/50 dark:text-soft/40 text-sm leading-relaxed italic border-l-2 lg:border-l-0 lg:border-r-2 border-primary pl-6 lg:pl-0 lg:pr-6 text-left lg:text-right">
          Kami mengkurasi solusi digital yang tidak hanya berfungsi secara teknis, tetapi juga memperkuat kredibilitas brand Anda.
        </p>
      </div>

      <div v-if="!pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div v-for="(service, index) in services" 
          :key="service.id"
          class="service-card-reveal group relative h-[480px] sm:h-[520px] overflow-hidden rounded-[2rem] bg-white dark:bg-[#0F0F0F] border border-dark/5 dark:border-white/5 transition-all duration-700 hover:-translate-y-4 shadow-xl shadow-transparent hover:shadow-primary/10"
          :style="{ '--delay': `${index * 150}ms` }"
        >
          <div class="absolute inset-0 bg-primary translate-y-[102%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"></div>

          <div class="relative h-full p-8 md:p-12 flex flex-col z-10">
            <div class="flex justify-between items-start mb-8 md:mb-12">
              <div class="text-[10px] md:text-xs font-black tracking-[0.3em] text-primary group-hover:text-dark transition-colors">
                0{{ index + 1 }} //
              </div>
              <div class="w-12 h-12 md:w-14 md:h-14 rounded-full border border-primary/20 flex items-center justify-center dark:text-soft group-hover:border-dark/20 group-hover:bg-dark group-hover:text-primary transition-all duration-500">
                <Icon :name="service.icon || 'heroicons:cube-20-solid'" class="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>

            <div class="flex-grow flex flex-col">
              <h3 class="text-3xl md:text-4xl font-black text-dark dark:text-soft group-hover:text-dark transition-colors leading-[0.9] tracking-tighter uppercase mb-4 md:mb-6">
                {{ service.title?.split(' ')[0] }}<br />
                <span class="text-primary group-hover:text-dark/40">
                  {{ service.title?.split(' ').slice(1).join(' ') }}
                </span>
              </h3>
              <p class="text-sm md:text-base text-dark/60 dark:text-soft/40 group-hover:text-dark transition-colors leading-relaxed line-clamp-4 md:line-clamp-none">
                {{ service.description }}
              </p>
            </div>

            <div class="pt-6 md:pt-8 border-t border-dark/5 dark:border-white/5 group-hover:border-dark/10">
              <BaseButton variant="outline" size="sm" icon="heroicons:arrow-right-circle-20-solid"
                class="!px-4 group-hover:!border-dark group-hover:!text-dark">
                Methodology
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { data: services, pending } = await useFetch('/api/services', {
  key: 'landing-services-data',
  default: () => []
})

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

  setTimeout(() => {
    const animatedElements = document.querySelectorAll('.reveal-up, .reveal-right, .service-card-reveal');
    animatedElements.forEach((el) => observer.observe(el));
  }, 300); 
});
</script>

<style scoped>
.reveal-up, 
.reveal-right, 
.service-card-reveal {
  opacity: 0;
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.reveal-up {
  transform: translateY(40px);
}

.reveal-right {
  transform: translateX(30px);
}

.service-card-reveal {
  transform: translateY(50px);
  transition-delay: var(--delay, 0ms);
}

/* 3. Active State */
.reveal-up.active,
.reveal-right.active,
.service-card-reveal.active {
  opacity: 1;
  transform: translate(0, 0);
}

/* Overlay hover tetap menggunakan CSS yang sudah ada di template */
</style>