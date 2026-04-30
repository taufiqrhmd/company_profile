<template>
  <section id="about" ref="aboutSection"
    class="py-20 md:py-28 bg-soft -mt-px dark:bg-darkBg/[.98] transition-colors duration-500 overflow-hidden">
    <div class="container max-w-7xl mx-auto px-4 md:px-6">

      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-dark/10 dark:border-white/10 pb-16 md:pb-20 mb-16 md:mb-20">
        <div class="lg:col-span-8 reveal">
          <div
            class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary">CORPORATE
              OVERVIEW</span>
          </div>

          <h2
            class="text-4xl sm:text-6xl md:text-8xl font-black text-dark dark:text-soft leading-[0.9] md:leading-[0.85] tracking-tight uppercase mb-8 md:mb-10">
            A COLLECTIVE OF <br />
            <span class="text-primary italic">DIGITAL ARCHITECTS.</span>
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <p class="text-base md:text-lg text-dark/60 dark:text-soft/40 leading-relaxed font-medium">
              We operate at the intersection of luxurious aesthetics and technical functionality. Each project is a
              commitment to exceeding industry standards.
            </p>
            <p class="text-sm text-dark/50 dark:text-soft/50 leading-relaxed">
              Founded on the principle of high precision, we are a strategic partner for companies that prioritize
              uncompromising quality.
              We build a robust digital infrastructure for the future of your business.
            </p>
          </div>
        </div>

        <div class="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
          <div v-for="(stat, i) in stats" :key="i"
            class="reveal-delay relative overflow-hidden p-6 md:p-8 bg-white dark:bg-darkCard border border-dark/5 dark:border-white/5 rounded-[1.5rem] md:rounded-[2rem] group transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
            :style="{ '--delay': (i * 100) + 'ms' }" :class="i === 2 ? 'col-span-2 lg:col-span-1' : ''">

            <div
              class="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
              <Icon :name="stat.icon" class="w-24 h-24 md:w-32 md:h-32 text-dark dark:text-soft" />
            </div>

            <div class="relative z-10">
              <div class="flex items-baseline gap-1">
                <h4 class="text-3xl md:text-5xl font-black text-primary leading-none tracking-tighter">
                  {{ stat.value }}
                </h4>
                <span class="text-primary font-bold">+</span>
              </div>
              <div class="w-10 h-1 bg-primary/10 mt-3 md:mt-4 mb-2 rounded-full overflow-hidden">
                <div class="w-0 group-hover:w-full h-full bg-primary transition-all duration-1000 ease-out"></div>
              </div>
              <p
                class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-dark/40 dark:text-soft/40 group-hover:text-primary transition-colors">
                {{ stat.label }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-24 md:mb-32">
        <div v-for="(value, i) in values" :key="i" class="reveal-delay space-y-4 md:space-y-6"
          :style="{ '--delay': (i * 150) + 'ms' }">
          <div
            class="w-10 h-10 md:w-12 md:h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary font-black text-xs">
            0{{ i + 1 }}
          </div>
          <div class="space-y-2 md:space-y-3">
            <h5 class="text-lg md:text-xl font-black text-dark dark:text-soft uppercase tracking-tight">{{ value.title
            }}</h5>
            <p class="text-sm text-dark/60 dark:text-soft/40 leading-relaxed">{{ value.desc }}</p>
          </div>
        </div>
      </div>

      <div class="space-y-12 md:space-y-16">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 reveal">
          <h3 class="text-xl md:text-2xl font-black text-dark dark:text-soft uppercase tracking-tighter">Strategic
            Leadership</h3>
          <div class="flex-grow mx-10 h-px bg-dark/10 dark:bg-white/10 hidden lg:block"></div>
          <BaseButton variant="link" size="sm" icon="solar:users-group-two-rounded-bold" class="!p-0"
            @click="handleJoinTeam">
            Join The Team
          </BaseButton>
        </div>

        <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div v-for="(member, i) in team" :key="i"
            class="reveal-delay group relative overflow-hidden bg-white dark:bg-darkCard p-3 md:p-4 rounded-[2rem] md:rounded-[2.5rem] border border-dark/5 dark:border-white/5 transition-all duration-500 hover:shadow-2xl"
            :style="{ '--delay': (i * 100) + 'ms' }">
            <div class="aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-4 md:mb-6 bg-dark">
              <img :src="member.image"
                class="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                loading="lazy" />
            </div>
            <div class="text-center pb-2 md:pb-4">
              <h4
                class="text-base md:text-lg font-black text-dark dark:text-soft uppercase tracking-tighter group-hover:text-primary transition-colors">
                {{ member.name }}
              </h4>
              <p
                class="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-dark/40 dark:text-soft/30 mt-1">
                {{ member.role }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTransition, TransitionPresets } from '@vueuse/core'
const router = useRouter();
const route = useRoute();

const statsData = reactive({
  partners: 0,
  honors: 0,
  excellence: 0
})

const partnersCount = useTransition(computed(() => statsData.partners), {
  duration: 2000,
  transition: TransitionPresets.easeOutExpo,
})
const honorsCount = useTransition(computed(() => statsData.honors), {
  duration: 2000,
  transition: TransitionPresets.easeOutExpo,
})
const excellenceCount = useTransition(computed(() => statsData.excellence), {
  duration: 2000,
  transition: TransitionPresets.easeOutExpo,
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

        if (entry.target.id === 'about') {
          setTimeout(() => {
            statsData.partners = 120;
            statsData.honors = 8;
            statsData.excellence = 250;
          }, 600);
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const aboutEl = document.querySelector('#about');
  if (aboutEl) observer.observe(aboutEl);

  const elements = document.querySelectorAll('.reveal, .reveal-delay');
  elements.forEach((el) => observer.observe(el));
});

const handleJoinTeam = () => handleNav('#contact', true);

const handleNav = async (path: string, isAnchor: boolean) => {
  if (isAnchor && path.startsWith('#')) {
    if (route.path !== '/') {
      await router.push('/');
      setTimeout(() => scrollToSection(path), 100);
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

const stats = computed(() => [
  { value: Math.round(partnersCount.value), label: 'Trusted Partners', icon: 'heroicons:briefcase' },
  { value: Math.round(honorsCount.value).toString().padStart(2, '0'), label: 'Strategic Honors', icon: 'heroicons:trophy' },
  { value: Math.round(excellenceCount.value), label: 'Project Excellence', icon: 'heroicons:cpu-chip' },
]);

const values = [
  { title: "Methodical Design", desc: "We approach every visual challenge with a measurable, results-oriented approach." },
  { title: "Technical Rigor", desc: "Our code architecture is built for long-term stability, security, and scalability." },
  { title: "Elite Strategy", desc: "We conduct in-depth market analysis to position your brand above the competition." }
];

const team = [
  { name: "S. Alex", role: "Creative Director", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop" },
  { name: "V. Sarah", role: "Lead Design", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" },
  { name: "C. Marcus", role: "Head of Tech", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" },
  { name: "R. Elena", role: "Strategy", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" }
];
</script>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal-delay {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}

.reveal.active,
.reveal-delay.active {
  opacity: 1;
  transform: translateY(0);
}

.reveal,
.reveal-delay {
  will-change: transform, opacity;
}
</style>