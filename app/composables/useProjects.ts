// composables/useProjects.ts

export interface Project {
  id: string;
  title: string;
  impact: string;
  impact_label: string; // Sesuai nama kolom di DB (snake_case)
  icon: string;
  image: string;
  // Data dari tabel detail akan masuk ke properti ini sebagai objek
  project_details: {
    category: string;
    description: string;
    full_story_1: string;
    full_story_2: string;
    tech_stack: string[];
  } | null;
}

export const useProjects = async () => {
  const client = useSupabaseClient();

  // Menggunakan useAsyncData untuk mengambil data terpusat
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
      
      // Kita casting sebagai Project[] agar TS mengenali properti project_details
      return data as unknown as Project[];
    }
  );

  return { 
    allProjects, 
    error, 
    refresh 
  };
};