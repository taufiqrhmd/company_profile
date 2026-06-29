// server/api/increment.post.ts
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const path = body.path
  
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Jalankan RPC
  await supabase.rpc('increment_page_visit', { path_to_log: path })
  
  return { success: true }
})