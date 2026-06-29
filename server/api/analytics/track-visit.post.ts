// server/api/analytics/track-visit.post.ts
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  const { path, referrer } = body
  
  // Masukkan data ke tabel page_visits
  const { error } = await client
    .from('page_visits')
    .insert({
      page_path: path,
      referrer: referrer,
      user_agent: getHeader(event, 'user-agent') || 'unknown'
    })

  if (error) {
    console.error('Database insert error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to record visit' })
  }

  return { success: true }
})