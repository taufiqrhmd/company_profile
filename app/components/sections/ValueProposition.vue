<template>
  <section class="relative py-20 md:py-28 px-4 md:px-6 bg-white dark:bg-[#050505] transition-colors duration-500 overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="container max-w-7xl mx-auto relative z-10">
      <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        <div class="lg:col-span-5 lg:sticky lg:top-28 space-y-6 reveal-up">
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary">Why Choose Us</span>
          </div>
          
          <h2 class="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-[1] tracking-tighter uppercase">
            WHY PARTNER WITH <br />
            <span class="text-primary">DIGITAL EXCELLENT?</span>
          </h2>
          
          <p class="text-sm md:text-base text-slate-500 dark:text-neutral-400 leading-relaxed">
            Kami tidak hanya membangun baris kode, kami menciptakan aset digital yang dirancang khusus untuk mendorong pertumbuhan efisiensi dan skalabilitas bisnis Anda dalam jangka panjang.
          </p>
        </div>

        <div class="lg:col-span-7 space-y-4 md:space-y-6">
          <div v-for="(feature, index) in features" :key="index"
            class="feature-item-reveal group relative p-6 md:p-8 rounded-2xl bg-slate-50 dark:bg-[#0F0F0F] border border-slate-200/50 dark:border-white/5 transition-all duration-500 hover:border-primary/30 dark:hover:border-primary/20"
            :style="{ '--delay': `${index * 150}ms` }">
            
            <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

            <div class="relative flex flex-col sm:flex-row items-start gap-5 md:gap-6 z-10">
              <div class="shrink-0 w-12 h-12 rounded-xl bg-white dark:bg-[#151515] border border-slate-200/60 dark:border-neutral-800 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 shadow-sm">
                <Icon :name="feature.icon" class="w-6 h-6" />
              </div>

              <div class="space-y-2">
                <h3 class="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase flex items-center gap-2">
                  <span class="text-primary/40 font-mono text-sm">0{{ index + 1 }}.</span>
                  {{ feature.title }}
                </h3>
                <p class="text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
                  {{ feature.description }}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

const features = [
  {
    icon: 'solar:ticker-star-bold',
    title: 'High-Fidelity Engineering',
    description: 'Setiap sistem dikembangkan dengan standard arsitektur clean-code menggunakan framework modern (Vue/Nuxt, TypeSafe) untuk performa super cepat, aman, dan mudah dikembangkan di masa depan.'
  },
  {
    icon: 'solar:users-group-rounded-bold',
    title: 'User-Centric UI/UX Design',
    description: 'Kami memastikan produk Anda tidak hanya canggih secara sistem, tetapi juga memiliki antarmuka yang intuitif, premium, dan memberikan kenyamanan maksimal bagi pengguna akhir.'
  },
  {
    icon: 'solar:shield-check-bold',
    title: 'Transparan & Tepat Waktu',
    description: 'Manajemen proyek yang terstruktur dengan pelaporan berkala melalui platform tracking. Anda tahu persis progres baris fitur Anda tanpa ada biaya tersembunyi.'
  },
  {
    icon: 'solar:chat-square-call-bold',
    title: 'Lifetime Support & Maintenance',
    description: 'Kemitraan kami tidak selesai setelah serah terima aplikasi. Kami menyediakan jaminan monitoring performa, penanganan bug, hingga konsultasi kelanjutan sistem.'
  }
];

onMounted(() => {
  if (!import.meta.client) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal-up, .feature-item-reveal').forEach((el) => observer.observe(el));
});
</script>

<style scoped>
.reveal-up,
.feature-item-reveal {
  opacity: 0;
  transition: all 1s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform, opacity;
}

.reveal-up { transform: translateY(35px); }
.feature-item-reveal {
  transform: translateY(40px);
  transition-delay: var(--delay, 0ms);
}

.reveal-up.active,
.feature-item-reveal.active {
  opacity: 1;
  transform: translate(0, 0);
}
</style>