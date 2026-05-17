// server/api/services/update.put.ts
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // 1. Validasi Input Dasar
  if (!body.id) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'ID layanan wajib disertakan' 
    })
  }

  // 2. Gunakan Service Role untuk bypass RLS (Admin Access)
  const client = serverSupabaseServiceRole(event)

  // 3. Eksekusi Update ke tabel 'services'
  const { data, error } = await client
    .from('services') // Pastikan nama tabel benar
    .update({ 
      title: body.title,
      description: body.description,
      icon: body.icon
    })
    .eq('id', body.id)
    .select()

  // 4. Error Handling
  if (error) {
    console.error('Supabase Service Role Error:', error)
    throw createError({ 
      statusCode: 500, 
      statusMessage: error.message 
    })
  }

  // 5. Cek jika baris memang ditemukan dan diupdate
  if (!data || data.length === 0) {
    return { 
      success: false, 
      message: `Tidak ada baris dengan ID ${body.id} yang ditemukan.` 
    }
  }

  return { success: true, data }
})