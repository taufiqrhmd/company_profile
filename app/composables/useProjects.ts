// composables/useProjects.ts
import type { ProjectWithDetails } from "../../types/index"; 
import type { Database } from "../../types/database.types";

export const useProjects = () => {
  const client = useSupabaseClient<Database>()

  // useAsyncData tidak perlu diawali await di luar fungsi, Nuxt akan mengembalikan Ref secara reaktif
  const { data: allProjects, error, refresh } = useAsyncData(
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
      
      // Mengembalikan data dengan casting ke tipe custom milikmu
      return data as ProjectWithDetails[];
    }
  );

  // Mengunci parameter ke string (karena ID di tabel adalah UUID string)
  const incrementViews = async (projectId: string) => {
    try {
      // Memanggil RPC secara native dengan type-safety dari Database
      const { error } = await client.rpc('increment_project_views', { 
        row_id: projectId 
      });
      
      if (error) throw error;
      
      // Opsional: Jika ingin angka views di halaman detail langsung berubah secara realtime tanpa reload
      if (allProjects.value) {
        const project = allProjects.value.find(p => p.id === projectId);
        if (project) {
          project.views = (project.views || 0) + 1;
        }
      }
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