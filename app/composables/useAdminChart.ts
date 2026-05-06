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
  // 1. Register ChartJS secara internal
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

  const colorMode = useColorMode()

  // 2. Logika Chart Data
  const chartData = computed<ChartData<'line'>>(() => ({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Visitors',
      data: [120, 190, 150, 280, 220, 310, 420],
      borderColor: '#D4A32E', 
      backgroundColor: colorMode.value === 'dark' ? 'rgba(212, 163, 46, 0.05)' : 'rgba(212, 163, 46, 0.1)',
      fill: true,
      tension: 0.4, 
      pointRadius: 4,
      pointBackgroundColor: '#D4A32E',
      borderWidth: 3
    }]
  }))

  // 3. Logika Chart Options
  const chartOptions = computed<ChartOptions<'line'>>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, 
      tooltip: {
        backgroundColor: colorMode.value === 'dark' ? '#1E293B' : '#0F172A',
        titleFont: { size: 10, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 10,
        displayColors: false
      }
    },
    scales: {
      y: { display: false },
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 10, weight: 600 },
          color: colorMode.value === 'dark' ? '#64748B' : '#94A3B8'
        }
      }
    }
  }))

  return {
    chartData,
    chartOptions
  }
}