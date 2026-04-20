// composables/useProjects.ts
export interface Project {
  title: string;
  category: string;
  impact: string;
  impactLabel: string; 
  description: string;
  icon: string;
  image: string;
  tech: string[];
}

export const useProjects = async () => {
  const client = useSupabaseClient<any>();

  const { data: allProjects, error } = await useAsyncData(
    'projects',
    async () => {
      const { data, error } = await client
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
  );

  return { allProjects };
};
