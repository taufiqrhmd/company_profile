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
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Gunakan tipe ProjectWithDetails[] yang sudah kita buat di types/index.ts
      return data as ProjectWithDetails[];
    }
  );

  return { 
    allProjects, 
    error, 
    refresh 
  };
};