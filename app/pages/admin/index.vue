<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
          System Dashboard
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Summary report of system activity and performance.
        </p>
      </div>
      <div
        class="px-4 py-2 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/5 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-3">
        <div class="flex h-2 w-2 relative">
          <span class="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </div>
        Auto-sync: <span class="text-green-500">Active</span>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div @click="rawStats.unreadMessages > 0 ? navigateTo('/admin/messages?filter=Unread') : null" :class="[
        'p-6 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/5 rounded-xl shadow-sm overflow-hidden relative group transition-all',
        rawStats.unreadMessages > 0 ? 'cursor-pointer hover:border-primary/50' : 'cursor-default'
      ]">
        <Icon name="solar:letter-unread-bold-duotone"
          class="absolute -right-4 -bottom-4 w-20 h-20 text-slate-100 dark:text-white/5 transition-colors"
          :class="rawStats.unreadMessages > 0 ? 'group-hover:text-primary/10' : ''" />

        <div class="relative z-10">
          <div class="flex justify-between items-start mb-4">
            <div class="p-2 bg-slate-50 dark:bg-white/5 rounded-lg transition-colors"
              :class="rawStats.unreadMessages > 0 ? 'group-hover:bg-primary/20' : ''">
              <Icon name="solar:letter-unread-bold-duotone" class="w-5 h-5 text-slate-400 transition-colors"
                :class="rawStats.unreadMessages > 0 ? 'group-hover:text-primary' : ''" />
            </div>
            <span class="text-[9px] font-black uppercase tracking-tighter"
              :class="rawStats.unreadMessages > 0 ? 'text-primary' : 'text-green-500'">
              {{ rawStats.unreadMessages > 0 ? 'Review Needed' : 'Clear' }}
            </span>
          </div>
          <p class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">New Messages</p>

          <h3 class="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {{ Math.round(animatedMessages) }}
          </h3>
        </div>
      </div>

      <div v-for="(stat, index) in filteredStats" :key="index"
        class="p-6 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/5 rounded-xl shadow-sm overflow-hidden relative group hover:border-primary/50">
        <Icon :name="stat.icon"
          class="absolute -right-4 -bottom-4 w-20 h-20 text-slate-100 dark:text-white/5 group-hover:text-primary/10" />
        <div class="relative z-10">
          <div class="flex justify-between items-start mb-4">
            <div class="p-2 bg-slate-50 dark:bg-white/5 rounded-lg">
              <Icon :name="stat.icon" class="w-5 h-5 text-slate-400 group-hover:text-primary" />
            </div>
            <span class="text-[9px] font-black uppercase tracking-tighter" :class="stat.trendColor">
              {{ stat.trend }}
            </span>
          </div>
          <p class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{{ stat.title }}
          </p>
          <h3 class="text-2xl font-black text-slate-900 dark:text-white mt-1">{{ stat.value }}</h3>
        </div>
      </div>
    </div>

    <div
      class="p-8 bg-white dark:bg-[#16191E] rounded-xl border border-slate-200 dark:border-white/5 shadow-sm transition-colors">
      <div class="mb-6">
        <h4 class="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
          Total Visitor Analytics
        </h4>
        <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
          Swipe or scroll horizontally to explore history activity
        </p>
      </div>

      <div class="w-full overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">

        <div class="h-[320px] min-w-[1500px]">
          <ClientOnly v-if="loaded">
            <apexchart width="100%" height="100%" type="area" :options="chartOptions" :series="chartSeries" />
          </ClientOnly>
          <div v-else
            class="h-full w-full bg-slate-50 dark:bg-white/5 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center gap-3">
            <Icon name="solar:chart-2-bold-duotone"
              class="text-slate-200 dark:text-slate-800 w-12 h-12 animate-pulse" />
            <p class="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest">Generating
              Insights...</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, onMounted, computed, ref } from 'vue'
import { useTransition, TransitionPresets } from '@vueuse/core' // <-- Import modul animasi
import type { RealtimeChannel } from '@supabase/supabase-js'

definePageMeta({ layout: 'admin', middleware: ['auth'] })
useHead({ title: 'Dashboard' })

const supabase = useSupabaseClient()
const { rawStats, fetchDashboardData } = useAdminDashboard()
const { chartSeries, chartOptions } = useAdminChart()
const loaded = ref(false)

let dashboardChannel: RealtimeChannel | null = null

// ================= ANIMATED COUNTER CONTROLLER =================
// 1. Ambil nilai dasar dari data statis mentah
const baseMessages = computed(() => rawStats.value.unreadMessages)
const baseProjects = computed(() => rawStats.value.totalProjects)
const baseViews = computed(() => rawStats.value.totalViews)

// 2. Buat fungsi transisi interpolasi angka (0 -> target)
const animatedMessages = useTransition(baseMessages, {
  duration: 1000,
  transition: TransitionPresets.easeOutCubic,
})

const animatedProjects = useTransition(baseProjects, {
  duration: 1000,
  transition: TransitionPresets.easeOutCubic,
})

const animatedViews = useTransition(baseViews, {
  duration: 1200, // Sedikit lebih lama untuk angka bernilai besar
  transition: TransitionPresets.easeOutCubic,
})

// 3. Modifikasi filteredStats agar merender nilai yang sudah ter-animasi
const filteredStats = computed(() => [
  {
    title: 'Total Projects',
    // Gunakan Math.round agar angka desimal selama proses transisi dibulatkan menjadi angka bulat
    value: Math.round(animatedProjects.value),
    icon: 'solar:case-bold-duotone',
    trend: 'Live Status',
    trendColor: 'text-slate-400'
  },
  {
    title: 'Project Views',
    value: Math.round(animatedViews.value).toLocaleString(),
    icon: 'solar:chart-bold-duotone',
    trend: '+12% Growth',
    trendColor: 'text-green-500'
  },
  {
    title: 'Estimated Revenue',
    value: 'Rp 48.500.000', // Karena ini hardcoded string, biarkan tetap konstan
    icon: 'solar:wad-of-money-bold-duotone',
    trend: 'Target 85%',
    trendColor: 'text-amber-500'
  },
])

// ================= SYSTEM LOGIC (REALTIME & FETCH) =================
const subscribeRealtime = () => {
  if (dashboardChannel) {
    supabase.removeChannel(dashboardChannel)
  }

  dashboardChannel = supabase.channel('dashboard-realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, () => fetchDashboardData())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => fetchDashboardData())
    .subscribe()
}

onUnmounted(() => {
  if (dashboardChannel) {
    supabase.removeChannel(dashboardChannel)
    dashboardChannel = null
  }
})

onMounted(async () => {
  try {
    await fetchDashboardData()
    subscribeRealtime()
  } catch (error) {
    console.error('Failed to initialize dashboard stats:', error)
  } finally {
    loaded.value = true
  }
})
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  border-radius: 99px;
  background-color: rgba(156, 163, 175, 0.2);
}
</style>