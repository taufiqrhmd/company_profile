<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 class="text-3xl font-black italic uppercase tracking-tighter text-slate-900">
          Project <span class="text-primary">Vault</span>
        </h2>
        <p class="text-slate-500 text-sm">Kelola karya digital dan metrik dampak sistem secara presisi.</p>
      </div>
      <button @click="openModal()"
        class="bg-primary text-black px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform shadow-lg shadow-primary/20">
        Add New Project
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="stat in ['Total', 'High Impact', 'Archived']" :key="stat"
        class="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
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
              <th class="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Impact Metric
              </th>
              <th class="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="(project, index) in projects" :key="index" class="hover:bg-slate-50/50 transition-colors group">
              <td class="p-8">
                <div class="flex items-center gap-6">
                  <span class="text-xs font-black text-primary italic">0{{ index + 1 }}</span>
                  <div class="relative w-20 h-14 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img :src="project.image" :alt="project.title" class="w-full h-full object-cover">
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <Icon :name="project.icon" class="w-4 h-4 text-primary" />
                      <p class="text-lg font-black uppercase italic tracking-tight text-slate-900 leading-none">
                        {{ project.title }}
                      </p>
                    </div>
                    <p class="text-[9px] text-slate-400 uppercase font-bold tracking-widest mt-2">
                      {{ project.category }}
                    </p>
                  </div>
                </div>
              </td>

              <td class="p-8">
                <div class="flex flex-col items-center">
                  <div
                    class="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full border border-green-100">
                    <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span class="text-[10px] font-black uppercase text-green-600 tracking-widest">
                      {{ project.impact }}
                    </span>
                  </div>
                  <p class="text-[8px] text-slate-400 uppercase font-bold mt-2 italic">{{ project.impactLabel }}</p>
                </div>
              </td>

              <td class="p-8 text-right">
                <div class="flex justify-end gap-2">
                  <button @click="openModal(project, index)"
                    class="p-3 text-slate-300 hover:text-primary transition-all hover:bg-primary/5 rounded-xl">
                    <Icon name="solar:pen-new-square-bold" class="w-6 h-6" />
                  </button>
                  <button @click="deleteProject(index)"
                    class="p-3 text-slate-300 hover:text-red-500 transition-all hover:bg-red-50 rounded-xl">
                    <Icon name="solar:trash-bin-trash-bold" class="w-6 h-6" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isModalOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">

          <div
            class="bg-white w-full max-w-2xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden border border-white/20 flex flex-col">

            <div class="p-8 pb-4 flex justify-between items-center border-b border-slate-50">
              <h3 class="text-2xl font-black italic uppercase tracking-tighter">
                {{ isEditMode ? 'Edit' : 'Create' }} <span class="text-primary">Project</span>
              </h3>
              <button @click="isModalOpen = false" class="text-slate-400 hover:text-slate-900 transition-colors">
                <Icon name="solar:close-circle-bold" class="w-8 h-8" />
              </button>
            </div>

            <div class="p-10 pt-4 overflow-y-auto custom-scrollbar">
              <div class="grid grid-cols-2 gap-6 pb-4">
                <div class="space-y-2 col-span-2">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Project Title</label>
                  <input v-model="formData.title" type="text" class="form-input" placeholder="Lumina Retail">
                </div>

                <div class="space-y-2 col-span-2 sm:col-span-1">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                  <input v-model="formData.category" type="text" class="form-input" placeholder="E-commerce & Branding">
                </div>

                <div class="space-y-4 col-span-2">
                  <div class="flex justify-between items-end">
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Project Identity
                      Icon</label>
                    <div v-if="formData.icon"
                      class="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg border border-primary/20">
                      <span class="text-[9px] font-bold text-primary uppercase">Selected:</span>
                      <Icon :name="formData.icon" class="w-4 h-4 text-primary" />
                    </div>
                  </div>

                  <div class="grid grid-cols-4 sm:grid-cols-8 gap-3">
                    <button v-for="icon in iconPresets" :key="icon.value" type="button" @click="selectIcon(icon.value)"
                      :class="[
                        'p-3 rounded-xl border transition-all flex items-center justify-center hover:scale-110',
                        formData.icon === icon.value
                          ? 'bg-primary border-primary text-black shadow-lg shadow-primary/20'
                          : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-primary/50'
                      ]" :title="icon.name">
                      <Icon :name="icon.value" class="w-5 h-5" />
                    </button>
                  </div>

                  <div class="relative group">
                    <input v-model="formData.icon" type="text" class="form-input !py-3 !text-xs italic"
                      placeholder="Or type custom icon name (e.g., solar:star-bold)">
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Impact Metric</label>
                  <input v-model="formData.impact" type="text" class="form-input" placeholder="+140%">
                </div>

                <div class="space-y-2">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Impact Label</label>
                  <input v-model="formData.impactLabel" type="text" class="form-input" placeholder="Conversion Growth">
                </div>

                <div class="space-y-2 col-span-2">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</label>
                  <textarea v-model="formData.description" rows="3" class="form-input py-4"></textarea>
                </div>
              </div>
            </div>

            <div class="p-8 pt-4 flex gap-4 border-t border-slate-50 bg-white">
              <button @click="isModalOpen = false"
                class="flex-1 px-8 py-4 rounded-2xl border border-slate-200 font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button @click="saveProject"
                class="flex-1 px-8 py-4 rounded-2xl bg-primary font-black uppercase text-[10px] tracking-widest hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20">
                {{ isEditMode ? 'Update Changes' : 'Publish Project' }}
              </button>
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
const supabase = useSupabaseClient()

const projects = ref([])
const isLoading = ref(true)

const fetchProjects = async () => {
  isLoading.value = true
  const { data, error } = await supabase
    .from('projects') // Pastikan nama tabel di Supabase adalah 'projects'
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching data:', error)
  } else {
    projects.value = data
  }
  isLoading.value = false
}

onMounted(() => {
  fetchProjects()
})

// Modal & Form State
const isModalOpen = ref(false);
const isEditMode = ref(false);
const editIndex = ref(null);

const formData = ref({
  title: '',
  category: '',
  impact: '',
  impactLabel: '',
  description: '',
  icon: '',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
});

const iconPresets = [
  { name: 'Retail', value: 'heroicons:shopping-bag' },
  { name: 'Finance', value: 'heroicons:banknotes' },
  { name: 'Architecture', value: 'heroicons:building-office-2' },
  { name: 'Health', value: 'heroicons:heart' },
  { name: 'Analytics', value: 'heroicons:chart-bar' },
  { name: 'Global', value: 'heroicons:globe-americas' },
  { name: 'Tech', value: 'heroicons:cpu-chip' },
  { name: 'User', value: 'heroicons:user-group' },
];

const selectIcon = (val) => {
  formData.value.icon = val;
};

const openModal = (project = null, index = null) => {
  if (project) {
    isEditMode.value = true;
    editIndex.value = index;
    formData.value = { ...project }; // Clone data agar tidak reaktif langsung ke tabel
  } else {
    isEditMode.value = false;
    resetForm();
  }
  isModalOpen.value = true;
};

const resetForm = () => {
  formData.value = {
    title: '',
    category: '',
    impact: '',
    impactLabel: '',
    description: '',
    icon: '',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
  };
};

const saveProject = async () => {
  if (isEditMode.value) {
    // UPDATE DATA
    const { error } = await supabase
      .from('projects')
      .update({
        title: formData.value.title,
        category: formData.value.category,
        impact: formData.value.impact,
        impactLabel: formData.value.impactLabel,
        description: formData.value.description,
        icon: formData.value.icon
      })
      .eq('id', formData.value.id) // Supabase butuh ID untuk update

    if (!error) fetchProjects()
  } else {
    // INSERT DATA BARU
    const { error } = await supabase
      .from('projects')
      .insert([formData.value])

    if (!error) fetchProjects()
  }
  isModalOpen.value = false
}

const deleteProject = async (id) => {
  if (confirm('Delete this project permanently?')) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (!error) fetchProjects()
  }
}
</script>

<style lang="postcss" scoped>
.form-input {
  @apply w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-primary/40;
}
</style>