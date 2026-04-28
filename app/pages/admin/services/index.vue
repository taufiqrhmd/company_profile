<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-3xl font-black italic uppercase tracking-tighter">
          Studio <span class="text-primary">Services</span>
        </h2>
        <p class="text-slate-500 text-sm">Kelola layanan utama yang ditampilkan di landing page.</p>
      </div>
      <button @click="fetchServices" class="p-2 text-slate-400 hover:text-primary transition-colors">
        <Icon name="solar:refresh-linear" :class="{ 'animate-spin': isLoading }" />
      </button>
    </div>

    <div v-if="services.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="(service, index) in services" :key="service.id" 
        class="bg-white border border-slate-200 rounded-[2.5rem] p-8 relative group hover:border-primary/50 transition-all shadow-sm">
        
        <div class="flex justify-between items-start mb-8">
          <span class="text-xs font-black text-primary italic">0{{ index + 1 }} //</span>
          <div class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-black transition-all shadow-inner">
            <Icon :name="service.icon" class="w-6 h-6" />
          </div>
        </div>

        <div class="space-y-4">
          <div class="relative">
            <label class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Service Title</label>
            <input v-model="service.title" class="w-full bg-transparent border-none p-0 font-black uppercase italic text-xl focus:ring-0 text-slate-900 placeholder:opacity-30">
          </div>
          
          <div class="relative">
            <label class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Description</label>
            <textarea v-model="service.description" rows="3" class="w-full bg-transparent border-none p-0 text-sm text-slate-500 leading-relaxed focus:ring-0 resize-none placeholder:opacity-30"></textarea>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
          <button 
            @click="prepareUpdate(service)"
            :disabled="isUpdating"
            class="text-[10px] font-black uppercase tracking-widest text-primary hover:tracking-[0.2em] transition-all disabled:opacity-50"
          >
            Update Info
          </button>
          <Icon name="solar:settings-linear" class="w-4 h-4 text-slate-300" />
        </div>
      </div>
    </div>

    <div v-else-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
       <div v-for="i in 3" :key="i" class="h-64 bg-slate-100 rounded-[2.5rem]"></div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isUpdateModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="isUpdateModalOpen = false"></div>
          
          <div class="relative bg-white border border-slate-200 p-8 rounded-[2rem] max-w-sm w-full shadow-2xl text-center">
            <div class="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="solar:cloud-upload-bold" class="w-8 h-8" />
            </div>
            <h3 class="text-slate-900 font-black uppercase italic text-lg mb-2">Simpan Perubahan?</h3>
            <p class="text-slate-500 text-sm mb-6 leading-relaxed">
              Layanan <b>{{ selectedService?.title }}</b> akan segera diperbarui secara real-time.
            </p>
            
            <div class="flex gap-3">
              <button @click="isUpdateModalOpen = false" 
                class="flex-1 px-4 py-3 rounded-xl bg-slate-100 text-slate-600 text-xs font-black uppercase hover:bg-slate-200 transition-all">
                Batal
              </button>
              <button @click="confirmUpdate" 
                class="flex-1 px-4 py-3 rounded-xl bg-primary text-black text-xs font-black uppercase hover:shadow-lg hover:shadow-primary/30 transition-all">
                Konfirmasi
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
  // Pastikan admin sudah terproteksi melalui middleware
  middleware: 'auth' 
})

const supabase = useSupabaseClient<any>()
const services = ref<any[]>([])
const isLoading = ref(true)
const isUpdating = ref(false)
const isUpdateModalOpen = ref(false)
const selectedService = ref<any>(null)

// 1. Ambil Data (Clean)
const fetchServices = async () => {
  isLoading.value = true
  try {
    // Memanggil Server API Route kita
    const data = await $fetch('/api/services')
    console.log('Data dari API:', data)
    services.value = data || []
  } catch (e: any) {
    toast.error('Error fetching services', { description: e.message })
  } finally {
    isLoading.value = false
  }
}

// 2. Persiapan Update
const prepareUpdate = (service: any) => {
  selectedService.value = { ...service } // Shallow copy agar tidak binding langsung ke list saat edit batal
  isUpdateModalOpen.value = true
}

// 3. Eksekusi Update
const confirmUpdate = async () => {
  isUpdateModalOpen.value = false
  const toastId = toast.loading('Saving...')

  try {
    // Panggil API internal, bukan langsung ke Supabase
    await $fetch('/api/services/update', {
      method: 'PUT',
      body: {
        id: selectedService.value.id,
        title: selectedService.value.title,
        description: selectedService.value.description,
        icon: selectedService.value.icon
      }
    })
    toast.success('Updated via Secure Server Route', { id: toastId })
  } catch (err) {
    toast.error('Update failed', { id: toastId })
  }
}

onMounted(() => {
  fetchServices()
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>