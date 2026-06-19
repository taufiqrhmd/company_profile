// server/api/testimonials/[id].delete.ts
import { useServerSupabase } from "~~/server/utils/supabase";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const client = useServerSupabase();

  const { error } = await client
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) throw createError({ statusCode: 500, statusMessage: error.message });
  return { success: true };
});