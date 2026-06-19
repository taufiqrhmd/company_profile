// server/api/projects/index.get.ts
import { useServerSupabase } from "~~/server/utils/supabase";

export default defineEventHandler(async () => {
  const client = useServerSupabase();
  const { data, error } = await client
    .from("projects")
    .select(
      `
      *,
      project_details (*)
    `,
    ) // Mengambil relasi project_details
    .order("created_at", { ascending: true });

  if (error) throw createError({ statusCode: 500, message: error.message });
  return data;
});
