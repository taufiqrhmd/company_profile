<template>
  <section class="relative -mt-px py-24 px-6 bg-soft dark:bg-darkBg/[.98] transition-colors duration-500 overflow-visible">
    <div class="container max-w-7xl mx-auto relative">
      <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
        <div class="space-y-4">
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span class="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Case Studies</span>
          </div>
          <h2 class="text-6xl md:text-8xl font-black text-dark dark:text-soft leading-none tracking-tighter">
            PROVING <br />
            <span class="text-transparent border-b border-primary">RESULTS.</span>
          </h2>
        </div>
        
        <p class="max-w-[280px] text-sm text-dark/40 dark:text-soft/40 italic leading-relaxed">
          Kami memadukan data-driven strategy dengan desain artistik untuk hasil yang terukur.
        </p>
      </div>

      <div class="flex flex-col border-t border-dark/10 dark:border-soft/10">
        <div 
          v-for="(project, index) in projects" 
          :key="index"
          @mouseenter="activeHover = index"
          @mouseleave="activeHover = null"
          class="group relative py-12 flex flex-col md:flex-row md:items-center justify-between border-b border-dark/10 dark:border-soft/10 cursor-pointer transition-all duration-500 hover:px-8"
        >
          <div class="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>

          <div class="flex items-baseline gap-6 relative z-10">
            <span class="text-xs font-black text-primary group-hover:text-dark dark:group-hover:text-soft transition-colors duration-500">
              0{{ index + 1 }}
            </span>
            <h3 class="text-4xl md:text-6xl font-black text-dark dark:text-soft group-hover:text-primary dark:group-hover:text-primary transition-all duration-500 uppercase tracking-tighter">
              {{ project.title }}
            </h3>
          </div>

          <div class="flex items-center gap-12 mt-6 md:mt-0 relative z-10">
            <div class="text-right hidden sm:block">
              <p class="text-2xl font-black text-dark dark:text-soft group-hover:text-primary transition-colors leading-none">
                {{ project.impact }}
              </p>
              <p class="text-[8px] uppercase tracking-widest text-dark group-hover:text-primary dark:text-soft transition-colors mt-1">
                Growth Impact
              </p>
            </div>

            <div class="w-16 h-16 rounded-full border border-dark/10 dark:border-soft/10 flex items-center justify-center dark:text-soft group-hover:border-dark/20 group-hover:bg-dark group-hover:text-soft dark:group-hover:bg-soft dark:group-hover:text-primary transition-all duration-500">
              <Icon :name="project.icon" class="w-6 h-6" />
            </div>
          </div>

          <div 
            class="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 w-64 aspect-[3/4] pointer-events-none opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 delay-75 z-50"
            :style="{ transform: `translate(-50%, -50%) rotate(${index % 2 === 0 ? '5deg' : '-5deg'})` }"
          >
            <div class="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-soft dark:border-darkCard">
              <img :src="project.image" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-20 flex justify-center">
        <BaseButton 
          variant="dark" 
          size="xl" 
          rounded="full" 
          icon="solar:gallery-bold"
          @click="handleSeePortfolio"
        >
          See Full Portfolio
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeHover = ref<number | null>(null);

const handleSeePortfolio = () => {
  console.log('Navigating to full portfolio...');
};

const projects = [
  {
    title: "Lumina Retail",
    impact: "+140%",
    icon: "heroicons:shopping-bag",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop",
  },
  {
    title: "Arthra Fintech",
    impact: "2.4M",
    icon: "heroicons:banknotes",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Nova Arch",
    impact: "85K+",
    icon: "heroicons:building-office-2",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Virtue Health",
    impact: "99.9%",
    icon: "heroicons:heart",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
  }
];
</script>

<style scoped>
h2 span {
  -webkit-text-stroke: 1px #D4AF37;
}

img {
  backface-visibility: hidden;
}
</style>