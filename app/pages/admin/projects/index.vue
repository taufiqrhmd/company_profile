<template>
  <div class="max-w-6xl mx-auto space-y-8 transition-colors duration-300">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 class="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
          Project <span class="text-primary">Vault</span>
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm">Kelola karya digital dan metrik dampak sistem secara
          presisi.</p>
      </div>
      <button @click="openModal()"
        class="bg-primary text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform shadow-lg shadow-primary/20">
        Add New Project
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="stat in ['Total', 'High Impact', 'Archived']" :key="stat"
        class="p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] shadow-sm transition-colors">
        <p class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{{ stat }}
          Projects</p>
        <p class="text-4xl font-black italic dark:text-white">
          <span v-if="isLoading">...</span>
          <span v-else>{{ getStatValue(stat) }}</span>
        </p>
      </div>
    </div>

    <!-- Table Section -->
    <div
      class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] overflow-hidden shadow-sm transition-colors">
      <div class="overflow-x-auto">
        <table class="w-full border-separate border-spacing-0">
          <thead>
            <tr class="bg-slate-50/50 dark:bg-slate-900/50">
              <th class="th-style text-center w-16">No</th>
              <th class="th-style">Project & Asset</th>
              <th class="th-style text-center">Category</th>
              <th class="th-style text-center">Impact Metric</th>
              <th class="th-style text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="(project, index) in projects" :key="project.id"
              class="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-all duration-300 group">

              <td class="p-6 text-center">
                <span
                  class="text-[11px] font-black text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors tabular-nums">
                  {{ formatIndex(index) }}
                </span>
              </td>

              <td class="p-6">
                <div class="flex items-center gap-5">
                  <div
                    class="relative w-24 h-16 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 shadow-sm shrink-0">
                    <img :src="project.image" :alt="project.title"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                  </div>
                  <div class="space-y-1.5">
                    <div class="flex items-center gap-2">
                      <Icon :name="project.icon || 'heroicons:cube'" class="w-4 h-4 text-primary" />
                      <h3
                        class="text-[13px] font-black uppercase italic tracking-tight text-slate-800 dark:text-slate-200">
                        {{ project.title }}
                      </h3>
                    </div>
                  </div>
                </div>
              </td>

              <td class="p-6 text-center">
                <span
                  class="inline-flex px-4 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {{ project.project_details?.category || 'General' }}
                </span>
              </td>

              <td class="p-6">
                <div class="flex flex-col items-center">
                  <div
                    class="px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg border border-green-100 dark:border-green-500/20 flex items-center gap-2 mb-1">
                    <div class="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span class="text-[11px] font-black">{{ project.impact }}</span>
                  </div>
                  <span
                    class="text-[8px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tighter italic">
                    {{ project.impact_label }}
                  </span>
                </div>
              </td>

              <td class="p-6 pr-4 text-right">
                <div class="flex justify-end gap-1">
                  <button @click="openModal(project)"
                    class="action-btn group/btn hover:text-primary hover:bg-primary/5 dark:text-slate-500">
                    <Icon name="solar:pen-new-square-bold" class="w-6 h-6" />
                  </button>
                  <button @click="handleDelete(project.id)"
                    class="action-btn group/btn hover:text-red-500 hover:bg-red-50 dark:text-slate-500 dark:hover:bg-red-500/10">
                    <Icon name="solar:trash-bin-trash-bold" class="w-6 h-6" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Section -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isModalOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm p-4">
          <div
            class="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-transparent dark:border-slate-800">
            <div class="p-8 pb-4 flex justify-between items-center border-b border-slate-50 dark:border-slate-800">
              <h3 class="text-2xl font-black italic uppercase tracking-tighter dark:text-white">
                {{ isEditMode ? 'Edit' : 'Create' }} <span class="text-primary">Project</span>
              </h3>
              <button @click="isModalOpen = false" class="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <Icon name="solar:close-circle-bold" class="w-8 h-8" />
              </button>
            </div>

            <!-- Form Content -->
            <div class="p-10 pt-4 overflow-y-auto custom-scrollbar">
              <div class="grid grid-cols-2 gap-6 pb-4">
                <div class="space-y-2 col-span-2">
                  <label class="label-style">Project Title</label>
                  <input v-model="formData.title" type="text" class="form-input" placeholder="Lumina Retail">
                </div>
                <div class="space-y-2 col-span-2 sm:col-span-1">
                  <label class="label-style">Category</label>
                  <input v-model="formData.category" type="text" class="form-input" placeholder="E-commerce">
                </div>
                <div class="space-y-4 col-span-2">
                  <label class="label-style">Icon Selection</label>
                  <div class="grid grid-cols-4 sm:grid-cols-8 gap-3">
                    <button v-for="icon in iconPresets" :key="icon.value" type="button"
                      @click="formData.icon = icon.value"
                      :class="['icon-btn', formData.icon === icon.value ? 'active' : '']">
                      <Icon :name="icon.value" class="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <!-- Thumbnail Upload -->
                <div class="space-y-2 col-span-2">
                  <label class="label-style">Project Thumbnail</label>
                  <div
                    class="flex items-center gap-6 p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[2rem] bg-slate-50/50 dark:bg-slate-800/50">
                    <div
                      class="w-32 h-20 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shrink-0">
                      <img v-if="imagePreview || formData.image" :src="imagePreview || formData.image"
                        class="w-full h-full object-cover" />
                      <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
                        <Icon name="solar:gallery-bold" class="w-8 h-8" />
                      </div>
                    </div>
                    <div class="flex-1 space-y-2">
                      <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Format: JPG, PNG, WEBP
                      </p>
                      <input ref="fileInput" type="file" @change="handleFileChange" accept="image/*" class="hidden" />
                      <button @click="fileInput?.click()" type="button"
                        class="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-[10px] font-black uppercase dark:text-white">
                        Choose Image
                      </button>
                    </div>
                  </div>
                </div>
                <div class="space-y-2">
                  <label class="label-style">Impact Metric</label>
                  <input v-model="formData.impact" type="text" class="form-input" placeholder="+140%">
                </div>
                <div class="space-y-2">
                  <label class="label-style">Impact Label</label>
                  <input v-model="formData.impact_label" type="text" class="form-input" placeholder="Growth">
                </div>
                <div class="space-y-2 col-span-2">
                  <label class="label-style">Description</label>
                  <textarea v-model="formData.description" rows="3" class="form-input py-4"></textarea>
                </div>
                <div class="space-y-2 col-span-2">
                  <label class="label-style">Full Story - Part 1 (Challenge/Context)</label>
                  <textarea v-model="formData.full_story_1" rows="4" class="form-input py-4 custom-scrollbar"
                    placeholder="Tell about the background or main challenges of this project...">
                  </textarea>
                </div>
                <div class="space-y-2 col-span-2">
                  <label class="label-style">Full Story - Part 2 (Solution/Result)</label>
                  <textarea v-model="formData.full_story_2" rows="4" class="form-input py-4 custom-scrollbar"
                    placeholder="Tell about the solution provided and the final results achieved...">
                  </textarea>
                </div>
                <div class="space-y-2 col-span-2">
                  <label class="label-style">Tech Stack</label>
                  <input v-model="techStackInput" type="text" class="form-input"
                    placeholder="Contoh: Nuxt 3, Tailwind CSS, Laravel">
                  type="text" class="form-input" placeholder="Nuxt 3, Tailwind, Supabase">
                </div>
              </div>
            </div>
            <!-- Modal Footer -->
            <div
              class="p-8 pt-4 flex gap-4 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800">
              <button @click="isModalOpen = false" class="btn-secondary">Cancel</button>
              <button @click="saveProject" :disabled="isSubmitting" class="btn-primary">
                {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update Changes' : 'Publish Project') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'admin' })
const { formData, isModalOpen, isEditMode, selectedFile, imagePreview, resetForm, populateForm } = useProjectForm()

const supabase = useSupabaseClient<any>()
const fileInput = ref<HTMLInputElement | null>(null)
const projects = ref<any[]>([])
const isLoading = ref<boolean>(true)
const isSubmitting = ref<boolean>(false)
const techStackInput = ref('')

const iconPresets = [
  { name: 'Retail', value: 'heroicons:shopping-bag' },
  { name: 'Finance', value: 'heroicons:banknotes' },
  { name: 'Architecture', value: 'heroicons:building-office-2' },
  { name: 'Health', value: 'heroicons:heart' },
  { name: 'Analytics', value: 'heroicons:chart-bar' },
  { name: 'Global', value: 'heroicons:globe-americas' },
  { name: 'Tech', value: 'heroicons:cpu-chip' },
  { name: 'User', value: 'heroicons:user-group' },
]

const fetchProjects = async () => {
  isLoading.value = true
  try {
    // Memanggil Server API Route kita
    const data = await $fetch('/api/projects')
    console.log('Data dari API:', data)
    projects.value = data || []
  } catch (e: any) {
    toast.error('Error fetching projects', { description: e.message })
  } finally {
    isLoading.value = false
  }
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    selectedFile.value = file
    imagePreview.value = URL.createObjectURL(file) // Untuk preview instan
  }
}

const uploadImage = async (file: File) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `uploads/${fileName}`

  // 1. Upload ke Storage
  const { data, error } = await supabase.storage
    .from('project-assets')
    .upload(filePath, file)

  if (error) throw error

  // 2. Ambil Public URL
  const { data: publicUrl } = supabase.storage
    .from('project-assets')
    .getPublicUrl(filePath)

  return publicUrl.publicUrl
}

const openModal = (project: any = null) => {
  isEditMode.value = !!project
  
  if (project) {
    populateForm(project)
    const details = project.project_details || project;
    techStackInput.value = details.tech_stack ? details.tech_stack.join(', ') : '';
  } else {
    resetForm()
    techStackInput.value = '';
  }
  
  isModalOpen.value = true
}

const saveProject = async () => {
  if (!formData.title || !formData.category) return
  isSubmitting.value = true
  const toastId = toast.loading('Saving project...')

  try {
    if (selectedFile.value) {
      formData.image = await uploadImage(selectedFile.value)
    }

    const techArray = techStackInput.value
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== ''); 

    // 1. Ekstrak field (pastikan tech_stack diperbarui dari techArray)
    const {
      category,
      description,
      full_story_1,
      full_story_2,
      project_details,
      ...mainFields
    } = formData

    // 2. Susun payload yang bersih
    const mainData = {
      title: mainFields.title,
      impact: mainFields.impact,
      impact_label: mainFields.impact_label,
      icon: mainFields.icon,
      image: mainFields.image
    }

    const detailData = {
      category,
      description,
      tech_stack: techArray, // Gunakan hasil olahan techArray
      full_story_1,
      full_story_2
    }

    const method = isEditMode.value ? 'PUT' : 'POST'
    const endpoint = isEditMode.value 
      ? `/api/projects/${formData.id}` 
      : '/api/projects/create'

    await $fetch(endpoint, {
      method,
      body: {
        mainData,
        detailData
      }
    })

    toast.success(isEditMode.value ? 'Project updated!' : 'Project created!', { id: toastId })
    isModalOpen.value = false
    fetchProjects() 
  } catch (e: any) {
    const errorMsg = e.data?.message || e.message || 'Unknown error occurred'
    toast.error('Gagal: ' + errorMsg, { id: toastId })
  } finally {
    isSubmitting.value = false
  }
}

const handleDelete = (id: string | number | undefined) => {
  console.log("Handle Delete Muncul")
  if (!id) {
    console.error("ID tidak ditemukan");
    return;
  }

  toast.warning('Hapus project ini?', {
    description: 'Tindakan ini tidak dapat dibatalkan.',
    duration: 5000,
    action: {
      label: 'Hapus Sekarang',
      onClick: () => {
        executeDelete(id);
      }
    },
  })
}

// Gunakan async function agar hoisting lebih aman
const executeDelete = async (id: string | number) => {
  console.log('Memulai proses eksekusi hapus untuk ID:', id);
  const deleteToast = toast.loading('Sedang menghapus...');

  try {
    const projectToDelete = projects.value.find(p => p.id === id);

    // 1. Hapus Storage jika ada
    if (projectToDelete?.image) {
      // Pastikan URL parsing benar
      const urlParts = projectToDelete.image.split('project-assets/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await supabase.storage.from('project-assets').remove([filePath]);
      }
    }

    // 2. Panggil API
    // Pastikan path API sesuai dengan struktur folder Nuxt Anda
    await $fetch(`/api/projects/${id}`, {
      method: 'DELETE'
    });

    toast.success('Project berhasil dihapus', { id: deleteToast });
    await fetchProjects();
  } catch (e: any) {
    console.error('Error detail:', e);
    toast.error('Gagal: ' + (e.data?.message || e.message), { id: deleteToast });
  }
}

const getStatValue = (type: string) => {
  if (type === 'Total') return projects.value.length.toString().padStart(2, '0')
  if (type === 'High Impact') return projects.value.filter(p => p.impact.includes('+')).length.toString().padStart(2, '0')
  return '00'
}

const formatIndex = (i: number) => (i + 1).toString().padStart(2, '0')

onMounted(fetchProjects)
</script>

<style lang="postcss" scoped>
.label-style {
  @apply text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500;
}

.form-input {
  @apply w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium dark:text-white dark:placeholder:text-slate-600;
}

.icon-btn {
  @apply p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-400 transition-all hover:scale-110 hover:border-primary/50;
}

.icon-btn.active {
  @apply bg-primary border-primary text-white shadow-lg shadow-primary/20;
}

.btn-primary {
  @apply flex-1 px-8 py-4 rounded-2xl bg-primary font-black text-white uppercase text-[10px] tracking-widest hover:scale-[1.02] transition-all disabled:opacity-50 shadow-lg shadow-primary/20;
}

.btn-secondary {
  @apply flex-1 px-8 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors;
}

.th-style {
  @apply p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-700 align-middle;
}

.action-btn {
  @apply p-2.5 text-slate-300 dark:text-slate-600 rounded-xl transition-all duration-200;
}

/* Custom Scrollbar for Dark Mode */
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 dark:bg-slate-700 rounded-full;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>