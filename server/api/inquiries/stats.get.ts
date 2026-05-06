// server/api/inquiries/stats.get.ts
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event)

  // Ambil hitungan secara paralel agar cepat
  const [unread, archived, projects] = await Promise.all([
    client.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'unread'),
    client.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'archived'),
    client.from('projects').select('*', { count: 'exact', head: true })
  ])

  return {
    unread: unread.count || 0,
    archived: archived.count || 0,
    totalProjects: projects.count || 0,
    views: 0 // Tambahkan logic views jika ada
  }
})