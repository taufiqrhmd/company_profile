<template>
  <main class="min-h-screen bg-soft dark:bg-[#050505] transition-colors duration-700">
    <div v-if="project" class="container max-w-7xl mx-auto px-4 pt-24 pb-20">
      
      <!-- Header Detail -->
      <div class="mb-16">
        <NuxtLink to="/projects" class="inline-flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest mb-8 group">
          <Icon name="solar:arrow-left-bold" class="group-hover:-translate-x-1 transition-transform" /> 
          Back to Archive
        </NuxtLink>
        
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <h1 class="text-6xl md:text-8xl font-black text-dark dark:text-soft tracking-tighter uppercase leading-none">
            {{ project.title }}
          </h1>
          <div class="text-right">
             <p class="text-3xl font-black text-primary leading-none">{{ project.impact }}</p>
             <p class="text-[10px] uppercase font-bold text-dark/40 dark:text-soft/40 tracking-widest">{{ project.impact_label }}</p>
          </div>
        </div>
      </div>

      <!-- Hero Image -->
      <div class="relative rounded-[3rem] overflow-hidden shadow-2xl mb-20">
        <img :src="project.image ?? 'undefined'" :alt="project.title" class="w-full aspect-video object-cover" />
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div class="lg:col-span-8 space-y-12">
          <section>
            <h2 class="text-xs font-black uppercase text-primary tracking-[0.3em] mb-6">The Story</h2>
            <div class="prose prose-lg dark:prose-invert max-w-none text-dark/70 dark:text-soft/60 italic leading-relaxed">
              <p class="text-2xl font-bold mb-8 text-dark dark:text-soft">{{ project.project_details?.description }}</p>
              <p>{{ project.project_details?.full_story_1 }}</p>
              <p>{{ project.project_details?.full_story_2 }}</p>
            </div>
          </section>
        </div>

        <div class="lg:col-span-4 space-y-10">
          <div class="p-8 rounded-3xl bg-white dark:text-soft dark:bg-soft/5 border border-dark/5 dark:border-soft/10">
            <h3 class="text-xs font-black uppercase tracking-widest mb-6">Tech Stack</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in project.project_details?.tech_stack" :key="tech"
                class="px-4 py-2 bg-dark dark:bg-primary text-white dark:text-dark text-[10px] font-black rounded-lg">
                {{ tech }}
              </span>
            </div>
            
            <div class="mt-12 pt-8 border-t border-dark/10 dark:border-soft/10">
              <div class="flex justify-between items-center">
                <span class="text-[10px] font-black uppercase tracking-widest opacity-40">Views</span>
                <span class="text-xl font-black">{{ project.views || 0 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="text-primary font-black animate-pulse uppercase tracking-[0.5em]">Loading Vision...</div>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const { allProjects, incrementViews } = useProjects();

const project = computed(() => {
  return allProjects.value?.find(p => p.id === route.params.id || p.id.toString() === route.params.id);
});

definePageMeta({
  hideTopbar: true
});

useHead({
  title: project.value ? `${project.value.title} — Digital Excellent Studio` : 'Project Detail',
});

onMounted(async () => {
  const projectId = route.params.id;
  const storageKey = `viewed_project_${projectId}`;

  // Cek apakah user sudah melihat proyek ini dalam sesi browser saat ini
  if (!sessionStorage.getItem(storageKey)) {
    await incrementViews(projectId as string);
    
    // Tandai bahwa proyek ini sudah dihitung view-nya untuk sesi ini
    sessionStorage.setItem(storageKey, 'true');
  }
});
</script>