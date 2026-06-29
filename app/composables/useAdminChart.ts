import { ref, computed } from "vue";

export const useAdminChart = () => {
  const colorMode = useColorMode();

  // State untuk menyimpan data dinamis
  const chartData = ref<{ date: string; count: number }[]>([]);
  interface DailyTraffic {
    visit_date: string;
    visit_count: number;
  }

  const fetchChartData = async () => {
    try {
      const headers = useRequestHeaders(["cookie"]) as HeadersInit;
      // Berikan tipe data ke $fetch
      const data = await $fetch<DailyTraffic[]>("/api/analytics/get-stats", {
        method: "GET",
        headers,
      });

      if (data && Array.isArray(data)) {
        chartData.value = data.map((item): { date: string; count: number } => ({
          date: item.visit_date,
          count: Number(item.visit_count),
        }));
      }
    } catch (error) {
      console.error("Gagal mengambil data chart:", error);
    }
  };

  // Panggil fetch saat composable diinisialisasi
  fetchChartData();

  const chartSeries = computed(() => [
    {
      name: "Unique Visitors",
      data: chartData.value.map((item) => item.count),
    },
  ]);

  const chartOptions = computed(() => {
    const isDark = colorMode.value === "dark";

    return {
      chart: {
        type: "area",
        zoom: { enabled: false },
        toolbar: { show: false },
        pan: { enabled: true, mode: "x" }, // Hanya horizontal
        selection: { enabled: false },
        animations: { enabled: true, easing: "easeinout", speed: 800 },
      },
      colors: ["#0088FF"],
      stroke: {
        curve: "smooth",
        width: 3,
        lineCap: "round",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: isDark ? 0.15 : 0.25,
          opacityTo: 0.01,
          stops: [0, 95],
        },
      },
      markers: {
        size: 0,
        hover: { size: 5 },
      },
      dataLabels: { enabled: false },
      grid: {
        show: true,
        borderColor: isDark
          ? "rgba(255, 255, 255, 0.04)"
          : "rgba(0, 0, 0, 0.04)",
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
        // Beri padding kanan 60px agar tooltip di tanggal terakhir tidak mentok ke pinggir
        padding: { top: 10, right: 60, bottom: 0, left: 10 },
      },
      tooltip: {
        theme: isDark ? "dark" : "light",
        shared: true,
        intersect: false,
        // Hapus property 'fixed' agar stabil dan tidak memicu layout shift
        x: { show: true, format: "ddd, dd MMM" },
        y: {
          formatter: (val: number) => `${val} Visitors`,
          title: { formatter: () => "" },
        },
      },
      xaxis: {
        type: "datetime",
        categories: chartData.value.map((item) => item.date),
        axisBorder: { show: false },
        axisTicks: { show: false },
        tickAmount: 7,
        labels: {
          show: true,
          rotate: 0,
          hideOverlappingLabels: true,
          datetimeUTC: false,
          datetimeFormatter: {
            year: "yyyy",
            month: "MMM",
            day: "dd MMM", // Label utama sumbu X akan otomatis membagi tanggal (misal 16 Mei, 18 Mei)
            hour: "",
          },
          style: {
            colors: isDark ? "#64748B" : "#94A3B8",
            fontSize: "10px",
            fontWeight: 600,
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: isDark ? "#475569" : "#94A3B8",
            fontSize: "9px",
            fontWeight: 500,
          },
        },
      },
    };
  });

  return {
    chartSeries,
    chartOptions,
    fetchChartData, // Ekspor ini agar bisa dipanggil saat refresh
  };
};
