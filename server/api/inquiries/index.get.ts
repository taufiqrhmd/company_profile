import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const statusFilter = query.status as string

  // Inisialisasi Supabase dengan Service Role (Bypass RLS)
  const supabaseAdmin = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey
  )

  let dbQuery = supabaseAdmin
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  // Terapkan filter jika bukan 'All'
  if (statusFilter && statusFilter !== 'All') {
    dbQuery = dbQuery.eq('status', statusFilter.toLowerCase())
  }

  const { data, error } = await dbQuery

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  return data
})