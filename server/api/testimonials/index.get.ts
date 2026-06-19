// server/api/testimonials/index.get.ts
import { useServerSupabase } from "~~/server/utils/supabase";

export default defineEventHandler(async (event) => {
  const client = useServerSupabase(); // Menggunakan Supabase server-side
  
  const { data, error } = await client
    .from('testimonials')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw createError({ statusCode: 500, statusMessage: error.message });
  return data;
});