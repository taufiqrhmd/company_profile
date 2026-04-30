// server/api/auth/login.post.ts
import { serverSupabaseServiceRole } from "#supabase/server";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = serverSupabaseServiceRole(event);
  const config = useRuntimeConfig();

  const { data: user, error } = await client
    .from("admin_accounts")
    .select("*")
    .eq("username", body.username)
    .single();

  if (error || !user) {
    throw createError({
      statusCode: 401,
      statusMessage: "User Tidak Ditemukan",
    });
  }

  // Gunakan bcryptjs untuk membandingkan password ter-hash
  const isPasswordValid = await bcrypt.compare(body.password, user.password);

  if (!isPasswordValid) {
    throw createError({ statusCode: 401, statusMessage: "Password Salah" });
  }

  const jwtSecret = config.jwtSecret;
  if (!jwtSecret || jwtSecret.length === 0) {
    throw createError({
      statusCode: 500,
      statusMessage:
        "Konfigurasi Server Salah: JWT Secret belum dikonfigurasi.",
    });
  }

  // Pastikan JWT_SECRET konsisten diambil dari config
  const secret = new TextEncoder().encode(config.jwtSecret);
  const token = await new SignJWT({
    id: user.id,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);

  // PENTING: Simpan token ke dalam cookie agar bisa dibaca middleware
  setCookie(event, "auth_token", token, {
    httpOnly: true, // Lebih aman dari XSS
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 2, // 2 jam sesuai setExpirationTime
    path: "/", // Agar bisa diakses di semua path (termasuk / dan /admin)
  });

  return {
    success: true,
    user: {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      role: user.role,
    },
  };
});
