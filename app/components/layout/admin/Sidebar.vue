<template>
  <div v-if="isOpen" @click="$emit('close')"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"></div>

  <aside
    class="fixed lg:static inset-y-0 left-0 w-64 bg-[#0F1115] border-r border-white/5 flex flex-col z-50 transition-transform duration-300 transform"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'">
    <div class="p-8">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-black font-black italic">D</div>
        <span class="text-white font-bold tracking-tight uppercase">Excellent<span class="text-primary">.</span></span>
      </div>
    </div>

    <nav class="flex-1 px-4 space-y-1">
      <NuxtLink v-for="item in filteredMenu" :key="item.path" :to="item.path"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
        :class="route.path === item.path ? 'bg-primary text-black font-bold' : 'text-slate-400 hover:bg-white/5 hover:text-white'">
        <Icon :name="item.icon" class="w-5 h-5" />
        <span class="text-xs uppercase tracking-wider">{{ item.name }}</span>
      </NuxtLink>
    </nav>

    <div class="p-4 mt-auto border-t border-white/5">
      <button @click="handleLogout"
        class="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-400 transition-colors group">
        <Icon name="solar:logout-3-bold" class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span class="text-xs font-bold uppercase tracking-widest">Sign Out</span>
      </button>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const route = useRoute()
defineProps(['isOpen'])
defineEmits(['close'])

// Ambil state adminUser yang sudah kita set di middleware/login
const adminUser = useState<any>('adminUser')

const menuItems = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: 'solar:widget-5-linear',
    roles: ['super_admin', 'editor'] // Bisa diakses keduanya
  },
  {
    name: 'Projects',
    path: '/admin/projects',
    icon: 'solar:folder-linear',
    roles: ['editor'] // Khusus editor
  },
  {
    name: 'Services',
    path: '/admin/services',
    icon: 'solar:clapperboard-edit-linear',
    roles: ['editor'] // Khusus editor
  },
  {
    name: 'Messages',
    path: '/admin/messages',
    icon: 'solar:letter-linear',
    roles: ['super_admin'] // Khusus super_admin (untuk memantau)
  },
]

// Filter menu berdasarkan role user
const filteredMenu = computed(() => {
  if (!adminUser.value || !adminUser.value.role) return []
  
  return menuItems.filter(item => 
    item.roles.includes(adminUser.value.role)
  )
})

const handleLogout = () => {
  const authToken = useCookie('auth_token')
  const userState = useState('adminUser')

  authToken.value = null
  userState.value = null // Bersihkan state saat logout
  navigateTo('/admin/login')
}

onMounted(async () => {
  const adminUser = useState<any>('adminUser')
  const token = useCookie('auth_token')
  const supabase = useSupabaseClient()

  if (token.value && !adminUser.value) {
    const base64Content = token.value.replace('token-', '')
    const username = atob(base64Content)
    
    const { data } = await supabase
      .from('admin_accounts')
      .select('*')
      .eq('username', username)
      .single()
      
    if (data) adminUser.value = data
  }
})
</script>