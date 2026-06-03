import { ref, computed } from 'vue'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement,
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler,
  type ChartOptions,
  type ChartData
} from 'chart.js'

export const useAdminChart = () => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

  const colorMode = useColorMode()
  
  // State aktif untuk melacak filter hari (30 atau 7)
  const activeDays = ref<30 | 7>(30)

  // Master data 30 hari penuh
  const monthlyData = [
    120, 100, 90, 140, 220, 280, 250, 310, 420, 380, 
    410, 490, 460, 520, 580, 610, 550, 590, 680, 720, 
    700, 740, 810, 790, 850, 920, 890, 950, 1050, 1200
  ]

  // Potong labels secara dinamis berdasarkan state activeDays (mengambil data paling akhir)
  const filteredLabels = computed(() => {
    return Array.from({ length: activeDays.value }, (_, i) => {
      // Jika filter 7 hari, ambil label 7 hari terakhir dari total 30 hari (Hari 24 s/d 30)
      const dayNumber = (30 - activeDays.value) + (i + 1)
      return `Day ${dayNumber}`
    })
  })

  // Potong dataset angka secara dinamis berdasarkan state activeDays
  const filteredData = computed(() => {
    return monthlyData.slice(-activeDays.value)
  })

  const chartData = computed<ChartData<'line'>>(() => ({
    labels: filteredLabels.value,
    datasets: [{
      label: 'Unique Visitors',
      data: filteredData.value,
      borderColor: '#D4A32E', 
      backgroundColor: colorMode.value === 'dark' ? 'rgba(212, 163, 46, 0.03)' : 'rgba(212, 163, 46, 0.08)',
      fill: true,
      tension: 0.35,
      pointRadius: activeDays.value === 7 ? 5 : 3, // Perbesar titik koordinat jika datanya sedikit (7 hari)
      pointHoverRadius: 7,
      pointBackgroundColor: '#D4A32E',
      borderWidth: 3
    }]
  }))

  const chartOptions = computed<ChartOptions<'line'>>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, 
      tooltip: {
        backgroundColor: colorMode.value === 'dark' ? '#1E293B' : '#0F172A',
        titleFont: { size: 10, weight: 'bold' },
        bodyFont: { size: 12, weight: 'bold' },
        padding: 12,
        borderRadius: 12,
        displayColors: false,
        callbacks: {
          label: (context) => ` ${context.raw} Visitors`
        }
      }
    },
    scales: {
      y: { 
        display: true,
        grid: {
          color: colorMode.value === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
        },
        ticks: {
          font: { size: 9, weight: 500 },
          color: colorMode.value === 'dark' ? '#475569' : '#94A3B8'
        }
      },
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 10, weight: 600 },
          color: colorMode.value === 'dark' ? '#64748B' : '#94A3B8',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: activeDays.value === 7 ? 7 : 15
        }
      }
    }
  }))

  return {
    activeDays, // Kembalikan variabel ini agar bisa dibaca/diubah di file Vue
    chartData,
    chartOptions
  }
}