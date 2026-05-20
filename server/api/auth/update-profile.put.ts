// server/api/auth/update-profile.put.ts
import { defineEventHandler, readBody, createError, getCookie } from "h3";
import { jwtVerify, JWTPayload } from "jose";
import { serverSupabaseServiceRole } from "#supabase/server";
import bcrypt from "bcryptjs";

interface AdminPayload extends JWTPayload {
  id: string;
  role: string;
}

export default defineEventHandler(async (event) => {
  // 1. Ambil data form dari frontend modal
  const body = await readBody(event);
  const { full_name, password } = body;

  // 2. Ambil token dari cookie 'auth_token'
  const token = getCookie(event, "auth_token");
  const config = useRuntimeConfig();

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized - Your session has ended.",
    });
  }

  let adminId: string;

  try {
    // 3. Verifikasi JWT menggunakan 'jose' dengan secret yang sama persis
    const secret = new TextEncoder().encode(config.jwtSecret);
    const { payload } = (await jwtVerify(token, secret)) as {
      payload: AdminPayload;
    };
    
    adminId = payload.id;
  } catch (e) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized - Token is invalid or has expired.",
    });
  }

  // 4. Inisialisasi client Supabase dengan Service Role (Bypass RLS)
  const client = serverSupabaseServiceRole(event);

  try {
    // Siapkan data untuk di-update ke tabel admin_accounts
    const updateData: { full_name?: string; password?: string } = {
      full_name: full_name,
    };

    // Jika user mengisi password baru, enkripsi dulu menggunakan bcryptjs
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }

    // 5. Eksekusi update data ke database Supabase berdasarkan id dari JWT payload
    const { data: updatedUser, error } = await client
      .from("admin_accounts")
      .update(updateData)
      .eq("id", adminId)
      .select("id, username, full_name, role")
      .single();

    if (error || !updatedUser) {
      console.error("Supabase Update Error:", error?.message);
      throw createError({
        statusCode: 400,
        statusMessage: "Failed to update profile data to database.",
      });
    }

    // 6. Kembalikan respon sukses beserta data terbarunya
    return {
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    };

  } catch (error: any) {
    console.error("Server Internal Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Failed to update profile data.",
    });
  }
});