<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-3xl font-black italic uppercase tracking-tighter">
          Studio <span class="text-primary">Services</span>
        </h2>
        <p class="text-slate-500 text-sm">Definisikan nilai utama yang ditawarkan studio Anda.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="(service, index) in services" :key="index" 
        class="bg-white border border-slate-200 rounded-[2.5rem] p-8 relative group hover:border-primary/50 transition-all shadow-sm"
      >
        <div class="flex justify-between items-start mb-8">
          <span class="text-xs font-black text-primary italic">0{{ index + 1 }} //</span>
          <div class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-black transition-all">
            <Icon :name="service.icon" class="w-6 h-6" />
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Service Title</label>
            <input v-model="service.title" class="w-full bg-transparent border-none p-0 font-black uppercase italic text-xl focus:ring-0 text-slate-900">
          </div>
          
          <div>
            <label class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Description</label>
            <textarea v-model="service.description" rows="3" class="w-full bg-transparent border-none p-0 text-sm text-slate-500 leading-relaxed focus:ring-0 resize-none"></textarea>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
          <button class="text-[10px] font-black uppercase tracking-widest text-primary hover:tracking-[0.2em] transition-all">Update Info</button>
          <Icon name="solar:settings-linear" class="w-4 h-4 text-slate-300" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

const services = ref([
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
])
</script>