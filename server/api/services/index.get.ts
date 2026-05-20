// server/api/projects/index.get.ts
import { useServerSupabase } from "~~/server/utils/supabase";

export default defineEventHandler(async (event) => {
  const client = useServerSupabase();
  const { data, error } = await client
    .from("services")
    .select('*') 
    .order("id", { ascending: true });

  if (error) throw createError({ statusCode: 500, message: error.message });
  return data;
});
