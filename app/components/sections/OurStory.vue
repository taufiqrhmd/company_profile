<template>
  <section id="about" class="py-32 bg-soft -mt-px dark:bg-darkBg/[.98] transition-colors duration-500 overflow-hidden">
    <div class="container max-w-7xl mx-auto px-6">

      <div class="grid lg:grid-cols-12 gap-12 border-b border-dark/10 dark:border-white/10 pb-20 mb-20">
        <div class="lg:col-span-8">
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span class="text-[10px] font-black uppercase tracking-[0.3em] text-primary">CORPORATE OVERVIEW</span>
          </div>
          <h2
            class="text-6xl md:text-8xl font-black text-dark dark:text-soft leading-[0.85] tracking-tighter uppercase mb-10">
            A COLLECTIVE OF <br />
            <span class="text-primary italic">DIGITAL ARCHITECTS.</span>
          </h2>
          <div class="grid md:grid-cols-2 gap-10">
            <p class="text-lg text-dark/60 dark:text-soft/40 leading-relaxed font-medium">
              Kami beroperasi di persimpangan antara estetika mewah dan fungsionalitas teknis. Setiap proyek adalah
              komitmen untuk melampaui standar industri.
            </p>
            <p class="text-sm text-dark/50 dark:text-soft/50 leading-relaxed">
              Didirikan dengan visi untuk membawa presisi tingkat tinggi ke dunia digital, kami telah bertransformasi
              menjadi mitra strategis bagi brand yang mengutamakan kualitas di atas segalanya.
            </p>
          </div>
        </div>

        <div class="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6">
          <div v-for="(stat, i) in stats" :key="i"
            class="relative overflow-hidden p-8 bg-white dark:bg-darkCard border border-dark/5 dark:border-white/5 rounded-[2rem] group transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
            <div
              class="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
              <Icon :name="stat.icon" class="w-32 h-32 text-dark dark:text-soft" />
            </div>

            <div class="relative z-10">
              <div class="flex items-baseline gap-1">
                <h4 class="text-5xl font-black text-primary leading-none tracking-tighter">{{ stat.value }}</h4>
                <span class="text-primary font-bold">+</span>
              </div>

              <div class="w-12 h-1 bg-primary/10 mt-4 mb-2 rounded-full overflow-hidden">
                <div class="w-0 group-hover:w-full h-full bg-primary transition-all duration-1000 ease-out"></div>
              </div>

              <p
                class="text-[10px] font-black uppercase tracking-[0.2em] text-dark/40 dark:text-soft/40 group-hover:text-primary transition-colors">
                {{ stat.label }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
        <div v-for="(value, i) in values" :key="i" class="space-y-6">
          <div
            class="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary font-black text-xs">
            0{{ i + 1 }}
          </div>
          <div class="space-y-3">
            <h5 class="text-xl font-black text-dark dark:text-soft uppercase tracking-tight">{{ value.title }}</h5>
            <p class="text-sm text-dark/60 dark:text-soft/40 leading-relaxed">{{ value.desc }}</p>
          </div>
        </div>
      </div>

      <div class="space-y-16">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl font-black text-dark dark:text-soft uppercase tracking-tighter">Strategic Leadership</h3>
          <div class="flex-grow mx-10 h-px bg-dark/10 dark:bg-white/10 hidden md:block"></div>
          
          <BaseButton 
            variant="link" 
            size="sm" 
            icon="solar:users-group-two-rounded-bold"
            @click="handleJoinTeam"
          >
            Join The Team
          </BaseButton>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="(member, i) in team" :key="i"
            class="group relative overflow-hidden bg-white dark:bg-darkCard p-4 rounded-[2.5rem] border border-dark/5 dark:border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
            <div class="aspect-square rounded-[2rem] overflow-hidden mb-6 bg-dark">
              <img :src="member.image"
                class="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
            </div>

            <div class="text-center pb-4">
              <h4
                class="text-lg font-black text-dark dark:text-soft uppercase tracking-tighter group-hover:text-primary transition-colors">
                {{ member.name }}
              </h4>
              <p class="text-[9px] font-black uppercase tracking-[0.3em] text-dark/40 dark:text-soft/30 mt-1">
                {{ member.role }}
              </p>
            </div>

            <div
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary transition-all duration-500 group-hover:w-full">
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
// Nuxt auto-imports BaseButton if it's in components/base/

const handleJoinTeam = () => {
  console.log('Opening careers page...');
};

const stats = [
  { value: '120', label: 'Partnerships', icon: 'heroicons:briefcase' },
  { value: '08', label: 'Industry Awards', icon: 'heroicons:trophy' },
  { value: '250', label: 'Digital Solutions', icon: 'heroicons:cpu-chip' },
];

const values = [
  { title: "Methodical Design", desc: "Kami mendekati setiap tantangan visual dengan metode yang terukur dan berorientasi hasil." },
  { title: "Technical Rigor", desc: "Arsitektur kode kami dibangun untuk stabilitas, keamanan, dan skalabilitas jangka panjang." },
  { title: "Elite Strategy", desc: "Menganalisis pasar secara mendalam untuk memposisikan brand Anda di atas kompetisi." }
];

const team = [
  { name: "S. Alex", role: "Creative Director", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop" },
  { name: "V. Sarah", role: "Lead Design", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" },
  { name: "C. Marcus", role: "Head of Tech", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" },
  { name: "R. Elena", role: "Strategy", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" }
];
</script>