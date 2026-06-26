<template>
  <section id="testimonials"
    class="py-20 md:py-28 bg-white dark:bg-[#050505] transition-colors duration-500 overflow-hidden relative">
    
    <div class="container max-w-7xl mx-auto px-4 md:px-6 mb-12 md:mb-16">
      <div class="max-w-2xl space-y-4 reveal-up">
        <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <span class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary">Social Proof</span>
        </div>
        <h2 class="text-4xl sm:text-5xl md:text-7xl font-black text-dark dark:text-soft leading-[0.9] tracking-tighter uppercase">
          WHAT THEY SAY <br />
          <span class="text-primary">ABOUT US.</span>
        </h2>
      </div>
    </div>

    <div class="space-y-6 md:space-y-8 relative z-10">
      
      <div class="marquee-wrapper border-y border-dark/5 dark:border-white/5 py-4 bg-soft/30 dark:bg-[#0F0F0F]/20">
        <div class="marquee-track marquee-left group">
          <div v-for="loop in 2" :key="`loop-left-${loop}`" class="marquee-content flex gap-6 pr-6">
            <div v-if="testimonialsRow1.length === 0" class="text-xs uppercase tracking-widest text-dark/30 dark:text-soft/30 py-4 px-8">
              Gathering elite reviews...
            </div>
            
            <div v-else v-for="(review, index) in testimonialsRow1" :key="`r1-${index}`"
              class="w-[350px] md:w-[420px] shrink-0 p-6 md:p-8 bg-white dark:bg-[#0F0F0F] border border-dark/5 dark:border-white/5 rounded-[2rem] flex flex-col justify-between transition-all duration-500 hover:border-primary/30 dark:hover:border-primary/20 hover:shadow-xl shadow-primary/5">
              
              <div class="space-y-4">
                <div class="flex gap-1 text-primary">
                  <Icon v-for="star in 5" :key="star" name="solar:star-bold" class="w-4 h-4" />
                </div>
                <p class="text-sm md:text-base text-dark/70 dark:text-soft/50 leading-relaxed font-medium">
                  "{{ review.comment }}"
                </p>
              </div>

              <div class="flex items-center gap-4 mt-6 pt-4 border-t border-dark/5 dark:border-white/5">
                <div class="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0">
                  <img :src="'/avatardefault_92824.webp'" class="w-full h-full object-cover" loading="lazy" :alt="review.name" />
                </div>
                <div>
                  <h4 class="text-sm md:text-base font-black text-dark dark:text-soft uppercase tracking-tight">
                    {{ review.name }}
                  </h4>
                  <p class="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-dark/40 dark:text-soft/30 mt-0.5">
                    {{ review.position }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="marquee-wrapper border-b border-dark/5 dark:border-white/5 py-4 bg-soft/30 dark:bg-[#0F0F0F]/20">
        <div class="marquee-track marquee-right group">
          <div v-for="loop in 2" :key="`loop-right-${loop}`" class="marquee-content flex gap-6 pr-6">
            <div v-if="testimonialsRow2.length === 0" class="text-xs uppercase tracking-widest text-dark/30 dark:text-soft/30 py-4 px-8">
              Gathering elite reviews...
            </div>

            <div v-else v-for="(review, index) in testimonialsRow2" :key="`r2-${index}`"
              class="w-[350px] md:w-[420px] shrink-0 p-6 md:p-8 bg-white dark:bg-[#0F0F0F] border border-dark/5 dark:border-white/5 rounded-[2rem] flex flex-col justify-between transition-all duration-500 hover:border-primary/30 dark:hover:border-primary/20 hover:shadow-xl shadow-primary/5">
              
              <div class="space-y-4">
                <div class="flex gap-1 text-primary">
                  <Icon v-for="star in 5" :key="star" name="solar:star-bold" class="w-4 h-4" />
                </div>
                <p class="text-sm md:text-base text-dark/70 dark:text-soft/50 leading-relaxed font-medium">
                  "{{ review.comment }}"
                </p>
              </div>

              <div class="flex items-center gap-4 mt-6 pt-4 border-t border-dark/5 dark:border-white/5">
                <div class="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-dark shrink-0">
                  <img :src="'/avatardefault_92824.webp'" class="w-full h-full object-cover" loading="lazy" :alt="review.name" />
                </div>
                <div>
                  <h4 class="text-sm md:text-base font-black text-dark dark:text-soft uppercase tracking-tight">
                    {{ review.name }}
                  </h4>
                  <p class="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-dark/40 dark:text-soft/30 mt-0.5">
                    {{ review.position }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-white dark:from-[#050505] to-transparent pointer-events-none z-20"></div>
    <div class="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-white dark:from-[#050505] to-transparent pointer-events-none z-20"></div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Testimonial {
  name: string;
  position: string;
  comment: string;
  row_placement: number | null;
}

const supabase = useSupabaseClient();

const testimonialsRow1 = ref<Testimonial[]>([]);
const testimonialsRow2 = ref<Testimonial[]>([]);
let testimonialChannel: any = null;

// Fungsi Fetch Data dari DB
const fetchTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('name, position, comment, row_placement') 
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading testimonials:', error.message);
    return;
  }

  if (data) {
    // Memisahkan baris tetap berjalan normal menggunakan data 'row_placement'
    testimonialsRow1.value = data.filter(item => item.row_placement === 1);
    testimonialsRow2.value = data.filter(item => item.row_placement === 2);
  }
};

onMounted(async () => {
  // Ambil data awal
  await fetchTestimonials();

  if (!import.meta.client) return;

  // Dengarkan perubahan database secara Realtime (INSERT, UPDATE, DELETE)
  testimonialChannel = supabase
    .channel('realtime:testimonials')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'testimonials' },
      () => {
        fetchTestimonials();
      }
    )
    .subscribe();

  // Intersection Observer Animasi Title
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));
});

// Putus koneksi realtime jika user pindah halaman
onUnmounted(() => {
  if (testimonialChannel) {
    supabase.removeChannel(testimonialChannel);
  }
});
</script>

<style scoped>
.reveal-up {
  opacity: 0;
  transform: translateY(35px);
  transition: all 1s cubic-bezier(0.25, 1, 0.5, 1);
}
.reveal-up.active {
  opacity: 1;
  transform: translateY(0);
}

.marquee-wrapper {
  display: flex;
  overflow: hidden;
  width: 100%;
}

.marquee-track {
  display: flex;
  width: max-content;
}

.marquee-content {
  animation-duration: 60s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.marquee-left .marquee-content { animation-name: scrollLeft; }
.marquee-right .marquee-content { animation-name: scrollRight; }
.marquee-track:hover .marquee-content { animation-play-state: paused; }

@keyframes scrollLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}
@keyframes scrollRight {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}
</style>
