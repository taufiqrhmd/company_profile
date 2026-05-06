// composables/useAdminDashboard.ts
export const useAdminDashboard = () => {
  const rawStats = ref({
    unreadMessages: 0,
    totalProjects: 0,
    totalViews: 0,
    archivedMessages: 0
  })

  const fetchDashboardData = async () => {
    try {
      // Kita panggil API internal agar bypass RLS via server-side logic
      const data = await $fetch('/api/inquiries/stats') as any
      
      rawStats.value = {
        unreadMessages: data.unread || 0,
        totalProjects: data.totalProjects || 0,
        totalViews: data.views || 0,
        archivedMessages: data.archived || 0
      }
      
      console.log('Stats Updated:', rawStats.value)
    } catch (e) {
      console.error('Dashboard Fetch Error:', e)
    }
  }

  return { 
    rawStats, 
    fetchDashboardData 
  }
}