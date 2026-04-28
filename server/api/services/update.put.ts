// server/api/services/update.put.ts
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient<any>(event)

  const { data, error } = await client
    .from('services')
    .update({
      title: body.title,
      description: body.description,
      icon: body.icon
    })
    .eq('id', body.id)

  if (error) throw createError({ statusCode: 500, message: error.message })
  return data
})