import { serverSupabaseServiceRole } from '#supabase/server';
import type { InquiryStats } from "../../../types/dashboard";

export default defineEventHandler(async (event): Promise<InquiryStats> => {
  const client = serverSupabaseServiceRole(event)

  const [unread, archived] = await Promise.all([
    client.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'unread'),
    client.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'archived')
  ])

  return {
    unread: unread.count || 0,
    archived: archived.count || 0
  }
})