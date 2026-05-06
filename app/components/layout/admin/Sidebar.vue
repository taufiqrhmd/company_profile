<template>
  <aside
    class="fixed lg:static inset-y-0 left-0 bg-white dark:bg-[#16191E] border-r border-slate-200 dark:border-white/5 flex flex-col z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
    :class="[
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      isCollapsed ? 'lg:w-20' : 'lg:w-64'
    ]">

    <div class="h-16 flex items-center px-6 relative overflow-hidden">
      <div class="flex items-center gap-3 min-w-max">
        <div
          class="w-8 h-8 bg-primary rounded-lg flex-shrink-0 flex items-center justify-center text-black font-black italic shadow-lg shadow-primary/20">
          D</div>
        <span class="text-slate-900 dark:text-white font-bold tracking-tight uppercase transition-all duration-300"
          :class="isCollapsed ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'">
          Excellent<span class="text-primary">.</span>
        </span>
      </div>

      <button @click="$emit('update:isCollapsed', !isCollapsed)"
        class="hidden lg:flex absolute -right-0 top-1/2 -translate-y-1/2 w-8 h-12 bg-transparent items-center justify-center text-slate-300 hover:text-primary transition-colors">
        <Icon :name="isCollapsed ? 'solar:alt-arrow-right-bold' : 'solar:alt-arrow-left-bold'" class="w-4 h-4" />
      </button>
    </div>

    <nav class="flex-1 px-3 space-y-1 mt-6 overflow-x-hidden custom-scrollbar">
      <NuxtLink v-for="item in filteredMenu" :key="item.path" :to="item.path"
        class="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative whitespace-nowrap"
        :class="route.path === item.path
          ? 'bg-primary text-black font-bold shadow-lg shadow-primary/10'
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'">

        <Icon :name="item.icon" class="w-6 h-6 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />

        <div class="transition-all duration-300 ease-in-out overflow-hidden"
          :class="isCollapsed ? 'max-w-0 opacity-0' : 'max-w-[200px] opacity-100'">
          <span class="text-[11px] uppercase tracking-wider">{{ item.name }}</span>
        </div>

        <div v-if="isCollapsed"
          class="absolute left-14 invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-slate-900 dark:bg-primary text-white dark:text-black text-[10px] px-3 py-2 rounded-lg transition-all duration-300 whitespace-nowrap z-[100] translate-x-2 group-hover:translate-x-0 shadow-xl font-bold">
          {{ item.name }}
        </div>
      </NuxtLink>
    </nav>

    <div class="p-3 mt-auto border-t border-slate-100 dark:border-white/5">
      <button @click="isLogoutModalOpen = true"
        class="flex items-center gap-3 px-3 py-3 w-full text-slate-400 hover:text-red-500 transition-all duration-300 group relative overflow-hidden">
        <Icon name="solar:logout-3-bold" class="w-6 h-6 flex-shrink-0" />
        <div class="transition-all duration-300 overflow-hidden"
          :class="isCollapsed ? 'max-w-0 opacity-0' : 'max-w-[200px] opacity-100'">
          <span class="text-[11px] font-bold uppercase tracking-widest">Sign Out</span>
        </div>
      </button>
    </div>
  </aside>

  <Transition name="fade">
    <div v-if="isLogoutModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="isLogoutModalOpen = false"></div>
      <div
        class="relative bg-white dark:bg-[#16191E] p-8 rounded-3xl max-w-sm w-full shadow-2xl border border-slate-200 dark:border-white/5">
        <div class="text-center">
          <div
            class="w-20 h-20 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="solar:danger-triangle-bold-duotone" class="w-10 h-10" />
          </div>
          <h3 class="text-slate-900 dark:text-white font-bold text-xl mb-2">Konfirmasi Keluar</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm mb-8">Apakah Anda yakin ingin keluar? Sesi Anda akan
            berakhir sekarang.</p>

          <div class="flex gap-3">
            <button @click="isLogoutModalOpen = false"
              class="flex-1 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
              Batal
            </button>
            <button @click="handleLogout"
              class="flex-1 px-4 py-3 rounded-2xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-shadow hover:shadow-lg hover:shadow-red-200">
              Ya, Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { toast } from 'vue-sonner';
// 1. Definisikan interface untuk tipe data Admin
interface AdminUser {
  role: string;
  username: string;
  // tambahkan field lain jika perlu
}

const route = useRoute()
const isLogoutModalOpen = ref(false)

defineProps({
  isOpen: Boolean,
  isCollapsed: Boolean
})
defineEmits(['close', 'update:isCollapsed'])

const adminUser = useState<AdminUser | null>('adminUser')

const menuItems = [
  { name: 'Dashboard', path: '/admin', icon: 'solar:widget-5-linear', roles: ['super_admin', 'editor'] },
  { name: 'Projects', path: '/admin/projects', icon: 'solar:folder-linear', roles: ['editor'] },
  { name: 'Services', path: '/admin/services', icon: 'solar:clapperboard-edit-linear', roles: ['editor'] },
  { name: 'Messages', path: '/admin/messages', icon: 'solar:letter-linear', roles: ['super_admin'] },
]

const filteredMenu = computed(() => {
  // Gunakan optional chaining (?.) untuk menghindari error jika null
  if (!adminUser.value?.role) return []
  return menuItems.filter(item => item.roles.includes(adminUser.value!.role))
})

const handleLogout = async () => {
  isLogoutModalOpen.value = false

  try {
    await $fetch('/api/auth/logout', { method: 'POST' })

    // 3. Cukup akses adminUser yang sudah didefinisikan di atas
    // Tidak perlu deklarasi ulang 'const adminUser = ...' di dalam fungsi
    adminUser.value = null

    toast.success('Berhasil Keluar')
    setTimeout(() => {
      navigateTo('/admin/login', { replace: true })
    }, 1000)
  } catch (err: unknown) {
    toast.error('Gagal Logout')
  }
}

onMounted(async () => {
  const adminUser = useState<AdminUser | null>('adminUser')
  const token = useCookie<string | null>('auth_token')
  const supabase = useSupabaseClient()

  if (token.value && !adminUser.value) {
    try {
      const base64Content = token.value.replace('token-', '')
      const username = atob(base64Content)
      const { data,error } = await supabase.from('admin_accounts').select('*').eq('username', username).single()
      if (error) throw error
      if (data) adminUser.value = data as AdminUser
    } catch (e) {
      console.error("Auth sync error", e)
    }
  }
})
</script>