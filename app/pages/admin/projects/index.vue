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
        class="bg-primary text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform shadow-lg shadow-primary/20">
        Add New Project
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="stat in ['Total', 'High Impact', 'Archived']" :key="stat"
        class="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{{ stat }} Projects</p>
        <p class="text-4xl font-black italic">
          <span v-if="isLoading">...</span>
          <span v-else>{{ getStatValue(stat) }}</span>
        </p>
      </div>
    </div>

    <div class="bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full border-separate border-spacing-0">
          <thead>
            <tr class="bg-slate-50/50">
              <th class="th-style text-center w-16">No</th>
              <th class="th-style">Project & Asset</th>
              <th class="th-style text-center">Category</th>
              <th class="th-style text-center">Impact Metric</th>
              <th class="th-style text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="(project, index) in projects" :key="project.id"
              class="hover:bg-slate-50/80 transition-all duration-300 group">

              <td class="p-6 text-center">
                <span
                  class="text-[11px] font-black text-slate-300 group-hover:text-primary transition-colors tabular-nums">
                  {{ formatIndex(index) }}
                </span>
              </td>

              <td class="p-6">
                <div class="flex items-center gap-5">
                  <div
                    class="relative w-24 h-16 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm shrink-0">
                    <img :src="project.image" :alt="project.title"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                  </div>
                  <div class="space-y-1.5">
                    <div class="flex items-center gap-2">
                      <Icon :name="project.icon || 'heroicons:cube'" class="w-4 h-4 text-primary" />
                      <h3 class="text-[13px] font-black uppercase italic tracking-tight text-slate-800">
                        {{ project.title }}
                      </h3>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                        ID: {{ project.id?.toString().slice(0, 8) }}
                      </span>
                    </div>
                  </div>
                </div>
              </td>

              <td class="p-6 text-center">
                <span
                  class="inline-flex px-4 py-1.5 bg-slate-100 text-slate-500 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {{ project.project_details?.category || 'General' }}
                </span>
              </td>

              <td class="p-6">
                <div class="flex flex-col items-center">
                  <div
                    class="px-3 py-1 bg-green-50 text-green-600 rounded-lg border border-green-100 flex items-center gap-2 mb-1">
                    <div class="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span class="text-[11px] font-black">{{ project.impact }}</span>
                  </div>
                  <span class="text-[8px] text-slate-400 font-bold uppercase tracking-tighter italic">
                    {{ project.impact_label }}
                  </span>
                </div>
              </td>

              <td class="p-6 pr-4 text-right">
                <div class="flex justify-end gap-1">
                  <button @click="openModal(project)"
                    class="action-btn group/btn hover:text-primary hover:bg-primary/5">
                    <Icon name="solar:pen-new-square-bold" class="w-6 h-6" />
                  </button>
                  <button @click="handleDelete(project.id)"
                    class="action-btn group/btn hover:text-red-500 hover:bg-red-50">
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
          class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div class="bg-white w-full max-w-2xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col">
            <div class="p-8 pb-4 flex justify-between items-center border-b border-slate-50">
              <h3 class="text-2xl font-black italic uppercase tracking-tighter">
                {{ isEditMode ? 'Edit' : 'Create' }} <span class="text-primary">Project</span>
              </h3>
              <button @click="isModalOpen = false" class="text-slate-400 hover:text-slate-900">
                <Icon name="solar:close-circle-bold" class="w-8 h-8" />
              </button>
            </div>

            <div class="p-10 pt-4 overflow-y-auto custom-scrollbar">
              <div class="grid grid-cols-2 gap-6 pb-4">
                <div class="space-y-2 col-span-2">
                  <label for="project_title" class="label-style">Project Title</label>
                  <input id="project_title" name="title" v-model="formData.title" type="text" class="form-input"
                    placeholder="Lumina Retail">
                </div>
                <div class="space-y-2 col-span-2 sm:col-span-1">
                  <label for="project_category" class="label-style">Category</label>
                  <input id="project_category" name="category" v-model="formData.category" type="text"
                    class="form-input" placeholder="E-commerce">
                </div>
                <div class="space-y-4 col-span-2">
                  <label for="project_icon" class="label-style">Icon Selection</label>
                  <div class="grid grid-cols-4 sm:grid-cols-8 gap-3">
                    <button v-for="icon in iconPresets" :key="icon.value" type="button"
                      @click="formData.icon = icon.value"
                      :class="['icon-btn', formData.icon === icon.value ? 'active' : '']">
                      <Icon :name="icon.value" class="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div class="space-y-2 col-span-2">
                  <label for="project_thumbnail" class="label-style">Project Thumbnail</label>
                  <div
                    class="flex items-center gap-6 p-6 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50">
                    <div class="w-32 h-20 rounded-2xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                      <img v-if="imagePreview || formData.image" :src="imagePreview || formData.image"
                        class="w-full h-full object-cover" />
                      <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
                        <Icon name="solar:gallery-bold" class="w-8 h-8" />
                      </div>
                    </div>
                    <div class="flex-1 space-y-2">
                      <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Format: JPG, PNG, WEBP
                        (Max 2MB)</p>
                      <input id="thumbnail_upload" name="thumbnail" type="file" ref="fileInput"
                        @change="handleFileChange" accept="image/*" class="hidden" />
                      <button @click="fileInput?.click()" type="button"
                        class="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
                        Choose Image
                      </button>
                    </div>
                  </div>
                </div>
                <div class="space-y-2">
                  <label for="project_impact" class="label-style">Impact Metric</label>
                  <input id="project_impact" v-model="formData.impact" type="text" class="form-input"
                    placeholder="+140%">
                </div>
                <div class="space-y-2">
                  <label for="project_impact_label" class="label-style">Impact Label</label>
                  <input id="project_impact_label" v-model="formData.impact_label" type="text" class="form-input"
                    placeholder="Growth">
                </div>
                <div class="space-y-2 col-span-2">
                  <label for="project_description" class="label-style">Description</label>
                  <textarea id="project_description" v-model="formData.description" rows="3"
                    class="form-input py-4"></textarea>
                </div>
                <div class="space-y-2 col-span-2">
                  <label for="project_full_story_1" class="label-style">Full Story Paragraph 1</label>
                  <textarea id="project_full_story_1" v-model="formData.full_story_1" rows="3"
                    class="form-input py-4"></textarea>
                </div>

                <div class="space-y-2 col-span-2">
                  <label for="project_full_story_2" class="label-style">Full Story Paragraph 2</label>
                  <textarea id="project_full_story_2" v-model="formData.full_story_2" rows="3"
                    class="form-input py-4"></textarea>
                </div>
                <div class="space-y-2 col-span-2">
                  <label for="project_tech_stack" class="label-style">Tech Stack (pisahkan dengan koma)</label>
                  <input id="project_tech_stack" :value="formData.tech_stack.join(', ')"
                    @input="formData.tech_stack = ($event.target as HTMLInputElement).value.split(',').map(s => s.trim())"
                    type="text" class="form-input" placeholder="Nuxt 3, Tailwind, Supabase">
                </div>
              </div>
            </div>

            <div class="p-8 pt-4 flex gap-4 bg-slate-50/50">
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
const supabase = useSupabaseClient<any>()
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const imagePreview = ref<string>('')

interface ProjectForm {
  id?: string | number
  title: string
  impact: string
  impact_label: string
  icon: string
  image: string
  description: string
  category: string
  full_story_1: string
  full_story_2: string
  tech_stack: string[]
}

const projects = ref<any[]>([])
const isLoading = ref<boolean>(true)
const isSubmitting = ref<boolean>(false)
const isModalOpen = ref<boolean>(false)
const isEditMode = ref<boolean>(false)

const formData = reactive<ProjectForm>({
  title: '',
  impact: '',
  impact_label: '',
  icon: 'heroicons:cube',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
  category: '',
  description: '',
  full_story_1: '',
  full_story_2: '',
  tech_stack: []
})

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
  resetForm()

  if (project) {
    // 1. Data Utama
    formData.id = project.id
    formData.title = project.title
    formData.impact = project.impact
    formData.impact_label = project.impact_label
    formData.icon = project.icon
    formData.image = project.image

    // 2. Data Detail (Handling Array dari Supabase)
    const detailArray = project.project_details
    // Kita ambil index [0] karena di log konsol Anda datanya ada di dalam array
    const detail = Array.isArray(detailArray) ? detailArray[0] : detailArray

    if (detail) {
      formData.category = detail.category || ''
      formData.description = detail.description || ''
      formData.full_story_1 = detail.full_story_1 || ''
      formData.full_story_2 = detail.full_story_2 || ''
      formData.tech_stack = Array.isArray(detail.tech_stack) ? detail.tech_stack : []
    }

    imagePreview.value = project.image
  }
  isModalOpen.value = true
}

const resetForm = () => {
  // Gunakan Object.assign agar reaktifitas tetap terjaga
  Object.assign(formData, {
    id: undefined,
    title: '',
    impact: '',
    impact_label: '',
    icon: 'heroicons:cube',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    category: '',
    description: '',
    full_story_1: '',
    full_story_2: '',
    tech_stack: []
  })
  selectedFile.value = null
  imagePreview.value = ''
}

const saveProject = async () => {
  if (!formData.title || !formData.category) return
  isSubmitting.value = true

  try {
    let imageUrl = formData.image

    if (selectedFile.value) {
      toast.info('Uploading image...')
      imageUrl = await uploadImage(selectedFile.value)
    }

    const payload = {
      mainData: {
        title: formData.title,
        impact: formData.impact,
        impact_label: formData.impact_label,
        icon: formData.icon,
        image: imageUrl
      },
      detailData: {
        category: formData.category,
        description: formData.description,
        full_story_1: formData.full_story_1,
        full_story_2: formData.full_story_2,
        tech_stack: formData.tech_stack
      }
    }

    if (isEditMode.value && formData.id) {

      await $fetch(`/api/projects/${formData.id}`, {
        method: 'PUT',
        body: payload
      })
    } else {
      // MENGGUNAKAN SERVER API UNTUK INSERT
      await $fetch('/api/projects/create', {
        method: 'POST',
        body: payload
      })
    }

    toast.success('Project berhasil dipublish!')
    selectedFile.value = null
    imagePreview.value = ''
    isModalOpen.value = false
    await fetchProjects()
  } catch (e: any) {
    toast.error(e.message)
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
    duration: 5000, // Jangan gunakan Infinity agar tidak nyangkut jika ada error
    action: {
      label: 'Hapus Sekarang',
      onClick: () => {
        // Langsung panggil fungsi eksekusi
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
  @apply text-[10px] font-black uppercase tracking-widest text-slate-400;
}

.form-input {
  @apply w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium;
}

.icon-btn {
  @apply p-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-400 transition-all hover:scale-110 hover:border-primary/50;
}

.icon-btn.active {
  @apply bg-primary border-primary text-white shadow-lg shadow-primary/20;
}

.btn-primary {
  @apply flex-1 px-8 py-4 rounded-2xl bg-primary font-black text-white uppercase text-[10px] tracking-widest hover:scale-[1.02] transition-all disabled:opacity-50 shadow-lg shadow-primary/20;
}

.btn-secondary {
  @apply flex-1 px-8 py-4 rounded-2xl border border-slate-200 font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-colors;
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

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full;
}

.th-style {
  @apply p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 align-middle;
}

.action-btn {
  @apply p-2.5 text-slate-300 rounded-xl transition-all duration-200;
}

/* Memperbaiki perataan vertikal seluruh sel */
td {
  @apply align-middle;
}
</style>