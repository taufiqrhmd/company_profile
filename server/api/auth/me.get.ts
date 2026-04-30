import { jwtVerify, JWTPayload } from "jose";
import { serverSupabaseServiceRole } from "#supabase/server";

interface AdminPayload extends JWTPayload {
  id: string;
  role: string;
}

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');
  const config = useRuntimeConfig();

  if (!token) return null;

  try {
    // 1. Verifikasi apakah token asli atau buatan hacker
    const secret = new TextEncoder().encode(config.jwtSecret || 'secret-key-anda-yang-sangat-panjang');
    const { payload } = await jwtVerify(token, secret) as { payload: AdminPayload };

    // 2. Ambil data terbaru dari DB berdasarkan ID di token
    const client = serverSupabaseServiceRole(event);
    const { data: user } = await client
      .from("admin_accounts")
      .select("id, username, full_name, role")
      .eq("id", payload.id)
      .single();

    return user;
  } catch (e) {
    return null;
  }
});