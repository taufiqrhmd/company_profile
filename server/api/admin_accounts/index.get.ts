import { defineEventHandler, createError, getCookie } from "h3";
import { jwtVerify, JWTPayload } from "jose";
import { serverSupabaseServiceRole } from "#supabase/server";

interface AdminPayload extends JWTPayload {
  id: string;
  role: string;
}

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "auth_token");
  const config = useRuntimeConfig();

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  try {
    const secret = new TextEncoder().encode(config.jwtSecret);
    const { payload } = (await jwtVerify(token, secret)) as { payload: AdminPayload };

    // PROTEKSI: Hanya super_admin yang boleh melihat semua list user
    if (payload.role !== "super_admin") {
      throw createError({ statusCode: 403, statusMessage: "Forbidden - Access denied." });
    }

    const client = serverSupabaseServiceRole(event);
    
    // Ambil semua akun, urutkan dari yang terbaru (kecuali kolom password demi keamanan)
    const { data: accounts, error } = await client
      .from("admin_accounts")
      .select("id, created_at, username, full_name, role")
      .order("created_at", { ascending: true });

    if (error) throw error;

    return { success: true, data: accounts };
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.statusMessage || "Failed to fetch accounts.",
    });
  }
});