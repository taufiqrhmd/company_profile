// server/api/projects/[id].delete.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const token = getCookie(event, 'auth_token')

  if (!token) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  const client = useServerSupabase()
  const { error } = await client.from('projects').delete().eq('id', id)

  if (error) throw createError({ statusCode: 500, statusMessage: error.message })
  
  return { success: true }
})