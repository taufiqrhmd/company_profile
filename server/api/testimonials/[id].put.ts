import { useServerSupabase } from "~~/server/utils/supabase";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  
  // 1. Validasi ID
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID is required' });
  }

  const client = useServerSupabase();

  // 2. Lakukan Update
  const { error } = await client
    .from('testimonials')
    .update({
      name: body.name,
      position: body.position,
      comment: body.comment,
      avatar: body.avatar || null, // Memastikan null jika string kosong
      row_placement: body.row_placement || 1
    })
    .eq('id', id);

  // 3. Penanganan Error
  if (error) {
    throw createError({ 
      statusCode: 500, 
      statusMessage: `Failed to update testimonial: ${error.message}` 
    });
  }

  return { success: true };
});