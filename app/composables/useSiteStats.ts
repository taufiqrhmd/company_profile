// Di dalam useSiteStats.ts
export const useSiteStats = () => {
  const supabase = useSupabaseClient()
  
  // Berikan tipe data yang jelas pada ref
  const stats = ref([
    { id: 'projects', title: 'Total Projects', value: '0', icon: 'solar:folder-linear', trend: 'Live' },
    { id: 'views', title: 'Total Views', value: '0', icon: 'solar:eye-linear', trend: '+Auto' },
    { id: 'inquiries', title: 'Inquiries', value: '0', icon: 'solar:letter-linear', trend: 'New' },
    { id: 'services', title: 'Services', value: '0', icon: 'solar:widget-linear', trend: 'Active' },
  ])

  const fetchStats = async () => {
    try {
      // Jalankan query (logika query Anda tetap sama)
      const { count: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true })
      const { data: viewsData } = await supabase.from('projects').select('views')
      const totalViews = viewsData?.reduce((acc, curr: any) => acc + (curr.views || 0), 0) || 0
      const { count: msgCount } = await supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'unread')
      const { count: servicesCount } = await supabase.from('services').select('*', { count: 'exact', head: true })

      // CARA AMAN MENGISI DATA:
      // Gunakan .find() atau pastikan array sudah terisi sebelum diakses
      const updateValue = (id: string, val: string) => {
        const item = stats.value.find(s => s.id === id)
        if (item) item.value = val
      }

      updateValue('projects', projectsCount?.toString() || '0')
      updateValue('views', totalViews.toLocaleString())
      updateValue('inquiries', msgCount?.toString() || '0')
      updateValue('services', servicesCount?.toString() || '0')

    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  return { stats, fetchStats }
}