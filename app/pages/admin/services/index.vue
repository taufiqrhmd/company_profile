<template>
  <div class="max-w-7xl mx-auto space-y-8 transition-colors duration-300">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-3xl font-black uppercase tracking-tighter dark:text-white">
          Studio Services
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm">Manage the main services displayed on the landing page.</p>
      </div>
      <button @click="fetchServices" class="p-2 text-slate-400 hover:text-primary transition-colors focus:outline-none">
        <Icon name="solar:refresh-linear" :class="{ 'animate-spin': isLoading }" class="w-6 h-6" />
      </button>
    </div>

    <div v-if="services.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="(service, index) in services" :key="service.id"
        class="bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/10 rounded-xl p-8 relative group hover:border-primary/50 transition-all shadow-sm">

        <div class="flex justify-between items-start mb-8">
          <span class="text-xs font-black text-primary italic">0{{ index + 1 }} //</span>
          <div
            class="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-black transition-all shadow-inner border border-transparent dark:border-white/10">
            <Icon :name="service.icon" class="w-6 h-6" />
          </div>
        </div>

        <div class="space-y-3">
          <h3 class="font-black uppercase italic text-xl text-slate-900 dark:text-white min-h-[1.5rem]">
            {{ service.title }}
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
            {{ service.description }}
          </p>
        </div>

        <div class="mt-8 pt-6 border-t border-slate-100 dark:border-white/10 flex justify-between items-center">
          <button @click="openEditModal(service)"
            class="group/btn flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary transition-all">
            <span>Edit Service</span>
            <Icon name="solar:pen-new-square-linear"
              class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
          <Icon name="solar:settings-linear" class="w-4 h-4 text-slate-300 dark:text-slate-600" />
        </div>
      </div>
    </div>

    <div v-else-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
      <div v-for="i in 3" :key="i" class="h-64 bg-slate-100 dark:bg-[#16191E] rounded-[2.5rem]"></div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isEditModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-slate-900/60 dark:bg-black/90 backdrop-blur-md"
            @click="isEditModalOpen = false"></div>

          <div
            class="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl max-w-lg w-full shadow-2xl">
            <div class="flex justify-between items-center mb-8">
              <h3 class="text-slate-900 dark:text-white font-black uppercase italic text-2xl tracking-tighter">
                Update <span class="text-primary">Service</span>
              </h3>
              <button @click="isEditModalOpen = false" class="text-black hover:text-slate-400">
                <Icon name="solar:close-circle-linear" class="w-6 h-6" />
              </button>
            </div>

            <div class="space-y-6">
              <div class="space-y-2">
                <label
                  class="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Service
                  Title</label>
                <input v-model="editForm.title"
                  class="w-full bg-slate-50 dark:bg-[#16191E] border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all">
              </div>

              <div class="space-y-3">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                  Select Icon
                </label>

                <!-- Preview & Current Selection -->
                <div
                  class="flex items-center gap-4 p-4 bg-slate-50 dark:bg-[#16191E] rounded-2xl border border-slate-200 dark:border-white/10">
                  <div
                    class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-black shadow-lg shadow-primary/20">
                    <Icon :name="editForm.icon || 'solar:Settings-linear'" class="w-6 h-6" />
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white">{{ editForm.icon }}</p>
                    <p class="text-[10px] text-slate-500">Ikon yang terpilih saat ini</p>
                  </div>
                </div>

                <!-- Icon Grid Picker -->
                <div class="grid grid-cols-5 gap-2 mt-2 max-h-40 overflow-y-auto p-1 custom-scrollbar">
                  <button v-for="iconName in availableIcons" :key="iconName" @click="editForm.icon = iconName"
                    type="button" :class="[
                      'p-3 rounded-xl flex items-center justify-center transition-all border',
                      editForm.icon === iconName
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-primary/50'
                    ]">
                    <Icon :name="iconName" class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div class="space-y-2">
                <label
                  class="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Description</label>
                <textarea v-model="editForm.description" rows="4"
                  class="w-full bg-slate-50 dark:bg-[#16191E] border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-primary/50 outline-none resize-none transition-all"></textarea>
              </div>
            </div>

            <div class="flex gap-4 mt-10">
              <button @click="isEditModalOpen = false"
                class="flex-1 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-[#16191E] text-slate-600 dark:text-slate-400 text-xs font-black uppercase hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                Cancel
              </button>
              <button @click="handleUpdate" :disabled="isUpdating"
                class="flex-3 px-8 py-4 rounded-2xl bg-primary text-black text-xs font-black uppercase hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                <Icon v-if="isUpdating" name="solar:refresh-bold" class="w-4 h-4 animate-spin" />
                {{ isUpdating ? 'Saving...' : 'Save Changes' }}
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

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

useHead({
  title: 'Services Management',
})

const services = ref<any[]>([])
const isLoading = ref(true)
const isUpdating = ref(false)
const isEditModalOpen = ref(false)

const availableIcons = [
  'solar:videocamera-record-bold-duotone',
  'solar:camera-minimalistic-bold-duotone',
  'solar:clapperboard-edit-bold-duotone',
  'solar:layers-bold-duotone',
  'solar:magic-stick-3-bold-duotone',
  'solar:palette-bold-duotone',
  'solar:globus-bold-duotone',
  'solar:ranking-bold-duotone',
  'solar:music-notes-bold-duotone',
  'solar:headphones-round-bold-duotone',
]

// Form data temp
const editForm = ref({
  id: '',
  title: '',
  description: '',
  icon: ''
})

const fetchServices = async () => {
  isLoading.value = true
  try {
    const data = await $fetch('/api/services')
    services.value = data || []
  } catch (e: any) {
    toast.error('Gagal memuat layanan', { description: e.message })
  } finally {
    isLoading.value = false
  }
}

const openEditModal = (service: any) => {
  editForm.value = { ...service }
  isEditModalOpen.value = true
}

const handleUpdate = async () => {
  if (!editForm.value.title || !editForm.value.description) {
    toast.error('Judul dan deskripsi harus diisi')
    return
  }

  isUpdating.value = true
  const toastId = toast.loading('Menyimpan perubahan...')

  try {
    await $fetch('/api/services/update', {
      method: 'PUT',
      body: editForm.value
    })

    toast.success('Layanan berhasil diperbarui', { id: toastId })
    isEditModalOpen.value = false
    await fetchServices()
  } catch (err: any) {
    toast.error('Update gagal: ' + err.message, { id: toastId })
  } finally {
    isUpdating.value = false
  }
}

onMounted(() => {
  fetchServices()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.flex-3 {
  flex: 3 1 0%;
}
</style>