<template>
  <footer class="relative -mt-px bg-dark dark:bg-[#0A0A0A] pt-20 md:pt-24 pb-10 md:pb-12 overflow-hidden transition-colors duration-700">
    <div class="absolute bottom-[-2%] left-[-5%] md:bottom-[-5%] pointer-events-none select-none opacity-[0.03] md:opacity-[0.05]">
      <h2 class="text-[8rem] sm:text-[15rem] md:text-[25rem] font-black leading-none tracking-tighter text-white">
        EXCELLENT
      </h2>
    </div>

    <div class="container max-w-7xl mx-auto px-6 relative z-10 text-white">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 pb-16 md:pb-20 border-b border-white/10">
        <div v-for="(section, title) in footerLinks" :key="title" class="space-y-5 md:space-y-6">
          <h4 class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary">{{ title }}</h4>
          <div class="flex flex-col gap-2.5">
            <a v-for="link in section" :key="link" href="#" 
               class="text-white/40 text-[10px] md:text-xs hover:text-primary transition-colors tracking-widest uppercase leading-loose">
              {{ link }}
            </a>
          </div>
        </div>
      </div>

      <div class="pt-10 md:pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div class="text-xl md:text-2xl font-black tracking-tighter uppercase">
          DIGITAL EXCELLENT
        </div>
        <p class="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/20 max-w-[250px] md:max-w-none">
          © 2026 DIGITAL EXCELLENT STUDIO. <br class="md:hidden" /> CRAFTED WITH PRECISION.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerLinks = {
  "The Studio": ["Equity Tower, 40th Floor", "SCBD, Jakarta Selatan", "Indonesia"],
  "Contact Us": ["hello@digitalexcellent.com", "+62 (21) 1234 567"],
  "Inspiration": ["Portfolio", "Services", "Our Story", "Careers"],
  "Socials": ["Instagram", "LinkedIn", "Behance", "Dribbble"]
};
</script>