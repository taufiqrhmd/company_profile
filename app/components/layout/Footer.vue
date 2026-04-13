<template>
  <footer class="relative -mt-px -mb-px bg-dark dark:bg-[#0A0A0A] pt-32 pb-12 overflow-hidden transition-colors duration-700">
    <div class="absolute bottom-[-5%] left-[-5%] pointer-events-none select-none opacity-[0.05]">
      <h2 class="text-[15rem] md:text-[25rem] font-black leading-none tracking-tighter text-white">
        EXCELLENT
      </h2>
    </div>

    <div class="container max-w-7xl mx-auto px-6 relative z-10 text-white">
      <div class="grid lg:grid-cols-12 gap-16 mb-32 items-center">
        <div class="lg:col-span-7 space-y-8">
          <div class="flex items-center gap-4">
            <div class="w-12 h-px bg-primary"></div>
            <span class="text-[10px] font-black uppercase tracking-[0.6em] text-primary">Let's Connect</span>
          </div>
          <h2 class="text-6xl md:text-[7rem] font-black leading-[0.85] tracking-tighter uppercase">
            HAVE AN <br />
            <span class="text-primary italic">IDEA?</span>
          </h2>
        </div>

        <div class="lg:col-span-5 flex flex-col gap-4">
          <a href="mailto:hello@digitalexcellent.com"
            class="group flex items-center justify-between p-8 rounded-[2rem] bg-white text-dark transition-all duration-500 hover:bg-primary">
            <div class="text-left">
              <p class="text-[10px] font-black uppercase tracking-widest opacity-40">Quick Inquiry</p>
              <h4 class="text-2xl font-black uppercase tracking-tighter">Send an Email</h4>
            </div>
            <div class="w-12 h-12 rounded-full border border-dark/10 flex items-center justify-center group-hover:bg-dark group-hover:text-white transition-all">
              <Icon name="heroicons:envelope-20-solid" class="w-5 h-5" />
            </div>
          </a>
          <button class="group flex items-center justify-between p-8 rounded-[2rem] border border-white/20 hover:border-primary transition-all duration-500">
            <div class="text-left">
              <p class="text-[10px] font-black uppercase tracking-widest text-primary">Schedule Now</p>
              <h4 class="text-2xl font-black uppercase tracking-tighter">15-Min Discovery Call</h4>
            </div>
            <div class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-dark">
              <Icon name="heroicons:calendar-days-20-solid" class="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20 border-b border-white/10">
        <div v-for="(section, title) in footerLinks" :key="title" class="space-y-6">
          <h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{{ title }}</h4>
          <div class="flex flex-col gap-2">
            <a v-for="link in section" :key="link" href="#" class="text-white/40 text-xs hover:text-primary transition-colors tracking-widest uppercase">{{ link }}</a>
          </div>
        </div>
      </div>

      <div class="pt-12 flex flex-col md:row justify-between items-center gap-6">
        <div class="text-2xl font-black tracking-tighter uppercase">
          DIGITAL EXCELLENT
        </div>
        <p class="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
          © 2026 DIGITAL EXCELLENT STUDIO. CRAFTED WITH PRECISION.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerLinks = {
  "The Studio": ["Equity Tower, 49th Floor", "SCBD, Jakarta Selatan", "Indonesia"],
  "Contact Us": ["hello@digitalexcellent.com", "+62 (21) 1234 567"],
  "Inspiration": ["Portfolio", "Services", "Our Story", "Careers"],
  "Socials": ["Instagram", "LinkedIn", "Behance", "Dribbble"]
};
</script>