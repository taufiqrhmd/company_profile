<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 class="text-3xl font-black italic uppercase tracking-tighter">
          Project <span class="text-primary">Vault</span>
        </h2>
        <p class="text-slate-500 text-sm">Kelola karya digital dan metrik dampak sistem.</p>
      </div>
      <button 
        @click="isModalOpen = true"
        class="bg-primary text-black px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform shadow-lg shadow-primary/20"
      >
        Add New Project
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="stat in ['Total', 'High Impact', 'Archived']" :key="stat" class="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{{ stat }} Projects</p>
        <p class="text-4xl font-black italic">
          {{ stat === 'Total' ? projects.length : (stat === 'High Impact' ? '02' : '00') }}
        </p>
      </div>
    </div>

    <div class="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-100">
              <th class="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Project & Asset</th>
              <th class="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Impact Metric</th>
              <th class="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="(project, index) in projects" :key="index" class="hover:bg-slate-50/50 transition-colors group">
              <td class="p-8">
                <div class="flex items-center gap-6">
                  <span class="text-xs font-black text-primary italic">0{{ index + 1 }}</span>
                  <div class="relative w-16 h-12 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img :src="project.image" :alt="project.title" class="w-full h-full object-cover">
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <Icon :name="project.icon" class="w-3 h-3 text-primary" />
                      <p class="text-base font-black uppercase italic tracking-tight text-slate-900 leading-none">
                        {{ project.title }}
                      </p>
                    </div>
                    <p class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter mt-1.5">
                      Visual Identity Verified
                    </p>
                  </div>
                </div>
              </td>

              <td class="p-8">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full border border-green-100">
                  <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span class="text-[10px] font-black uppercase text-green-600 tracking-widest">
                    {{ project.impact }} Impact
                  </span>
                </div>
              </td>

              <td class="p-8 text-right">
                <div class="flex justify-end gap-4">
                  <button class="p-2 text-slate-300 hover:text-primary transition-colors">
                    <Icon name="solar:pen-new-square-bold" class="w-6 h-6" />
                  </button>
                  <button class="p-2 text-slate-300 hover:text-red-500 transition-colors">
                    <Icon name="solar:trash-bin-trash-bold" class="w-6 h-6" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

const projects = ref([
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
]);
</script>