// server/api/auth/login.post.ts
import { serverSupabaseServiceRole } from "#supabase/server";
import { SignJWT } from "jose";

import type { AdminAccount } from "../../../types/index"; 
import type { Database } from "../../../types/database.types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  const client = serverSupabaseServiceRole<Database>(event);
  const config = useRuntimeConfig();

  const { data, error } = await client
    .from("admin_accounts")
    .select("*")
    .eq("username", body.username)
    .single();

    const user = data as AdminAccount | null;

  if (error || !user) {
    throw createError({ statusCode: 401, statusMessage: "Kredensial salah" });
  }

  // 2. Verifikasi Password 
  if (user.password !== body.password) {
    throw createError({ statusCode: 401, statusMessage: "Kredensial salah" });
  }

  // 3. Buat JWT
  const secret = new TextEncoder().encode(config.jwtSecret || 'secret-key-anda-yang-sangat-panjang');
  const token = await new SignJWT({ 
    id: user.id, 
    role: user.role // TypeScript sudah tahu user.role ada dan bertipe string | null
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);

  return {
    success: true,
    token: token
  };
});
