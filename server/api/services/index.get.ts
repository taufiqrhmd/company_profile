// server/api/projects/index.get.ts
import { useServerSupabase } from "~~/server/utils/supabase";

export default defineEventHandler(async (event) => {
  const client = useServerSupabase();
  const { data, error } = await client
    .from("services")
    .select('*') // Mengambil relasi project_details
    .order("id", { ascending: false });

  if (error) throw createError({ statusCode: 500, message: error.message });
  return data;
});
