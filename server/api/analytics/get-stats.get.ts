// server/api/get-stats.get.ts
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data } = await supabase
    .from("daily_traffic_stats")
    .select("visit_date, visit_count")
    .not("page_path", "ilike", "/admin%")
    .order("visit_date", { ascending: true })

  return data // Data akan dikirim ke frontend dengan aman
})