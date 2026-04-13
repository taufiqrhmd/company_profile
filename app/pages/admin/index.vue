<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 class="text-3xl font-black text-slate-900 tracking-tight italic uppercase">
          System <span class="text-primary underline decoration-4 underline-offset-4">Status</span>
        </h2>
        <p class="text-slate-500 text-sm mt-1">Laporan ringkasan aktivitas dan performa sistem.</p>
      </div>
      <div class="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
        <span class="flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        Auto-sync: <span class="text-green-500">Active</span>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="(stat, index) in stats" :key="index" 
        class="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-primary/50 transition-all group">
        <div class="flex justify-between items-start mb-4">
          <div class="p-2 bg-slate-50 rounded-lg group-hover:bg-primary/10 transition-colors">
            <Icon :name="stat.icon" class="w-5 h-5 text-slate-400 group-hover:text-primary" />
          </div>
          <span class="text-[10px] font-bold text-green-500">{{ stat.trend }}</span>
        </div>
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ stat.title }}</p>
        <h3 class="text-2xl font-black text-slate-900">{{ stat.value }}</h3>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col">
        <div class="flex items-center justify-between mb-8">
          <h4 class="text-xs font-bold uppercase tracking-widest text-slate-900">Traffic Distribution</h4>
          <select class="bg-slate-50 border-none text-[10px] font-bold uppercase py-1 px-3 rounded-md outline-none cursor-pointer hover:bg-slate-100 transition-colors">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        
        <div class="flex-1 min-h-[250px] w-full">
          <Line v-if="loaded" :data="chartData" :options="chartOptions" />
          
          <div v-else class="h-full w-full bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center gap-2">
            <Icon name="solar:refresh-linear" class="text-slate-200 w-8 h-8 animate-spin" />
            <p class="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Loading Analytics...</p>
          </div>
        </div>
      </div>

      <div class="p-8 bg-slate-900 rounded-3xl shadow-xl flex flex-col justify-between text-white overflow-hidden relative group">
        <Icon name="solar:cloud-storage-bold-duotone" class="absolute -right-8 -bottom-8 w-40 h-40 opacity-5 group-hover:scale-110 transition-transform duration-700" />
        <div class="relative z-10">
          <h4 class="text-xs font-bold uppercase tracking-widest text-primary mb-2">Node Performance</h4>
          <p class="text-4xl font-black italic">99.9%</p>
          <p class="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter font-bold flex items-center gap-2">
             <span class="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
             Uptime recorded globally
          </p>
        </div>
        <button class="relative z-10 mt-12 w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
          View Detailed Logs
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 1. Import Chart.js essentials
import { Line } from 'vue-chartjs'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js'

// 2. Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

definePageMeta({
  layout: 'admin',
  middleware: ['auth'] 
})

const loaded = ref(false)

// 3. Define Stats Data
const stats = [
  { title: 'Total Visits', value: '12,840', icon: 'solar:users-group-rounded-linear', trend: '+14%' },
  { title: 'Project Views', value: '3,420', icon: 'solar:eye-linear', trend: '+8%' },
  { title: 'Inquiries', value: '124', icon: 'solar:letter-linear', trend: '+2%' },
  { title: 'Server Load', value: '24%', icon: 'solar:cpu-linear', trend: 'Stable' },
]

// 4. Chart Data Configuration
const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Visitors',
    data: [120, 190, 150, 280, 220, 310, 420],
    borderColor: '#D4A32E', // Warna primary kamu
    backgroundColor: 'rgba(212, 163, 46, 0.1)',
    fill: true,
    tension: 0.4, // Membuat garis jadi melengkung (smooth)
    pointRadius: 4,
    pointBackgroundColor: '#D4A32E',
    borderWidth: 3
  }]
}

// 5. Chart Options Configuration
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }, // Kita sembunyikan legend agar lebih minimalis
    tooltip: {
      backgroundColor: '#0F172A',
      titleFont: { size: 10, weight: 'bold' },
      bodyFont: { size: 12 },
      padding: 12,
      cornerRadius: 10,
      displayColors: false
    }
  },
  scales: {
    y: {
      display: false, // Sembunyikan garis Y agar elegan
      grid: { display: false }
    },
    x: {
      grid: { display: false },
      ticks: {
        font: { size: 10, weight: '600' },
        color: '#94A3B8'
      }
    }
  }
}

onMounted(() => {
  // Simulasi fetch data analytics
  setTimeout(() => {
    loaded.value = true
  }, 800)
})
</script>