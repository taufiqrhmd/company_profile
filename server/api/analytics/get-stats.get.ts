import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  if (!cookies.auth_token) {
    // Ganti 'auth_token' dengan nama cookie Anda
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // Gunakan RPC agar lebih cepat dan teragregasi
  const { data, error } = await supabaseAdmin.rpc("get_daily_traffic", {
    days_back: 30,
  });

  if (error) throw error;
  return data;
});
