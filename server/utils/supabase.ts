// server/utils/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const useServerSupabase = () => {
  const config = useRuntimeConfig()
  
  // Ambil variabel dari runtimeConfig (pastikan sudah diset di nuxt.config.ts)
  const supabaseUrl = config.public.supabaseUrl as string;
  const serviceKey = config.supabaseServiceKey as string;

  if (!supabaseUrl || !serviceKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase configuration missing in runtimeConfig'
    })
  }

  return createClient(supabaseUrl, serviceKey)
}