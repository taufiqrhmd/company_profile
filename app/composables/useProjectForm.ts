// composables/useProjectForm.ts
interface ProjectDetails {
  category: string
  description: string
  full_story_1: string
  full_story_2: string
  tech_stack: string[]
}

interface ProjectForm {
  id?: string | number; // Gunakan tanda tanya (?) untuk opsional
  title: string;
  impact: string;
  impact_label: string;
  icon: string;
  image: string;
  category: string;
  description: string;
  full_story_1: string;
  full_story_2: string;
  tech_stack: string[]; 
  project_details?: ProjectDetails | ProjectDetails[];
}

export const useProjectForm = () => {
  const isModalOpen = ref(false);
  const isEditMode = ref(false);
  const selectedFile = ref<File | null>(null);
  const imagePreview = ref("");

  const formData = reactive<ProjectForm>({
    title: "",
    impact: "",
    impact_label: "",
    icon: "heroicons:cube",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    category: "",
    description: "",
    full_story_1: "",
    full_story_2: "",
    tech_stack: [],
  });

  const resetForm = () => {
    // Gunakan Object.assign agar reaktifitas tetap terjaga
    Object.assign(formData, {
      id: undefined,
      title: "",
      impact: "",
      impact_label: "",
      icon: "heroicons:cube",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      category: "",
      description: "",
      full_story_1: "",
      full_story_2: "",
      tech_stack: [],
    });
    selectedFile.value = null;
    imagePreview.value = "";
  };

  const populateForm = (project: any) => {
    const detail = Array.isArray(project.project_details)
      ? project.project_details[0]
      : project.project_details;
    Object.assign(formData, {
      ...project,
      category: detail?.category || "",
      description: detail?.description || "",
      full_story_1: detail?.full_story_1 || "",
      full_story_2: detail?.full_story_2 || "",
      tech_stack: detail?.tech_stack || [],
    });
    imagePreview.value = project.image;
  };
  return {
    formData,
    isModalOpen,
    isEditMode,
    selectedFile,
    imagePreview,
    resetForm,
    populateForm,
  };
};
