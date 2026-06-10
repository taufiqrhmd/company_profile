import { serverSupabaseServiceRole } from '#supabase/server'
import type { ProjectStats } from '../../../types/dashboard'

export default defineEventHandler(async (event): Promise<ProjectStats> => {
  const client = serverSupabaseServiceRole(event)

  // Tarik data projects murni hanya kolom views menggunakan service role (bypass RLS secara mutlak)
  const { data: projects, error } = await client
    .from('projects')
    .select('views')

  // Jika terjadi error pada database, tangkap di console server
  if (error) {
    console.error('Supabase Query Error:', error.message)
    return { totalProjects: 0, totalViews: 0, viewedProjectsCount: 0 }
  }

  if (!projects || projects.length === 0) {
    return { totalProjects: 0, totalViews: 0, viewedProjectsCount: 0 }
  }

  // 1. Hitung total baris (total projects)
  const totalProjects = projects.length

  // 2. Hitung jumlah proyek yang benar-benar sudah pernah dilihat (views > 0)
  const viewedProjectsCount = projects.filter(curr => {
    const currentView = curr.views ? Number(curr.views) : 0
    return currentView > 0
  }).length

  // 3. Lakukan penjumlahan (sum) dari kolom views secara aman
  const totalViews = projects.reduce((acc, curr) => {
    const currentView = curr.views ? Number(curr.views) : 0
    return acc + currentView
  }, 0)

  // Kembalikan objek sesuai tipe data ProjectStats yang baru
  return {
    totalProjects,
    totalViews,
    viewedProjectsCount // <-- Data ini siap dikonsumsi frontend
  }
})