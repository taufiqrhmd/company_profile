<template>
  <div class="relative overflow-visible">
    <Hero />
    
    <section id="services" class="relative">
      <Expertise />
      <div class="absolute top-0 right-0 w-1/2 h-full bg-primary dark:bg-primary/[0.05] -skew-x-12 translate-x-[50%] pointer-events-none -z-10"></div>
    </section>

    <section id="portfolio" class="relative">
      <CaseStudies />
    </section>

    <OurStory />
    <Contact />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Hero from '~/components/sections/Hero.vue';
import Expertise from '~/components/sections/Expertise.vue';
import CaseStudies from '~/components/sections/CaseStudies.vue';
import OurStory from '~/components/sections/OurStory.vue';
import Footer from '~/components/layout/Footer.vue';
import Contact from '~/components/sections/Contact.vue';

</script>