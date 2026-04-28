// server/api/auth/login.post.ts
import { serverSupabaseClient } from '#supabase/server'

interface AdminAccount {
  username: string
  password: string
  full_name: string
  role: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  // Ambil data dengan memberitahu tipe kembaliannya
  const { data, error } = await client
    .from('admin_accounts')
    .select('*')
    .eq('username', body.username)
    .single()

  // Cast data ke interface yang kita buat
  const user = data as AdminAccount | null

  if (error || !user) {
    throw createError({ statusCode: 401, statusMessage: 'Akun tidak ditemukan' })
  }

  if (user.password !== body.password) {
    throw createError({ statusCode: 401, statusMessage: 'Password salah' })
  }

  // Hapus password sebelum dikirim ke frontend
  const { password, ...safeUser } = user
  
  return {
    success: true,
    user: safeUser,
    token: `token-${Buffer.from(user.username).toString('base64')}`
  }
})