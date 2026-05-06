// server/api/projects/[id].put.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { mainData, detailData } = await readBody(event)
  const supabase = useServerSupabase()

  // 1. Update Tabel Utama (projects)
  const { error: mainError } = await supabase
    .from('projects')
    .update(mainData) 
    .eq('id', id)

  if (mainError) throw createError({ statusCode: 500, message: mainError.message })

  // 2. Update Tabel Detail (project_details)
  const { error: detailError } = await supabase
    .from('project_details')
    .update(detailData)
    .eq('project_id', id) // Sesuaikan nama kolom foreign key Anda

  if (detailError) throw createError({ statusCode: 500, message: detailError.message })

  return { success: true }
})