import { defineEventHandler, readBody, createError, getCookie } from "h3";
import { jwtVerify, type JWTPayload } from "jose";
import { serverSupabaseServiceRole } from "#supabase/server";
import bcrypt from "bcryptjs";

interface AdminPayload extends JWTPayload {
  id: string;
  role: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password, full_name, role } = body;

  const token = getCookie(event, "auth_token");
  const config = useRuntimeConfig();

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  try {
    const secret = new TextEncoder().encode(config.jwtSecret);
    const { payload } = (await jwtVerify(token, secret)) as { payload: AdminPayload };

    // PROTEKSI: Hanya super_admin yang boleh mendaftarkan akun baru
    if (payload.role !== "super_admin") {
      throw createError({ statusCode: 403, statusMessage: "Forbidden" });
    }

    const client = serverSupabaseServiceRole(event);

    // Enkripsi password menggunakan bcryptjs (menyamakan standar API update profile Anda)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data: newAccount, error } = await client
      .from("admin_accounts")
      .insert({
        username,
        password: hashedPassword,
        full_name,
        role
      })
      .select("id, username, full_name, role")
      .single();

    if (error) {
      // Handle jika username duplikat (Postgres Error Code 23505)
      if (error.code === "23505") {
        throw createError({ statusCode: 400, statusMessage: "Username sudah digunakan." });
      }
      throw error;
    }

    return { success: true, message: "Account created successfully", data: newAccount };
  } catch (e: any) {
    throw createError({
      statusCode: e.statusCode || 500,
      statusMessage: e.statusMessage || "Failed to create account.",
    });
  }
});