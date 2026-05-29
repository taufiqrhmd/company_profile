<template>
  <section id="contact" ref="contactSection"
    class="relative -mt-px py-24 md:py-40 bg-soft dark:bg-darkBg transition-colors duration-700 overflow-hidden">

    <div
      class="contact-glow absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 dark:bg-primary/15 rounded-full blur-[120px] pointer-events-none">
    </div>

    <div class="container max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">

        <div class="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
          <div class="reveal-left flex items-center justify-center lg:justify-start gap-4">
            <div class="w-8 md:w-12 h-px bg-primary"></div>
            <span
              class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-primary">
              Let's Connect
            </span>
          </div>

          <h2
            class="contact-title text-6xl md:text-[8rem] font-black leading-[0.9] md:leading-[0.85] tracking-tighter uppercase text-dark dark:text-soft">
            <div class="overflow-hidden">
              <span class="reveal-up block">HAVE AN</span>
            </div>
            <div class="overflow-hidden">
              <span class="reveal-up block text-primary italic" style="--delay: 150ms">IDEA?</span>
            </div>
          </h2>
        </div>

        <div class="lg:col-span-5">
          <form @submit.prevent="handleSubmit" novalidate
            class="reveal-right p-8 md:p-10 rounded-[2.5rem] text-dark dark:text-soft bg-white dark:bg-darkCard border border-dark/[0.08] dark:border-soft/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] space-y-5"
            style="--delay: 300ms">

            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col gap-1">
                  <input v-model="form.name" type="text" placeholder="Your Name (e.g. John Doe)" maxlength="50"
                    @blur="validateField('name')" :class="[fieldErrors.name ? 'border-red-500' : 'border-transparent']"
                    class="w-full px-5 py-4 rounded-2xl bg-soft dark:bg-darkBg border outline-none text-sm transition-all" />
                  <span v-if="fieldErrors.name" class="text-[10px] text-red-500 font-bold ml-2 capitalize italic">
                    {{ fieldErrors.name }}
                  </span>
                </div>

                <div class="flex flex-col gap-1">
                  <input v-model="form.email" type="email" placeholder="Email Address" maxlength="100"
                    @blur="validateField('email')"
                    :class="[fieldErrors.email ? 'border-red-500' : 'border-transparent']"
                    class="w-full px-5 py-4 rounded-2xl bg-soft dark:bg-darkBg border outline-none text-sm transition-all" />
                  <span v-if="fieldErrors.email" class="text-[10px] text-red-500 font-bold ml-2 capitalize italic">
                    {{ fieldErrors.email }}
                  </span>
                </div>
              </div>

              <div class="flex flex-col gap-1">
                <input v-model="form.subject" type="text" placeholder="Subject"
                  :class="[fieldErrors.subject ? 'border-red-500' : 'border-transparent']"
                  class="w-full px-5 py-4 rounded-2xl bg-soft dark:bg-darkBg border outline-none text-sm transition-all" />
                <span v-if="fieldErrors.subject" class="text-[10px] text-red-500 font-bold ml-2 capitalize italic">{{
                  fieldErrors.subject }}</span>
              </div>

              <div class="flex flex-col gap-1">
                <textarea v-model="form.message" placeholder="Message" rows="4"
                  :class="[fieldErrors.message ? 'border-red-500' : 'border-transparent']"
                  class="w-full px-5 py-4 rounded-2xl bg-soft dark:bg-darkBg border outline-none text-sm transition-all resize-none"></textarea>
                <span v-if="fieldErrors.message" class="text-[10px] text-red-500 font-bold ml-2 capitalize italic">{{
                  fieldErrors.message }}</span>
              </div>
            </div>

            <button type="submit" :disabled="isSubmitting"
              class="group w-full flex items-center justify-between p-2 pl-6 rounded-xl bg-dark dark:bg-primary text-soft dark:text-dark transition-all duration-500 disabled:opacity-50">
              <span class="text-[10px] font-black uppercase tracking-[0.2em]">
                {{ isSubmitting ? 'Sending Message...' : 'Send Inquiry' }}
              </span>
              <div
                class="w-12 h-12 rounded-lg bg-primary dark:bg-dark text-dark dark:text-soft flex items-center justify-center group-hover:scale-95 transition-transform">
                <Icon :name="isSubmitting ? 'solar:refresh-linear' : 'heroicons:paper-airplane-20-solid'"
                  :class="{ 'animate-spin': isSubmitting }" class="w-5 h-5" />
              </div>
            </button>
            <!-- 
            <p v-if="submitted"
              class="text-[10px] text-center font-bold text-green-500 uppercase tracking-widest animate-pulse">
              Message sent successfully!
            </p> -->
          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import { toast } from 'vue-sonner';
import { z } from 'zod';

// --- Logic Form & Database ---
const supabase = useSupabaseClient();
const isSubmitting = ref(false);
const fieldErrors = ref<Record<string, string>>({});
const submitted = ref(false);

const contactSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name is too long')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters'),
  email: z.string()
    .email('Invalid email address')
    .min(5, 'Email is too short'),
  subject: z.string().min(5, 'Subject is too short').max(100),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactFormData = z.infer<typeof contactSchema>;

const form = ref<ContactFormData>({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const validateField = (field: keyof ContactFormData) => {
  // Kita gunakan safeParse untuk field spesifik saja
  const result = contactSchema.pick({ [field]: true } as any).safeParse({
    [field]: form.value[field]
  });

if (!result.success) {
    // Tambahkan pengecekan result.error agar TS tenang
    result.error.issues.forEach((issue) => {
      const path = issue.path[0] as string;
      fieldErrors.value[path] = issue.message;
    });
    return;
  }
};

watch(
  () => form.value,
  (newForm) => {
    Object.keys(newForm).forEach((key) => {
      if (newForm[key as keyof typeof form.value].trim() !== '') {
        delete fieldErrors.value[key];
      }
    });
  },
  { deep: true }
);

const handleSubmit = async () => {
  fieldErrors.value = {};
  const result = contactSchema.safeParse(form.value);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const path = issue.path[0] as string;
      if (!fieldErrors.value[path]) {
        fieldErrors.value[path] = issue.message;
      }
    });
    return;
  }

  isSubmitting.value = true;

  try {
    const { error } = await supabase
      .from('inquiries')
      .insert([
        {
          name: form.value.name,
          email: form.value.email,
          subject: form.value.subject,
          message: form.value.message,
          status: 'unread' // Set default agar muncul di stats dashboard
        }
      ]);

    if (error) throw error;

    toast.success('Message sent successfully!');
    form.value = { name: '', email: '', subject: '', message: '' };
    submitted.value = true;
    setTimeout(() => submitted.value = false, 5000);

  } catch (e) {
    console.error('Error sending message:', e);
    toast.error('Failed to send message. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(async () => {
  if (!import.meta.client) return;
  await nextTick();

  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('#contact .reveal-up, #contact .reveal-left, #contact .reveal-right');
  animatedElements.forEach((el) => observer.observe(el));
});
</script>

<style scoped>
.reveal-up,
.reveal-left,
.reveal-right {
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

  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.1) translate(-5%, 5%);
  }
}
</style>