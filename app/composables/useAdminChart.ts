import { ref, computed } from 'vue'

export const useAdminChart = () => {
  const colorMode = useColorMode()

  // Master data 100 titik aktivitas visitor (misal records per 3-6 jam dari DB)
  const masterDataData = [
    300, 340, 310, 330, 350, 320, 280, 260, 270, 300,
    350, 390, 420, 380, 410, 390, 370, 400, 380, 410,
    390, 420, 410, 390, 380, 430, 440, 420, 440, 430,
    380, 350, 320, 310, 320, 300, 290, 280, 270, 250,
    230, 210, 190, 210, 180, 190, 220, 240, 230, 260,
    250, 280, 270, 260, 250, 260, 250, 230, 240, 250,
    240, 240, 270, 290, 280, 300, 290, 320, 290, 310,
    330, 310, 320, 300, 290, 290, 270, 260, 250, 230,
    200, 180, 150, 180, 190, 170, 180, 170, 150, 140,
    145, 155, 170, 190, 180, 200, 220, 215, 230, 225
  ]

  /**
   * GENERATE TIMESTAMP DINAMIS (OPEN SOURCE STANDARD)
   * Mengurangi waktu per 4 jam secara konsisten ke belakang untuk tiap titik data.
   * Dengan jarak 4 jam per titik x 100 data = Rentang waktu akan pas mundur ±16-17 hari.
   * JIKA ingin pas 30 hari penuh dengan 100 titik, ubah pengurang jamnya menjadi 7.2 jam (7.2 * 60 * 60 * 1000).
   */
  const chartTimestamps = computed(() => {
    const totalPoints = masterDataData.length
    const now = new Date()
    
    return Array.from({ length: totalPoints }, (_, i) => {
      const recordTime = new Date(now)
      // Mundur 7 jam per titik data agar 100 titik merentang pas sepanjang ~30 hari kalender
      recordTime.setHours(now.getHours() - (totalPoints - 1 - i) * 7) 
      return recordTime.getTime()
    })
  })

  const chartSeries = computed(() => [{
    name: 'Unique Visitors',
    data: masterDataData
  }])

  const chartOptions = computed(() => {
    const isDark = colorMode.value === 'dark'
    
    return {
      chart: {
        type: 'area',
        zoom: { enabled: false },
        toolbar: { show: false },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      colors: ['#0088FF'], 
      stroke: {
        curve: 'smooth', 
        width: 3,
        lineCap: 'round'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: isDark ? 0.15 : 0.25, 
          opacityTo: 0.01,
          stops: [0, 95]
        }
      },
      markers: {
        size: 0,
        hover: { size: 5 }
      },
      dataLabels: { enabled: false },
      grid: {
        show: true,
        borderColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } }, 
        padding: { top: 10, right: 10, bottom: 0, left: 10 }
      },
      tooltip: {
        theme: isDark ? 'dark' : 'light',
        x: { 
          show: true,
          // Format krusial: menampilkan Hari, Tanggal, Bulan, dan Jam log visitor masuk
          format: 'ddd, dd MMM - HH:mm' 
        }, 
        y: {
          formatter: (val: number) => `${val} Visitors`,
          title: { formatter: () => '' }
        }
      },
      xaxis: {
        type: 'datetime',
        categories: chartTimestamps.value,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          show: true,
          rotate: 0,
          hideOverlappingLabels: true,
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM',
            day: 'dd MMM', // Label utama sumbu X akan otomatis membagi tanggal (misal 16 Mei, 18 Mei)
            hour: 'HH:mm'
          },
          style: {
            colors: isDark ? '#64748B' : '#94A3B8',
            fontSize: '10px',
            fontWeight: 600
          }
        }
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: isDark ? '#475569' : '#94A3B8',
            fontSize: '9px',
            fontWeight: 500
          }
        }
      }
    }
  })

  return {
    chartSeries,
    chartOptions
  }
}