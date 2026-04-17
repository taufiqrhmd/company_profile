<template>
  <section id="contact" class="relative -mt-px py-24 md:py-40 bg-soft dark:bg-darkBg transition-colors duration-700 overflow-hidden">
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="container max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
        
        <div class="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
          <div class="flex items-center justify-center lg:justify-start gap-4">
            <div class="w-8 md:w-12 h-px bg-primary"></div>
            <span class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-primary">Let's Connect</span>
          </div>
          <h2 class="text-6xl md:text-[8rem] font-black leading-[0.9] md:leading-[0.85] tracking-tighter uppercase text-dark dark:text-soft">
            HAVE AN <br />
            <span class="text-primary italic">IDEA?</span>
          </h2>
        </div>

        <div class="lg:col-span-5 flex flex-col gap-5">
          
          <a href="mailto:hello@digitalexcellent.com"
            class="group flex items-center justify-between p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] 
                   bg-white dark:bg-darkCard 
                   text-dark dark:text-soft 
                   border border-dark/[0.05] dark:border-soft/[0.05]
                   shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                   transition-all duration-500 hover:bg-primary hover:border-primary hover:text-dark hover:-translate-y-1">
            <div class="text-left">
              <p class="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-dark/60">Quick Inquiry</p>
              <h4 class="text-xl md:text-2xl font-black uppercase tracking-tighter group-hover:text-dark">Send an Email</h4>
            </div>
            <div class="w-12 h-12 rounded-full border border-dark/10 dark:border-soft/10 flex items-center justify-center 
                        group-hover:bg-dark group-hover:text-white transition-all duration-500">
              <Icon name="heroicons:envelope-20-solid" class="w-5 h-5" />
            </div>
          </a>

          <button class="group flex items-center justify-between p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] 
                         bg-dark/[0.02] dark:bg-soft/[0.02]
                         border border-dark/10 dark:border-soft/10 
                         text-dark dark:text-soft
                         transition-all duration-500 
                         hover:border-primary hover:bg-primary/5 hover:-translate-y-1 shadow-sm">
            <div class="text-left">
              <p class="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary">Schedule Now</p>
              <h4 class="text-xl md:text-2xl font-black uppercase tracking-tighter">15-Min Discovery Call</h4>
            </div>
            <div class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-dark 
                        shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
              <Icon name="heroicons:calendar-days-20-solid" class="w-5 h-5" />
            </div>
          </button>

        </div>
      </div>
    </div>
  </section>
</template>