<template>
  <div class="relative overflow-visible">
    <SectionsHero />
    
    <section id="services" class="relative">
      <SectionsExpertise />
      <div class="absolute top-0 right-0 w-1/2 h-full bg-primary dark:bg-primary/[0.05] -skew-x-12 translate-x-[50%] pointer-events-none -z-10"></div>
    </section>

    <section id="portfolio" class="relative">
      <SectionsCaseStudies />
    </section>

    <SectionsOurStory />
    <SectionsContact />
    <LayoutFooter />
  </div>
</template>

