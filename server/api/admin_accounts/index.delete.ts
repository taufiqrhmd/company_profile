import { defineEventHandler, getQuery, createError, getCookie } from "h3";
import { jwtVerify, type JWTPayload } from "jose";
import { serverSupabaseServiceRole } from "#supabase/server";

interface AdminPayload extends JWTPayload {
  id: string;
  role: string;
}

export default defineEventHandler(async (event) => {
  const id = getQuery(event).id as string; // Ambil query param (?id=xxxx)
  const token = getCookie(event, "auth_token");
  const config = useRuntimeConfig();

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  try {
    const secret = new TextEncoder().encode(config.jwtSecret);
    const { payload } = (await jwtVerify(token, secret)) as { payload: AdminPayload };

    if (payload.role !== "super_admin") {
      throw createError({ statusCode: 403, statusMessage: "Forbidden" });
    }

    // PROTEKSI EXTRA: Mencegah super_admin tidak sengaja menghapus dirinya sendiri
    if (payload.id === id) {
      throw createError({ statusCode: 400, statusMessage: "Anda tidak bisa menghapus akun Anda sendiri!" });
    }

    const client = serverSupabaseServiceRole(event);
    const { error } = await client.from("admin_accounts").delete().eq("id", id);

    if (error) throw error;

    return { success: true, message: "Account deleted successfully" };
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.statusMessage || "Failed to delete account.",
    });
  }
});