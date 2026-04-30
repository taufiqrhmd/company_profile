<template>
  <div class="flex h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased overflow-hidden">
    <Toaster position="top-center" richColors :expand="true" :style="{ zIndex: 9999 }" />
    <Sidebar :isOpen="isMobileMenuOpen" @close="isMobileMenuOpen = false" />

    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <header class="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 lg:px-8 shrink-0">
        <div class="flex items-center gap-4">
          <button @click="isMobileMenuOpen = true" class="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg">
            <Icon name="solar:hamburger-menu-linear" class="w-6 h-6" />
          </button>
          <div class="hidden sm:block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Console <span class="mx-2 text-slate-200">/</span> {{ route.name || 'Overview' }}
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="text-right">
            <p class="text-[11px] font-bold text-slate-900 leading-none">
              {{ adminUser?.full_name || 'Loading...' }}
            </p>
            <p class="text-[9px] text-primary font-bold uppercase tracking-tighter">
              {{ adminUser?.role?.replace('_', ' ') || 'Account' }}
            </p>
          </div>
          <button @click="isProfileOpen = true"
            class="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all duration-300 group">
            <Icon name="solar:user-bold" class="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </header>

      <div class="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar">
        <slot />
      </div>
    </main>
    <ProfileModal v-model="isProfileOpen" :user="adminUser" />
  </div>
</template>

<script setup>
import { Toaster } from 'vue-sonner'
import ProfileModal from '~/components/layout/admin/ProfileModal.vue'
import Sidebar from '~/components/layout/admin/Sidebar.vue'
const route = useRoute()
const isMobileMenuOpen = ref(false)
const isProfileOpen = ref(false)

const adminUser = useState('adminUser')

watch(() => route.path, () => { isMobileMenuOpen.value = false })
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E2E8F0;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #D4A32E;
}
</style>