<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm p-4">
        <div
          class="bg-white dark:bg-[#16191E] w-full max-w-md rounded-xl shadow-2xl overflow-hidden flex flex-col border border-transparent dark:border-white/5 animate-in fade-in zoom-in-95 duration-200">

          <div class="p-6 pb-4 flex justify-between items-center border-b border-slate-100 dark:border-white/5">
            <h3 class="text-xl font-black uppercase tracking-tighter text-slate-800 dark:text-white">
              {{ isEditMode ? 'Update Testimonial' : 'Add New Testimonial' }}
            </h3>
            <button @click="emit('close')"
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <Icon name="solar:close-circle-bold" class="w-7 h-7" />
            </button>
          </div>

          <form @submit.prevent="emit('submit')" novalidate class="p-6 space-y-5">
            <div class="space-y-2">
              <label
                class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                Client Name *
              </label>
              <input v-model="form.name" type="text" placeholder="Example: John Doe" :class="[
                'w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 transition duration-300 placeholder:text-slate-400/70',
                errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10 focus:ring-primary focus:border-primary'
              ]" />
              <span v-if="errors.name"
                class="block text-[11px] font-semibold text-red-500 pl-1 animate-in fade-in slide-in-from-top-1 duration-200">
                {{ errors.name }}
              </span>
            </div>

            <div class="space-y-2">
              <label
                class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                Position / Company *
              </label>
              <input v-model="form.position" type="text" placeholder="Example: CEO at TechCorp" :class="[
                'w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 transition duration-300 placeholder:text-slate-400/70',
                errors.position ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10 focus:ring-primary focus:border-primary'
              ]" />
              <span v-if="errors.position"
                class="block text-[11px] font-semibold text-red-500 pl-1 animate-in fade-in slide-in-from-top-1 duration-200">
                {{ errors.position }}
              </span>
            </div>

            <div class="space-y-2 track-select-container relative">
              <label
                class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                Marquee Track Row
              </label>

              <div @click="isTrackDropdownOpen = !isTrackDropdownOpen"
                class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 flex items-center justify-between cursor-pointer select-none transition duration-300 ring-primary/20"
                :class="{ 'ring-2 border-primary dark:border-primary': isTrackDropdownOpen }">
                <span :class="{ 'text-slate-400/70 normal-case font-medium': !form.row_placement }">
                  {{ currentTrackLabel }}
                </span>

                <Icon name="solar:alt-arrow-down-linear"
                  class="w-4 h-4 text-slate-400 transition-transform duration-300"
                  :class="{ 'rotate-180 text-primary': isTrackDropdownOpen }" />
              </div>

              <Transition enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0 -translate-y-2"
                enter-to-class="transform scale-100 opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="transform scale-100 opacity-100 translate-y-0"
                leave-to-class="transform scale-95 opacity-0 -translate-y-2">
                <div v-if="isTrackDropdownOpen"
                  class="absolute z-50 left-0 right-0 mt-1 bg-white dark:bg-[#16191E] border border-slate-100 dark:border-white/5 shadow-xl rounded-xl overflow-hidden p-1.5 backdrop-blur-md">
                  <div @click="form.row_placement = 1; isTrackDropdownOpen = false"
                    class="flex items-center justify-between px-3 py-2.5 text-xs rounded-lg cursor-pointer transition duration-200 select-none normal-case font-medium"
                    :class="form.row_placement === 1
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'">
                    <span>Track 1 (Top Row)</span>
                    <Icon v-if="form.row_placement === 1" name="solar:check-circle-bold" class="w-4 h-4 text-primary" />
                  </div>

                  <div @click="form.row_placement = 2; isTrackDropdownOpen = false"
                    class="flex items-center justify-between px-3 py-2.5 text-xs rounded-lg cursor-pointer transition duration-200 select-none normal-case font-medium"
                    :class="form.row_placement === 2
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'">
                    <span>Track 2 (Bottom Row)</span>
                    <Icon v-if="form.row_placement === 2" name="solar:check-circle-bold" class="w-4 h-4 text-primary" />
                  </div>
                </div>
              </Transition>
            </div>

            <div class="space-y-2">
              <label
                class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                Client Comment *
              </label>
              <textarea v-model="form.comment" rows="4" placeholder="Write the spectacular review here..." :class="[
                'w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 transition duration-300 placeholder:text-slate-400/70 resize-none font-medium text-left',
                errors.comment ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10 focus:ring-primary focus:border-primary'
              ]"></textarea>
              <span v-if="errors.comment"
                class="block text-[11px] font-semibold text-red-500 pl-1 animate-in fade-in slide-in-from-top-1 duration-200">
                {{ errors.comment }}
              </span>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-white/5">
              <BaseButton variant="outline" size="md" rounded="xl"
                class="text-[10px] tracking-wider text-slate-400 dark:text-slate-500" @click="emit('close')">
                Cancel
              </BaseButton>

              <BaseButton type="submit" variant="primary" size="md" rounded="xl" :loading="isSubmitting"
                class="text-[10px] tracking-wider shadow-md">
                {{ isEditMode ? 'Save Changes' : 'Add Testimonial' }}
              </BaseButton>
            </div>
          </form>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { TestimonialInsert } from '~~/types';

// Props & Emits
const props = defineProps<{
  isOpen: boolean
  isEditMode: boolean
  isSubmitting: boolean
  form: TestimonialInsert
  errors: Record<string, string>
}>()

const emit = defineEmits(['close', 'submit'])

// Logic Dropdown
const isTrackDropdownOpen = ref(false)

const closeTrackDropdown = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.track-select-container')) {
    isTrackDropdownOpen.value = false
  }
}

onMounted(() => window.addEventListener('click', closeTrackDropdown))
onUnmounted(() => window.removeEventListener('click', closeTrackDropdown))

const currentTrackLabel = computed(() => {
  if (props.form.row_placement === 1) return 'Track 1 (Top Row)'
  if (props.form.row_placement === 2) return 'Track 2 (Bottom Row)'
  return 'Choose Track Placement'
})
</script>

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