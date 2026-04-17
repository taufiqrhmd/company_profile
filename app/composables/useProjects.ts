// composables/useProjects.ts
export const useProjects = () => {
  const allProjects = [
    {
      title: "Lumina Retail",
      category: "E-commerce & Branding",
      impact: "+140%",
      description: "Transformasi ekosistem digital untuk ritel fashion global dengan fokus pada konversi dan pengalaman belanja yang seamless.",
      icon: "heroicons:shopping-bag",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099&auto=format&fit=crop",
      tech: ["Nuxt 3", "Tailwind CSS", "GSAP", "Pinia"]
    },
    {
      title: "Arthra Fintech",
      category: "Financial Technology",
      impact: "2.4M",
      description: "Sistem perbankan modern dengan keamanan tingkat tinggi, integrasi gateway pembayaran, dan manajemen aset real-time.",
      icon: "heroicons:banknotes",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      tech: ["Flutter", "Laravel", "PostgreSQL", "Redis"]
    },
    {
      title: "Nova Arch",
      category: "Architecture Portfolio",
      impact: "85K+",
      description: "Platform showcase arsitektur dengan navigasi imersif dan galeri interaktif untuk memamerkan proyek berskala besar.",
      icon: "heroicons:building-office-2",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      tech: ["Vue 3", "Three.js", "Tailwind CSS", "Vite"]
    },
    {
      title: "Virtue Health",
      category: "Healthcare Solution",
      impact: "99.9%",
      description: "Aplikasi manajemen data pasien dan penjadwalan konsultasi dokter dengan enkripsi data end-to-end yang aman.",
      icon: "heroicons:heart",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
      tech: ["Nuxt 3", "Node.js", "MongoDB", "Express"]
    },
    {
      title: "Zenith SaaS",
      category: "B2B Dashboard",
      impact: "45%",
      description: "Dashboard analitik untuk perusahaan SaaS yang menyajikan visualisasi data kompleks menjadi informasi yang mudah dipahami.",
      icon: "heroicons:chart-bar",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      tech: ["React", "D3.js", "Firebase", "Tailwind"]
    },
    {
      title: "EcoSphere App",
      category: "Non-Profit Initiative",
      impact: "12K",
      description: "Aplikasi monitoring jejak karbon dan komunitas lingkungan untuk mendorong gaya hidup berkelanjutan secara global.",
      icon: "heroicons:globe-americas",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop",
      tech: ["Flutter", "Firebase", "Google Maps API", "Cloud Functions"]
    }
  ];

  return { allProjects };
};