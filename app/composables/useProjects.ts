// composables/useProjects.ts
import type { ProjectWithDetails } from "../../types/index"; 
import type { Database } from "../../types/database.types";

export const useProjects = async () => {
  const client = useSupabaseClient<Database>()

  const { data: allProjects, error, refresh } = await useAsyncData(
    'projects-archive',
    async () => {
      const { data, error } = await client
        .from("projects")
        .select(`
          *,
          project_details (
            category,
            description,
            full_story_1,
            full_story_2,
            tech_stack
          )
        `)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as ProjectWithDetails[];
    }
  );

  // Fungsi untuk menambah views
  const incrementViews = async (projectId: string | number) => {
    try {
      // Kita memanggil fungsi SQL 'increment_views' di Supabase
      const { error } = await (client as any).rpc('increment_project_views', { 
        row_id: projectId 
      });
      if (error) throw error;
    } catch (err) {
      console.error('Error incrementing views:', err);
    }
  };

  return { 
    allProjects, 
    error, 
    refresh,
    incrementViews
  };
};