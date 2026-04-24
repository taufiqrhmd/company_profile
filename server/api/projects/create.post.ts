// server/api/projects/create.post.ts
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const token = getCookie(event, "auth_token");

  // 1. Validasi: Cek token
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized: No admin session found",
    });
  }

  // 2. Inisialisasi Supabase Admin
  // Di Nuxt server, variabel dari .env sebaiknya diakses via config.supabaseServiceKey
  // atau process.env langsung jika sudah terdaftar di nuxt.config
  const supabaseAdmin = createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceKey as string,
  );

  try {
    // 3. Insert ke tabel Projects
    const { data: project, error: pError } = await supabaseAdmin
      .from("projects")
      .insert(body.mainData) // body.mainData biasanya sudah berupa object
      .select()
      .single();

    if (pError) throw pError;

    // 4. Insert ke tabel Project Details
    const { error: dError } = await supabaseAdmin
      .from("project_details")
      .insert({
        ...body.detailData,
        project_id: project.id,
      });

    if (dError) throw dError;

    return { success: true, data: project };
  } catch (error: any) {
    // Log error di terminal server untuk mempermudah debugging
    console.error("[Server Error]:", error.message);

    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Internal Server Error",
    });
  }
});
