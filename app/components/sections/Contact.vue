<template>
  <section id="contact" ref="contactSection"
    class="relative -mt-px py-24 md:py-40 bg-soft dark:bg-darkBg transition-colors duration-700 overflow-hidden">
    
    <div class="contact-glow absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 dark:bg-primary/15 rounded-full blur-[120px] pointer-events-none">
    </div>

    <div class="container max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">

        <div class="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
          <div class="reveal-left flex items-center justify-center lg:justify-start gap-4">
            <div class="w-8 md:w-12 h-px bg-primary"></div>
            <span class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-primary">
              Let's Connect
            </span>
          </div>
          
          <h2 class="contact-title text-6xl md:text-[8rem] font-black leading-[0.9] md:leading-[0.85] tracking-tighter uppercase text-dark dark:text-soft">
            <div class="overflow-hidden">
              <span class="reveal-up block">HAVE AN</span>
            </div>
            <div class="overflow-hidden">
              <span class="reveal-up block text-primary italic" style="--delay: 150ms">IDEA?</span>
            </div>
          </h2>
        </div>

        <div class="lg:col-span-5 flex flex-col gap-5">
          <a href="mailto:hello@digitalexcellent.com" 
            class="reveal-right contact-btn group flex items-center justify-between p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white dark:bg-darkCard text-dark dark:text-soft border border-dark/[0.08] dark:border-soft/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 hover:bg-primary hover:border-primary hover:text-dark hover:-translate-y-1"
            style="--delay: 300ms">
            <div class="text-left">
              <p class="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary dark:text-soft group-hover:text-dark/60 dark:group-hover:text-primary transition-colors">
                Quick Inquiry
              </p>
              <h4 class="dark:text-primary text-xl md:text-2xl font-black uppercase tracking-tighter dark:group-hover:text-soft">
                Send an Email
              </h4>
            </div>
            <div class="w-12 h-12 rounded-full border border-dark/10 dark:border-soft/10 flex items-center justify-center bg-primary dark:bg-soft text-dark group-hover:bg-dark group-hover:text-white transition-all duration-500">
              <Icon name="heroicons:envelope-20-solid" class="w-5 h-5" />
            </div>
          </a>

          <button 
            class="reveal-right contact-btn group flex items-center justify-between p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white dark:bg-darkCard text-dark dark:text-soft border border-dark/[0.08] dark:border-soft/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 hover:bg-primary hover:border-primary hover:text-dark hover:-translate-y-1"
            style="--delay: 450ms">
            <div class="text-left">
              <p class="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary dark:text-soft group-hover:text-dark/60 dark:group-hover:text-primary transition-colors">
                Schedule Now
              </p>
              <h4 class="dark:text-primary text-xl md:text-2xl font-black uppercase tracking-tighter dark:group-hover:text-soft">
                15-Min Discovery Call
              </h4>
            </div>
            <div class="w-12 h-12 rounded-full border border-dark/10 dark:border-soft/10 flex items-center justify-center bg-primary dark:bg-soft text-dark group-hover:bg-dark group-hover:text-white transition-all duration-500">
              <Icon name="heroicons:calendar-days-20-solid" class="w-5 h-5" />
            </div>
          </button>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue';

onMounted(async () => {
  if (!import.meta.client) return;

  await nextTick();

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('#contact .reveal-up, #contact .reveal-left, #contact .reveal-right');
  
  if (animatedElements.length === 0) {
    console.warn("Contact animations: No elements found to observe");
  }

  animatedElements.forEach((el) => observer.observe(el));
});
</script>

<style scoped>
.reveal-up, .reveal-left, .reveal-right {
  opacity: 0;
  visibility: hidden; 
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), 
              transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--delay, 0ms);
  will-change: transform, opacity;
}

.reveal-up {
  transform: translateY(80px); 
}

.reveal-left {
  transform: translateX(-40px);
}

.reveal-right {
  transform: translateX(40px);
}

.active.reveal-up,
.active.reveal-left,
.active.reveal-right {
  opacity: 1;
  visibility: visible;
  transform: translate(0, 0);
}

.contact-glow {
  animation: pulse-glow 8s infinite ease-in-out;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.1) translate(-5%, 5%); }
}
</style>