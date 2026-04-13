<template>
  <section class="relative -mt-px py-24 px-6 bg-soft dark:bg-darkBg/[.98] transition-colors duration-500">
    <div class="container max-w-7xl mx-auto">

      <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div class="max-w-2xl space-y-6">
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span class="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Our Expertise</span>
          </div>
          <h2 class="text-5xl md:text-7xl font-black text-dark dark:text-soft leading-none tracking-tighter">
            CRAFTING <br />
            <span class="text-primary">DIGITAL LEGACY.</span>
          </h2>
        </div>
        <p
          class="max-w-xs text-dark/50 dark:text-soft/40 text-sm leading-relaxed italic border-r-2 border-primary pr-6 text-right"
        >
          Kami tidak hanya membangun fitur, kami menciptakan pengalaman yang mendefinisikan identitas brand Anda di era digital.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div v-for="(service, index) in services" :key="index"
          class="group relative h-[520px] overflow-hidden rounded-[2rem] bg-white dark:bg-[#0F0F0F] transition-all duration-700 hover:-translate-y-4 border border-dark/5 dark:border-white/5 shadow-xl shadow-transparent hover:shadow-primary/10"
        >
          <div
            class="absolute inset-0 bg-primary translate-y-[102%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          ></div>

          <div class="relative h-full p-12 flex flex-col z-10">
            <div class="flex justify-between items-start mb-12">
              <div class="text-xs font-black tracking-[0.3em] text-primary group-hover:text-dark transition-colors">
                0{{ index + 1 }} //
              </div>
              <div
                class="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center dark:text-soft group-hover:border-dark/20 group-hover:bg-dark group-hover:text-primary transition-all duration-500"
              >
                <Icon :name="service.icon" class="w-6 h-6" />
              </div>
            </div>

            <div class="flex-grow flex flex-col">
              <h3
                class="text-4xl font-black text-dark dark:text-soft group-hover:text-dark transition-colors leading-[0.9] tracking-tighter uppercase mb-6"
              >
                {{ service.title.split(' ')[0] }}<br />
                <span class="text-primary group-hover:text-dark/40">{{ service.title.split(' ').slice(1).join(' ') }}</span>
              </h3>

              <p
                class="text-dark/60 dark:text-soft/40 group-hover:text-dark transition-colors leading-relaxed line-clamp-4"
              >
                {{ service.description }}
              </p>
            </div>

            <div class="pt-8 border-t border-dark/5 dark:border-white/5 group-hover:border-dark/10">
              <BaseButton 
                variant="ghost" 
                size="sm" 
                icon="heroicons:arrow-right-circle-20-solid"
                class="!px-0 group-hover:!text-dark"
              >
                Methodology
              </BaseButton>
            </div>
          </div>

          <div
            class="absolute -right-12 -bottom-12 w-40 h-40 bg-primary/5 rounded-full group-hover:bg-white/20 transition-all duration-700"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const services = [
  {
    title: "Bespoke Development",
    description: "Solusi ekosistem digital yang dirancang khusus untuk skala bisnis enterprise dengan performa tanpa kompromi.",
    icon: "heroicons:code-bracket-20-solid",
  },
  {
    title: "Premium UI/UX Design",
    description: "Estetika visual kelas tinggi yang dipadukan dengan pengalaman pengguna intuitif untuk meningkatkan konversi.",
    icon: "heroicons:paint-brush-20-solid",
  },
  {
    title: "Digital Strategy",
    description: "Transformasi visi bisnis menjadi roadmap digital yang terukur untuk mendominasi pasar industri Anda.",
    icon: "heroicons:rocket-launch-20-solid",
  }
];
</script>