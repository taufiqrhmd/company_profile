// server/api/projects/[id].put.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const client = useServerSupabase()

  // 1. Update data utama
  const { error: pError } = await client
    .from('projects')
    .update(body.mainData)
    .eq('id', id)
    
  if (pError) throw createError({ statusCode: 500, message: pError.message })

  // 2. Update data detail
  const { error: dError } = await client
    .from('project_details')
    .update(body.detailData)
    .eq('project_id', id) // Menggunakan .eq() bukan upsert
  
  if (dError) throw createError({ statusCode: 500, message: dError.message })

  return { success: true }
})