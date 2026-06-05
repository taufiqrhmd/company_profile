<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <!-- Header Section -->
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

    <!-- Stats Grid -->
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
          <h3 class="text-2xl font-black text-slate-900 dark:text-white mt-1">{{ rawStats.unreadMessages }}</h3>
        </div>
      </div>

      <div v-for="(stat, index) in filteredStats" :key="index"
        class="p-6 bg-white dark:bg-[#16191E] border border-slate-200 dark:border-white/5 rounded-xl shadow-sm overflow-hidden relative group hover:border-primary/50">

        <Icon :name="stat.icon" class="absolute -right-4 -bottom-4 w-20 h-20 text-slate-100 dark:text-white/5 group-hover:text-primary/10" />

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

    <!-- Bottom Section: Full Width Analytics Chart -->
    <div
      class="p-8 bg-white dark:bg-[#16191E] rounded-xl border border-slate-200 dark:border-white/5 shadow-sm transition-colors">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h4 class="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">
            Total Visitor Analytics
          </h4>
        </div>
        <div class="flex items-center gap-3">
          <span class="hidden sm:inline-block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            Filter:
          </span>
          <div class="flex bg-slate-50 dark:bg-white/5 p-1 rounded-lg border border-slate-100 dark:border-white/5">
            <button @click="activeDays = 30" :class="activeDays === 30
              ? 'bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'"
              class="px-3 py-1.5 text-[9px] font-bold uppercase rounded-md transition-colors">
              30 Days
            </button>

            <button @click="activeDays = 7" :class="activeDays === 7
              ? 'bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'"
              class="px-3 py-1.5 text-[9px] font-bold uppercase rounded-md transition-colors">
              7 Days
            </button>
          </div>
        </div>
      </div>

      <!-- Container Scrollable Horizontal -->
      <div class="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">
        <div class="h-[320px]" :class="activeDays === 7 ? 'min-w-full' : 'min-w-[1000px] lg:min-w-full'">
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, onMounted, computed, ref } from 'vue'
import { Line } from 'vue-chartjs'
import type { RealtimeChannel } from '@supabase/supabase-js'

definePageMeta({ layout: 'admin', middleware: ['auth'] })
useHead({
  title: 'Dashboard',
})

const supabase = useSupabaseClient()
const { rawStats, fetchDashboardData } = useAdminDashboard()
const { chartData, chartOptions, activeDays } = useAdminChart()
const loaded = ref(false)

let dashboardChannel: RealtimeChannel | null = null

// Ambil sisa stats di luar pesan
const filteredStats = computed(() => [
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
    title: 'Estimated Revenue',
    value: 'Rp 48.500.000',
    icon: 'solar:wad-of-money-bold-duotone',
    trend: 'Target 85%',
    trendColor: 'text-amber-500'
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
/* Opsional: Kustomisasi tipis style scrollbar agar serasi dengan UI modern */
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