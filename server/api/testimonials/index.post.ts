import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const supabaseAdmin = createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceKey as string,
  );

  try {
    const { data, error } = await supabaseAdmin
      .from("testimonials")
      .insert({
        name: body.name,
        position: body.position,
        comment: body.comment,
        avatar: body.avatar || null,
        row_placement: body.row_placement || 1
      })
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      throw error; // Lempar ke blok catch
    }

    console.log("Insert Sukses:", data);
    return { success: true, data };
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Server Error]:", errorMessage);

    throw createError({
      statusCode: 500,
      statusMessage: errorMessage,
    });
  }
});