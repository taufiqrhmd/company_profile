<template>
  <div class="max-w-7xl mx-auto space-y-8 transition-colors duration-300">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 class="text-3xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
          Project Vault
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm">Manage digital works and system impact metrics with
          precision.</p>
      </div>
      <BaseButton variant="primary" size="md" rounded="xl" icon="solar:add-circle-bold" iconPos="left"
        @click="openModal()">
        Add New Project
      </BaseButton>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="p-8 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/10 rounded-xl shadow-sm transition-colors">
        <p class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Total Works
        </p>
        <p class="text-4xl font-black italic dark:text-white tabular-nums">
          <span v-if="isLoading">...</span>
          <span v-else>{{ animatedTotal.toString().padStart(2, '0') }}</span>
        </p>
      </div>

      <div
        class="p-8 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/10 rounded-xl shadow-sm transition-colors">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Featured
              on Landing</p>
            <p class="text-4xl font-black italic text-primary tabular-nums">
              <span v-if="isLoading">...</span>
              <span v-else>{{ animatedFeatured.toString().padStart(2, '0') }}<span
                  class="text-sm font-medium text-slate-400 dark:text-slate-500">/04</span></span>
            </p>
          </div>
          <span
            class="text-[8px] bg-primary/10 text-primary px-2 py-1 rounded font-black uppercase tracking-wider animate-pulse">Live</span>
        </div>
      </div>

      <div
        class="p-8 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/10 rounded-xl shadow-sm transition-colors">
        <p class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Unique
          Categories</p>
        <p class="text-4xl font-black italic dark:text-white tabular-nums">
          <span v-if="isLoading">...</span>
          <span v-else>{{ animatedCategories.toString().padStart(2, '0') }}</span>
        </p>
      </div>
    </div>

    <LayoutAdminProjectsProjectTable :items="paginatedProjects" :loading="isLoading" :current-page="currentPage"
      :items-per-page="itemsPerPage" :total-pages="totalPages" :total-items="projects.length" @edit="openModal"
      @delete="handleDelete" @prev-page="prevPage" @next-page="nextPage" />

    <LayoutAdminProjectsProjectModal :is-open="isModalOpen" :is-edit-mode="isEditMode" :is-submitting="isSubmitting"
      :form="formData" :errors="errors" :image-preview="imagePreview" v-model:techStack="techStackInput"
      :icon-presets="iconPresets" @close="isModalOpen = false" @submit="saveProject"
      @update:formField="handleFormFieldUpdate" @file-change="handleFileChangeUpdate" @clear-error="clearError" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, h, resolveComponent, watch, reactive } from 'vue'
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'admin' })
useHead({ title: 'Project Vault' })

// State & Utilities dari source awal Anda
const { formData, isModalOpen, isEditMode, selectedFile, imagePreview, resetForm, populateForm } = useProjectForm()

const supabase = useSupabaseClient<any>()
const projects = ref<any[]>([])
const isLoading = ref<boolean>(true)
const isSubmitting = ref<boolean>(false)
const techStackInput = ref('')
const IconComponent = resolveComponent('Icon')

const currentPage = ref(1)
const itemsPerPage = ref(5)
const { animateValue } = useAnimatedCounter()
const animatedTotal = ref(0)
const animatedFeatured = ref(0)
const animatedCategories = ref(0)

const errors = reactive({
  title: '', category: '', image: '', impact: '',
  impact_label: '', description: '', full_story_1: '', full_story_2: '', tech_stack: ''
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

// Sinkronisasi mutasi data dari Form Anak ke state Utama
const handleFormFieldUpdate = ({ field, value }: { field: keyof typeof errors, value: any }) => {
  formData[field] = value
}

const handleFileChangeUpdate = (file: File) => {
  selectedFile.value = file
  imagePreview.value = URL.createObjectURL(file)
  clearError('image')
}

const clearError = (field: keyof typeof errors) => { errors[field] = '' }
const clearAllErrors = () => { Object.keys(errors).forEach((key) => { errors[key as keyof typeof errors] = '' }) }

const validateProjectForm = (): boolean => {
  clearAllErrors()
  let isValid = true
  if (!formData.title?.trim()) { errors.title = 'Project title is required.'; isValid = false }
  if (!formData.category?.trim()) { errors.category = 'Category is required.'; isValid = false }
  if (!isEditMode.value && !selectedFile.value) { errors.image = 'Project thumbnail image is required.'; isValid = false }
  if (!formData.impact?.trim()) { errors.impact = 'Impact metric dashboard value is required (e.g., +45%).'; isValid = false }
  if (!formData.impact_label?.trim()) { errors.impact_label = 'Impact metrics context label is required.'; isValid = false }
  if (!formData.description?.trim() || formData.description.trim().length < 20) { errors.description = 'Brief description should be at least 20 characters long.'; isValid = false }
  if (!formData.full_story_1?.trim()) { errors.full_story_1 = 'Challenge context description is required.'; isValid = false }
  if (!formData.full_story_2?.trim()) { errors.full_story_2 = 'Solution / final results description is required.'; isValid = false }
  if (!techStackInput.value?.trim()) { errors.tech_stack = 'Please include at least one technology asset.'; isValid = false }
  return isValid
}

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return (projects.value || []).slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => Math.ceil(projects.value.length / itemsPerPage.value) || 1)
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }

const fetchProjects = async () => {
  isLoading.value = true
  try {
    const data = await $fetch('/api/projects')
    projects.value = data || []
    if (currentPage.value > totalPages.value) currentPage.value = totalPages.value
  } catch (e: any) {
    toast.error('Error fetching projects', { description: e.message })
  } finally {
    isLoading.value = false
  }
}

const uploadImage = async (file: File) => {
  const fileExt = file.name.split('.').pop()
  const filePath = `uploads/${Math.random()}.${fileExt}`
  const { error } = await supabase.storage.from('project-assets').upload(filePath, file)
  if (error) throw error
  const { data: publicUrl } = supabase.storage.from('project-assets').getPublicUrl(filePath)
  return publicUrl.publicUrl
}

const openModal = (project: any = null) => {
  isEditMode.value = !!project
  clearAllErrors()
  if (project) {
    populateForm(project)
    const details = project.project_details || project
    techStackInput.value = details.tech_stack ? details.tech_stack.join(', ') : ''
  } else {
    resetForm()
    techStackInput.value = ''
    formData.icon = 'heroicons:shopping-bag'
  }
  isModalOpen.value = true
}

const saveProject = async () => {
  if (!validateProjectForm()) {
    toast.warning('Please complete all fields with valid configurations.')
    return
  }
  isSubmitting.value = true
  const toastId = toast.loading('Saving project to vault...')
  try {
    if (selectedFile.value) formData.image = await uploadImage(selectedFile.value)
    const techArray = techStackInput.value.split(',').map(s => s.trim()).filter(s => s !== '')

    const { category, description, full_story_1, full_story_2, ...mainFields } = formData
    const mainData = { title: mainFields.title, impact: mainFields.impact, impact_label: mainFields.impact_label, icon: mainFields.icon, image: mainFields.image }
    const detailData = { category, description, tech_stack: techArray, full_story_1, full_story_2 }

    const method = isEditMode.value ? 'PUT' : 'POST'
    const endpoint = isEditMode.value ? `/api/projects/${formData.id}` : '/api/projects/create'

    await $fetch(endpoint, { method, body: { mainData, detailData } })
    toast.success(isEditMode.value ? 'Project updated within the vault!' : 'New project successfully published!', { id: toastId })
    isModalOpen.value = false
    await fetchProjects()
  } catch (e: any) {
    toast.error('Failed: ' + (e.data?.message || e.message), { id: toastId })
  } finally {
    isSubmitting.value = false
  }
}

const handleDelete = (id: string | number | undefined) => {
  if (!id) return
  const toastId = toast.custom(() => {
    return h('div', { class: 'p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg flex flex-col gap-4 w-[350px]' }, [
      h('div', { class: 'flex items-start gap-3' }, [
        h(IconComponent, { name: 'heroicons:exclamation-triangle-20-solid', class: 'w-5 h-5 text-amber-500 shrink-0 mt-0.5' }),
        h('div', { class: 'flex flex-col gap-1' }, [
          h('h3', { class: 'text-sm font-semibold text-zinc-950 dark:text-zinc-50' }, 'Are you sure you want to delete this project?'),
          h('p', { class: 'text-xs text-zinc-500 dark:text-zinc-400' }, 'This action will permanently delete the data.')
        ])
      ]),
      h('div', { class: 'flex justify-end gap-2' }, [
        h('button', { class: 'px-3 py-1.5 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800', onClick: () => toast.dismiss(toastId) }, 'Cancel'),
        h('button', { class: 'px-3 py-1.5 text-xs font-white bg-red-600 rounded-md text-white', onClick: () => { executeDelete(id); toast.dismiss(toastId) } }, 'Delete Now')
      ])
    ])
  }, { duration: Infinity })
}

const executeDelete = async (id: string | number) => {
  const deleteToast = toast.loading('Currently deleting...')
  try {
    const projectToDelete = projects.value.find(p => p.id === id)
    if (projectToDelete?.image) {
      const urlParts = projectToDelete.image.split('project-assets/')
      if (urlParts.length > 1) await supabase.storage.from('project-assets').remove([urlParts[1]])
    }
    await $fetch(`/api/projects/${id}`, { method: 'DELETE' })
    toast.success('Project successfully deleted', { id: deleteToast })
    await fetchProjects()
  } catch (e: any) {
    toast.error('Failed: ' + (e.data?.message || e.message), { id: deleteToast })
  }
}

watch(projects, (newProjects) => {
  if (newProjects && newProjects.length > 0) {
    const targetTotal = newProjects.length
    const targetFeatured = Math.min(newProjects.length, 4) // Asumsi max 4 di dashboard
    const targetCategories = new Set(newProjects.map(p => (p.project_details?.category || 'General').trim().toLowerCase())).size

    // Jalankan animasi
    animateValue(0, targetTotal, 1200, (val) => animatedTotal.value = val)
    animateValue(0, targetFeatured, 1200, (val) => animatedFeatured.value = val)
    animateValue(0, targetCategories, 1200, (val) => animatedCategories.value = val)
  } else {
    animatedTotal.value = 0
    animatedFeatured.value = 0
    animatedCategories.value = 0
  }
}, { deep: true })

onMounted(fetchProjects)
</script>