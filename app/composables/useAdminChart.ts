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
  // Register komponen untuk Grafik Garis (Line) + Filler untuk efek area di bawah garis
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

  const colorMode = useColorMode()

  // Generate otomatis label tanggal 1-30 untuk simulasi 1 bulan full
  const generateMonthlyLabels = () => {
    return Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
  }

  // Simulasi data visitor selama 30 hari
  const monthlyData = [
    120, 150, 190, 140, 220, 280, 250, 310, 420, 380, 
    410, 490, 460, 520, 580, 610, 550, 590, 680, 720, 
    700, 740, 810, 790, 850, 920, 890, 950, 1050, 1200
  ]

  const chartData = computed<ChartData<'line'>>(() => ({
    labels: generateMonthlyLabels(),
    datasets: [{
      label: 'Unique Visitors',
      data: monthlyData,
      borderColor: '#D4A32E', 
      backgroundColor: colorMode.value === 'dark' ? 'rgba(212, 163, 46, 0.03)' : 'rgba(212, 163, 46, 0.08)',
      fill: true,
      tension: 0.35, // Membuat lekukan grafik lebih halus dan melengkung alami
      pointRadius: 3,
      pointHoverRadius: 6,
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
          maxTicksLimit: 15 // Membatasi jumlah teks tanggal agar tidak tumpang tindih saat di-scroll
        }
      }
    }
  }))

  return {
    chartData,
    chartOptions
  }
}