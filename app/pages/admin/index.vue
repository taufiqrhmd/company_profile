<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
          System Dashboard
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Summary report of system activity and performance.
        </p>
      </div>
      <div class="flex items-center align-middle gap-3 self-start md:self-auto">
        <button @click="handleManualRefresh" :disabled="refreshing || !loaded"
          class=" text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          title="Refresh Data">
          <Icon name="solar:refresh-linear" class="w-5 h-5" :class="{ 'animate-spin text-primary': refreshing }" />
        </button>

        <div
          class="px-4 py-2 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/5 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-3">
          <div class="flex h-2 w-2 relative">
            <span class="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          Auto-sync: <span class="text-green-500">Active</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <div
        class="lg:col-span-2 p-8 bg-white dark:bg-[#16191E] rounded-xl border border-slate-200 dark:border-white/5 shadow-sm transition-colors">
        <div class="mb-6">
          <h4 class="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
            Total Visitor Analytics
          </h4>
          <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
            Swipe or scroll horizontally to explore history activity
          </p>
        </div>

        <div class="w-full overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">
          <div class="h-[320px] min-w-[1000px] lg:min-w-full relative">
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

      <div
        class="p-8 bg-white dark:bg-[#16191E] rounded-xl border border-slate-200 dark:border-white/5 shadow-sm flex flex-col justify-between transition-colors">
        <div>
          <div class="flex justify-between items-start mb-6">
            <div class="p-2 bg-amber-500/10 rounded-lg">
              <Icon name="solar:users-group-rounded-bold-duotone" class="w-5 h-5 text-amber-500" />
            </div>
            <span
              class="text-[9px] font-black uppercase tracking-tighter text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded">
              Popularity Rate
            </span>
          </div>

          <p class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Avg. Engagement
          </p>
          <h3 class="text-3xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">
            {{ animatedEngagement.toFixed(1) }}
            <span class="text-xs font-bold text-slate-400 dark:text-slate-500 ml-1 italic normal-case">views /
              proj</span>
          </h3>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-2 leading-relaxed">
            Realtime performance index of digital interactions across active portfolio assets.
          </p>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-100 dark:border-white/5">
          <ClientOnly v-if="loaded">
            <apexchart width="100%" height="80" type="area" :options="miniChartOptions" :series="miniChartSeries" />
          </ClientOnly>
          <div v-else class="h-20 w-full bg-slate-50 dark:bg-white/5 rounded-lg animate-pulse" />
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, onMounted, computed, ref } from 'vue'
import { useTransition, TransitionPresets, useDebounceFn } from '@vueuse/core'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'admin', middleware: ['auth'] })
useHead({ title: 'Dashboard' })

const supabase = useSupabaseClient()
const { rawStats, fetchDashboardData } = useAdminDashboard()
const { chartSeries, chartOptions, fetchChartData } = useAdminChart()
const loaded = ref(false)
const refreshing = ref(false)

let dashboardChannel: RealtimeChannel | null = null

// ================= ANIMATED COUNTER CONTROLLER =================
const baseMessages = computed(() => rawStats.value.unreadMessages)
const baseProjects = computed(() => rawStats.value.totalProjects)
const baseViews = computed(() => rawStats.value.totalViews)

const baseEngagement = computed(() => {
  const totalViews = baseViews.value
  const viewedCount = rawStats.value.viewedProjectsCount || 0

  if (viewedCount === 0 || totalViews === 0) return 0
  return totalViews / viewedCount
})

const animatedMessages = useTransition(baseMessages, { duration: 1000, transition: TransitionPresets.easeOutCubic })
const animatedProjects = useTransition(baseProjects, { duration: 1000, transition: TransitionPresets.easeOutCubic })
const animatedViews = useTransition(baseViews, { duration: 1200, transition: TransitionPresets.easeOutCubic })
const animatedEngagement = useTransition(baseEngagement, { duration: 1400, transition: TransitionPresets.easeOutCubic })

// filteredStats dikurangi menjadi 2 objek saja untuk mengisi baris atas secara proposional
const filteredStats = computed(() => [
  {
    title: 'Total Projects',
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
  }
])

// ================= MINI SPARKLINE CHART CONFIGURATION =================
const miniChartSeries = ref([
  {
    name: 'Avg. Engagement',
    data: [1.2, 1.4, 1.3, 1.8, 1.5, 2.1, 1.7] // Simulasi data tren historis desimal
  }
])

const miniChartOptions = computed(() => ({
  chart: {
    type: 'area',
    sparkline: { enabled: true }, // Menghilangkan semua garis tepi, grid, teks sumbu X/Y
    animations: { enabled: true, easing: 'easeinout', speed: 800 }
  },
  stroke: { curve: 'smooth', width: 2 },
  fill: {
    type: 'gradient',
    gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.0, stops: [0, 90, 100] }
  },
  colors: ['#f59e0b'], // Warna Amber disesuaikan tema Popularity
  tooltip: {
    fixed: { enabled: false },
    x: { show: false },
    y: {
      formatter: (val: number) => `${val.toFixed(1)} views / proj`
    },
    marker: { show: false }
  }
}))

const handleManualRefresh = async () => {
  if (refreshing.value) return
  refreshing.value = true

  try {
    const toastId = toast.loading('Saving changes...')
    // Panggil ulang repositori data dashboard
    await Promise.all([
      fetchDashboardData(),
      fetchChartData()
    ])

    // Sinkronkan ulang data historis mini sparkline ekor terakhir
    const targetSeries = miniChartSeries.value[0]
    if (targetSeries && baseEngagement.value > 0) {
      const currentData = [...targetSeries.data]
      currentData[currentData.length - 1] = Number(baseEngagement.value.toFixed(1))
      targetSeries.data = currentData
    }

    toast.success('Metrics successfully updated', { id: toastId })
  } catch (error) {
    console.error('Manual refresh failed:', error)
    toast.error('Failed to sync system data')
  } finally {
    refreshing.value = false
  }
}

const debouncedFetch = useDebounceFn(() => {
  fetchDashboardData()
}, 2000)

// ================= SYSTEM LOGIC (REALTIME & FETCH) =================
const subscribeRealtime = () => {
  if (dashboardChannel) {
    supabase.removeChannel(dashboardChannel)
  }

  dashboardChannel = supabase.channel('dashboard-realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, () => debouncedFetch())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => debouncedFetch())
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
    await Promise.all([
      fetchDashboardData(),
      fetchChartData() // Tambahkan ini agar grafik langsung terisi
    ])
    subscribeRealtime()

    // Gunakan optional chaining (?.) untuk mengamankan pembacaan array
    const targetSeries = miniChartSeries.value[0]
    if (targetSeries && baseEngagement.value > 0) {
      const currentData = [...targetSeries.data]
      currentData[currentData.length - 1] = Number(baseEngagement.value.toFixed(1))
      targetSeries.data = currentData
    }
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