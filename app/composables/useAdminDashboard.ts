import { ref } from 'vue'
import type { DashboardStats, InquiryStats, ProjectStats } from '../../types/dashboard'

export const useAdminDashboard = () => {
  const rawStats = ref<DashboardStats>({
    unreadMessages: 0,
    totalProjects: 0,
    totalViews: 0,
    viewedProjectsCount: 0,
  })

  const fetchDashboardData = async () => {
    try {
      // Menembak kedua API internal secara paralel dengan tipe data yang ketat
      const [inquiryData, projectData] = await Promise.all([
        $fetch<InquiryStats>('/api/inquiries/stats'),
        $fetch<ProjectStats>('/api/projects/stats')
      ])
      
      rawStats.value = {
        unreadMessages: inquiryData.unread,
        totalProjects: projectData.totalProjects,
        totalViews: projectData.totalViews,
        viewedProjectsCount: projectData.viewedProjectsCount,
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