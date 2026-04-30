// server/api/auth/me.get.ts
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
    // Gunakan secret yang sama persis dengan login.post
    const secret = new TextEncoder().encode(config.jwtSecret);
    const { payload } = await jwtVerify(token, secret) as { payload: AdminPayload };

    const client = serverSupabaseServiceRole(event);
    const { data: user, error } = await client
      .from("admin_accounts")
      .select("id, username, full_name, role")
      .eq("id", payload.id)
      .single();

    if (error || !user) return null;

    return user;
  } catch (e) {
    // Jika token expired atau dimanipulasi, return null agar middleware menangani logout
    return null;
  }
});