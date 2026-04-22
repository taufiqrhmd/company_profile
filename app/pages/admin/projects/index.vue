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
            <tr v-if="isLoading" v-for="i in 3" :key="i" class="animate-pulse">
              <td colspan="3" class="p-8 bg-slate-50/20 h-24"></td>
            </tr>
            <tr v-else v-for="(project, index) in projects" :key="project.id"
              class="hover:bg-slate-50/50 transition-colors group">
              <td class="p-8">
                <div class="flex items-center gap-6">
                  <span class="text-xs font-black text-primary italic">{{ formatIndex(index) }}</span>
                  <div class="relative w-20 h-14 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img :src="project.image" :alt="project.title" class="w-full h-full object-cover">
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <Icon :name="project.icon || 'heroicons:cube'" class="w-4 h-4 text-primary" />
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
                  <button @click="openModal(project)"
                    class="p-3 text-slate-300 hover:text-primary transition-all hover:bg-primary/5 rounded-xl">
                    <Icon name="solar:pen-new-square-bold" class="w-6 h-6" />
                  </button>
                  <button @click="handleDelete(project.id)"
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
                  <label class="label-style">Full Story Paragraph 1</label>
                  <textarea v-model="formData.full_story_1" rows="3" class="form-input py-4"></textarea>
                </div>

                <div class="space-y-2 col-span-2">
                  <label class="label-style">Full Story Paragraph 2</label>
                  <textarea v-model="formData.full_story_2" rows="3" class="form-input py-4"></textarea>
                </div>
                <div class="space-y-2 col-span-2">
                  <label class="label-style">Tech Stack (pisahkan dengan koma)</label>
                  <input :value="formData.tech_stack.join(', ')"
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
    const { data, error } = await supabase
      .from('projects')
      .select('*, project_details(*)')
      .order('created_at', { ascending: false })

    if (error) throw error
    projects.value = data || []
  } catch (e: any) {
    toast.error('Error fetching projects', { description: e.message })
  } finally {
    isLoading.value = false
  }
}

const openModal = (project: any = null) => {
  isEditMode.value = !!project
  if (project) {
    Object.assign(formData, project)
    if (project.project_details) {
      formData.category = project.project_details.category
      formData.description = project.project_details.description
      formData.full_story_1 = project.project_details.full_story_1
      formData.full_story_2 = project.project_details.full_story_2
      formData.tech_stack = project.project_details.tech_stack || []
    }
  } else {
    resetForm()
  }
  isModalOpen.value = true
}

const resetForm = () => {
  Object.assign(formData, {
    id: undefined,
    title: '',
    category: '',
    impact: '',
    impactLabel: '',
    description: '',
    icon: 'heroicons:cube',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
  })
}

const saveProject = async () => {
  if (!formData.title || !formData.category) return
  isSubmitting.value = true

  try {
    const mainData = {
      title: formData.title,
      impact: formData.impact,
      impact_label: formData.impact_label,
      icon: formData.icon,
      image: formData.image
    }

    let projectId = formData.id

    if (isEditMode.value && projectId) {
      await supabase.from('projects').update(mainData).eq('id', projectId)
    } else {
      const { data, error } = await supabase.from('projects').insert([mainData]).select().single()
      if (error) throw error
      projectId = data.id
    }

    const detailData = {
      project_id: projectId,
      category: formData.category,
      description: formData.description,
      full_story_1: formData.full_story_1,
      full_story_2: formData.full_story_2,
      tech_stack: formData.tech_stack
    }

    const { error: detailError } = await supabase
      .from('project_details')
      .upsert([detailData], { onConflict: 'project_id' })

    if (detailError) throw detailError

    toast.success('Project berhasil disimpan')
    await fetchProjects()
    isModalOpen.value = false
  } catch (e: any) {
    toast.error(e.message)
  } finally {
    isSubmitting.value = false
  }
}

const handleDelete = async (id: string | number | undefined) => {
  if (!id || !confirm('Delete this project permanently?')) return

  try {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) throw error
    await fetchProjects()
  } catch (e: any) {
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
</style>