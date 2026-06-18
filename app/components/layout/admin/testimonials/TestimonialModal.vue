<script setup lang="ts">
interface TestimonialDB {
  id?: number;
  name: string;
  position: string;
  comment: string;
  avatar: string | null;
  row_placement: number | null;
}

interface FormErrors {
  name: string;
  position: string;
  avatar: string;
  comment: string;
}

defineProps<{
  isOpen: boolean
  isEditMode: boolean
  isSubmitting: boolean
  form: TestimonialDB
  errors: FormErrors
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm p-4">
        <div class="bg-white dark:bg-[#16191E] w-full max-w-md rounded-xl shadow-2xl overflow-hidden flex flex-col border border-transparent dark:border-white/5 animate-in fade-in zoom-in-95 duration-200">

          <div class="p-6 pb-4 flex justify-between items-center border-b border-slate-100 dark:border-white/5">
            <h3 class="text-xl font-black uppercase tracking-tighter text-slate-800 dark:text-white">
              {{ isEditMode ? 'Update Testimonial' : 'Add New Testimonial' }}
            </h3>
            <button @click="emit('close')" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <Icon name="solar:close-circle-bold" class="w-7 h-7" />
            </button>
          </div>

          <form @submit.prevent="emit('submit')" novalidate class="p-6 space-y-5">
            <div class="space-y-2">
              <label class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                Client Name *
              </label>
              <input v-model="form.name" type="text" placeholder="Example: John Doe"
                :class="[
                  'w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 transition duration-300 placeholder:text-slate-400/70',
                  errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10 focus:ring-primary focus:border-primary'
                ]" />
              <span v-if="errors.name" class="block text-[11px] font-semibold text-red-500 pl-1 animate-in fade-in slide-in-from-top-1 duration-200">
                {{ errors.name }}
              </span>
            </div>

            <div class="space-y-2">
              <label class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                Position / Company *
              </label>
              <input v-model="form.position" type="text" placeholder="Example: CEO at TechCorp"
                :class="[
                  'w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 transition duration-300 placeholder:text-slate-400/70',
                  errors.position ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10 focus:ring-primary focus:border-primary'
                ]" />
              <span v-if="errors.position" class="block text-[11px] font-semibold text-red-500 pl-1 animate-in fade-in slide-in-from-top-1 duration-200">
                {{ errors.position }}
              </span>
            </div>

            <div class="space-y-2">
              <label class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                Avatar Image URL (Optional)
              </label>
              <input v-model="form.avatar" type="url" placeholder="https://images.unsplash.com/..."
                :class="[
                  'w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 transition duration-300 placeholder:text-slate-400/70',
                  errors.avatar ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10 focus:ring-primary focus:border-primary'
                ]" />
              <span v-if="errors.avatar" class="block text-[11px] font-semibold text-red-500 pl-1 animate-in fade-in slide-in-from-top-1 duration-200">
                {{ errors.avatar }}
              </span>
            </div>

            <div class="space-y-2">
              <label class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                Marquee Track Row
              </label>
              <div class="relative">
                <select v-model="form.row_placement"
                  class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-300 appearance-none cursor-pointer font-bold uppercase tracking-wider text-[11px]">
                  <option :value="1">Track 1 (Top Row)</option>
                  <option :value="2">Track 2 (Bottom Row)</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <Icon name="solar:alt-arrow-down-linear" class="w-4 h-4" />
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                Client Comment *
              </label>
              <textarea v-model="form.comment" rows="4" placeholder="Write the spectacular review here..."
                :class="[
                  'w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 transition duration-300 placeholder:text-slate-400/70 resize-none font-medium text-left',
                  errors.comment ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10 focus:ring-primary focus:border-primary'
                ]"></textarea>
              <span v-if="errors.comment" class="block text-[11px] font-semibold text-red-500 pl-1 animate-in fade-in slide-in-from-top-1 duration-200">
                {{ errors.comment }}
              </span>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-white/5">
              <BaseButton variant="outline" size="md" rounded="xl" class="text-[10px] tracking-wider text-slate-400 dark:text-slate-500" @click="emit('close')">
                Cancel
              </BaseButton>

              <BaseButton type="submit" variant="primary" size="md" rounded="xl" :loading="isSubmitting" class="text-[10px] tracking-wider shadow-md">
                {{ isEditMode ? 'Save Changes' : 'Add Testimonial' }}
              </BaseButton>
            </div>
          </form>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>