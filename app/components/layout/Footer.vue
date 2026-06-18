<template>
  <footer
    class="relative -mt-px bg-dark dark:bg-[#050505] pt-20 md:pt-24 pb-10 md:pb-12 overflow-hidden transition-colors duration-700">

    <div
      class="absolute bottom-[-2%] left-[-5%] md:bottom-[-5%] pointer-events-none select-none opacity-[0.03] md:opacity-[0.05] dark:opacity-[0.08]">
      <h2
        class="text-[8rem] sm:text-[15rem] md:text-[25rem] font-black leading-none tracking-tighter text-white uppercase">
        EXCELLENT
      </h2>
    </div>

    <div class="container max-w-7xl mx-auto px-6 relative z-10 text-white">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 pb-16 md:pb-20 border-b border-white/10">
        <div v-for="(section, title) in footerLinks" :key="title" class="space-y-5 md:space-y-6">
          <h4 class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary">
            {{ title }}
          </h4>

          <div class="flex flex-col gap-2.5">
            <div v-for="link in section" :key="link.label">
              <a v-if="link.url" :href="link.url" @click.prevent="handleFooterNav(link.url)"
                class="text-white/40 text-[10px] md:text-xs hover:text-primary transition-colors tracking-widest uppercase leading-loose block w-fit">
                {{ link.label }}
              </a>

              <span v-else
                class="text-white/40 text-[10px] md:text-xs tracking-widest uppercase leading-loose cursor-default block">
                {{ link.label }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-10 md:pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div class="text-xl md:text-2xl font-black tracking-tighter uppercase text-white">
          DIGITAL EXCELLENT
        </div>
        <p
          class="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/20 max-w-[250px] md:max-w-none">
          © 2026 DIGITAL EXCELLENT STUDIO. <br class="md:hidden" /> CRAFTED WITH PRECISION.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Mengubah struktur data link agar memiliki URL tujuan yang jelas (bukan '#' kosong)
const footerLinks = {
  "The Studio": [
    { label: "Equity Tower, 25th Floor", url: "" },
    { label: "SCBD, Jakarta Selatan", url: "" },
    { label: "Indonesia", url: "" }
  ],
  "Contact Us": [
    { label: "hello@digitalexcellent.com", url: "mailto:hello@digitalexcellent.com" },
    { label: "+62 (21) 1234 567", url: "tel:+62211234567" }
  ],
  "Inspiration": [
    { label: "Portfolio", url: "#portfolio" },
    { label: "Services", url: "#services" },
    { label: "Our Story", url: "#about" },
    { label: "Careers", url: "/careers" }
  ],
  "Socials": [
    { label: "Instagram", url: "https://instagram.com" },
    { label: "LinkedIn", url: "https://linkedin.com" },
    { label: "Twitter", url: "https://twitter.com" },
    { label: "Dribbble", url: "https://dribbble.com" }
  ]
};

// Fungsi navigasi pintar untuk menangani anchor link internal web maupun external link sosmed
const handleFooterNav = async (url: string) => {
  if (url.startsWith('#')) {
    if (route.path !== '/') {
      await router.push('/');
      setTimeout(() => scrollToSection(url), 100);
    } else {
      scrollToSection(url);
    }
  } else {
    // Jika external link (seperti media sosial), buka tab baru
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

const scrollToSection = (id: string) => {
  const el = document.querySelector(id);
  if (el) {
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - 80; // Offset tinggi header sticky
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
</script>