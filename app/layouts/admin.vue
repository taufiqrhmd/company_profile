<template>
  <div class="min-h-screen font-sans antialiased">
    <div
      class="flex h-screen bg-[#F8FAFC] dark:bg-[#0F1115] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">

      <Toaster position="top-center" richColors :expand="true" :style="{ zIndex: 9999 }" />
      <LayoutAdminSidebar :isOpen="isMobileMenuOpen" v-model:isCollapsed="isSidebarCollapsed"
        @close="isMobileMenuOpen = false" />

      <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header
          class="h-16 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-[#16191E] flex items-center justify-between px-4 lg:px-8 shrink-0 transition-colors duration-300">
          <div class="flex items-center gap-4">
            <button @click="isMobileMenuOpen = true"
              class="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg">
              <Icon name="solar:hamburger-menu-linear" class="w-6 h-6" />
            </button>
            <div
              class="hidden sm:block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              Console <span class="mx-2 text-slate-200 dark:text-white/10">/</span> {{ route.name || 'Overview' }}
            </div>
          </div>

          <div class="flex items-center gap-3 lg:gap-6">
            <button @click="toggleColorMode()"
              class="group relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer items-center rounded-full bg-slate-200 dark:bg-slate-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-[#16191E]"
              aria-label="Toggle Color Mode">
              <div class="absolute inset-0 flex items-center justify-between px-1.5 text-slate-400/50">
                <Icon name="heroicons:sun-20-solid" class="w-3 h-3" />
                <Icon name="heroicons:moon-20-solid" class="w-3 h-3" />
              </div>

              <span
                class="pointer-events-none relative h-5 w-5 transform rounded-full bg-white dark:bg-primary shadow-lg ring-0 transition duration-300 ease-in-out flex items-center justify-center z-10"
                :class="colorMode.value === 'dark' ? 'translate-x-6' : 'translate-x-1'">
                <Icon :name="colorMode.value === 'dark' ? 'heroicons:moon-20-solid' : 'heroicons:sun-20-solid'"
                  class="w-3 h-3 transition-all duration-300"
                  :class="colorMode.value === 'dark' ? 'text-slate-900' : 'text-primary'" />
              </span>
            </button>

            <div class="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-white/10">
              <div class="text-right hidden xs:block">
                <p class="text-[11px] font-bold leading-none">{{ adminUser?.full_name || 'Admin' }}</p>
                <p class="text-[9px] text-primary font-bold uppercase tracking-tighter mt-1">
                  {{ adminUser?.role?.replace('_', ' ') || 'Staff' }}
                </p>
              </div>
              <button @click="isProfileOpen = true"
                class="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:border-primary transition-all group">
                <Icon name="solar:user-bold" class="w-5 h-5 group-hover:scale-110" />
              </button>
            </div>
          </div>
        </header>

        <div
          class="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar bg-[#F8FAFC] dark:bg-[#0F1115] transition-colors duration-300">
          <slot />
        </div>
      </main>

      <LayoutAdminProfileModal v-model="isProfileOpen" :user="adminUser" />
    </div>
  </div>
</template>

<script setup>
import { Toaster } from 'vue-sonner'
const route = useRoute()
const colorMode = useColorMode()

const isMobileMenuOpen = ref(false)
const isProfileOpen = ref(false)
const isSidebarCollapsed = ref(false) // State untuk dikirim ke sidebar

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

const adminUser = useState('adminUser')
watch(() => route.path, () => { isMobileMenuOpen.value = false })
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #1e293b;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #D4A32E;
}
</style>