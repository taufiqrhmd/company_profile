<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">
          System <span class="text-primary underline decoration-4 underline-offset-4">Status</span>
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Laporan ringkasan aktivitas dan performa sistem.</p>
      </div>
      <div
        class="px-4 py-2 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/5 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-3">
        <div class="flex h-2 w-2 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </div>
        Auto-sync: <span class="text-green-500">Active</span>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="(stat, index) in stats" :key="index"
        class="p-6 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm hover:border-primary/50 transition-all group overflow-hidden relative">

        <!-- Decoration Icon Background -->
        <Icon :name="stat.icon"
          class="absolute -right-4 -bottom-4 w-20 h-20 text-slate-100 dark:text-white/5 group-hover:text-primary/10 transition-colors" />

        <div class="relative z-10">
          <div class="flex justify-between items-start mb-4">
            <div class="p-2 bg-slate-50 dark:bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Icon :name="stat.icon" class="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
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

    <!-- Middle Section: Analytics & Node -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Chart Area -->
      <div
        class="lg:col-span-2 p-8 bg-white dark:bg-[#16191E] rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm transition-colors">
        <div class="flex items-center justify-between mb-8">
          <h4 class="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white italic">Traffic
            Analytics</h4>
          <div class="flex gap-2">
            <button class="px-3 py-1 text-[9px] font-bold uppercase rounded-md bg-primary text-black">Weekly</button>
            <button
              class="px-3 py-1 text-[9px] font-bold uppercase rounded-md bg-slate-100 dark:bg-white/5 text-slate-500">Monthly</button>
          </div>
        </div>

        <div class="h-[280px] w-full">
          <Line v-if="loaded" :data="chartData" :options="chartOptions" />
          <div v-else
            class="h-full w-full bg-slate-50 dark:bg-white/5 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center gap-3">
            <Icon name="solar:chart-2-bold-duotone"
              class="text-slate-200 dark:text-slate-800 w-12 h-12 animate-pulse" />
            <p class="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest">Generating
              Insights...</p>
          </div>
        </div>
      </div>

      <!-- Performance Card -->
      <div
        class="p-8 bg-slate-900 dark:bg-primary/5 border border-transparent dark:border-primary/20 rounded-[2.5rem] shadow-xl flex flex-col justify-between text-white relative group transition-all">
        <Icon name="solar:map-arrow-square-bold-duotone"
          class="absolute -right-12 -bottom-12 w-48 h-48 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />

        <div class="relative z-10">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-2 h-2 bg-primary rounded-full"></div>
            <h4 class="text-xs font-bold uppercase tracking-widest text-primary">Global Uptime</h4>
          </div>
          <p class="text-6xl font-black italic tracking-tighter">99.9<span class="text-primary text-2xl">%</span></p>
          <p class="text-[10px] text-slate-400 mt-4 leading-relaxed uppercase font-bold italic">
            Monitoring servers across 12 regions with zero downtime in the last 30 days.
          </p>
        </div>

        <button
          class="relative z-10 mt-12 w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-black hover:border-primary transition-all duration-500">
          Sync Database
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, onMounted } from 'vue'
import { Line } from 'vue-chartjs'

definePageMeta({ layout: 'admin', middleware: ['auth'] })

const supabase = useSupabaseClient()
const { rawStats, fetchDashboardData } = useAdminDashboard()
const { chartData, chartOptions } = useAdminChart()
const loaded = ref(false)

let dashboardChannel: any = null

const stats = computed(() => [
  {
    title: 'New Messages',
    value: rawStats.value.unreadMessages,
    icon: 'solar:letter-unread-bold-duotone',
    trend: rawStats.value.unreadMessages > 0 ? 'Review Needed' : 'No Action',
    trendColor: rawStats.value.unreadMessages > 0 ? 'text-primary' : 'text-green-500'
  },
  {
    title: 'Total Projects',
    value: rawStats.value.totalProjects,
    icon: 'solar:case-bold-duotone',
    trend: 'Live Status',
    trendColor: 'text-slate-400'
  },
  {
    title: 'Project Views',
    value: rawStats.value.totalViews.toLocaleString(),
    icon: 'solar:chart-bold-duotone',
    trend: '+12% Growth',
    trendColor: 'text-green-500'
  },
  {
    title: 'Archive Storage',
    value: rawStats.value.archivedMessages,
    icon: 'solar:box-bold-duotone',
    trend: 'Optimized',
    trendColor: 'text-blue-400'
  },
])

const subscribeRealtime = () => {
  if (dashboardChannel) {
    supabase.removeChannel(dashboardChannel)
  }

  dashboardChannel = supabase.channel('dashboard-realtime')
    .on(
      'postgres_changes', 
      { event: '*', schema: 'public', table: 'inquiries' }, 
      () => fetchDashboardData()
    )
    .on(
      'postgres_changes', 
      { event: '*', schema: 'public', table: 'projects' }, 
      () => fetchDashboardData()
    )
    .subscribe() 
}

onUnmounted(() => {
  if (dashboardChannel) {
    supabase.removeChannel(dashboardChannel)
    dashboardChannel = null
  }
})

onMounted(async () => {
  await fetchDashboardData()
  subscribeRealtime()
  setTimeout(() => loaded.value = true, 300)
})
</script>