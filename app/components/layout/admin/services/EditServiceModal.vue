<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 dark:bg-black/90 backdrop-blur-md" @click="$emit('close')"></div>

        <div class="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl max-w-lg w-full shadow-2xl">
          <div class="flex justify-between items-center mb-8">
            <h3 class="text-slate-900 dark:text-white font-black uppercase italic text-2xl tracking-tighter">
              Update <span class="text-primary">Service</span>
            </h3>
            <button @click="$emit('close')" class="text-black dark:text-white hover:text-slate-400">
              <Icon name="solar:close-circle-linear" class="w-6 h-6" />
            </button>
          </div>

          <div class="space-y-6">
            <!-- Title -->
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Service Title</label>
              <input v-model="localForm.title" class="w-full bg-slate-50 dark:bg-[#16191E] border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all">
            </div>

            <!-- Icon Selection -->
            <div class="space-y-3">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Select Icon</label>
              <div class="grid grid-cols-5 gap-2 mt-2 max-h-40 overflow-y-auto p-1 custom-scrollbar">
                <button v-for="iconName in availableIcons" :key="iconName" @click="localForm.icon = iconName"
                  type="button" :class="['p-3 rounded-xl flex items-center justify-center transition-all border', 
                  localForm.icon === iconName ? 'bg-primary/10 border-primary text-primary' : 'bg-slate-50 dark:bg-[#16191E] border-slate-100 dark:border-slate-800 text-slate-400 hover:border-primary/50']">
                  <Icon :name="iconName" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Description with Custom Scroll -->
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Description</label>
              <textarea v-model="localForm.description" rows="4"
                class="w-full bg-slate-50 dark:bg-[#16191E] border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm text-slate-600 dark:text-slate-400 focus:ring-2 focus:ring-primary/50 outline-none resize-none transition-all custom-scrollbar"></textarea>
            </div>
          </div>

          <div class="flex gap-4 mt-10">
            <BaseButton variant="outline" size="md" rounded="xl" class="flex-1" @click="$emit('close')">Cancel</BaseButton>
            <BaseButton variant="primary" size="md" rounded="xl" class="flex-[3]" :loading="isUpdating" @click="$emit('update', localForm)">Save Changes</BaseButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{ isOpen: boolean; modelValue: any; availableIcons: string[]; isUpdating: boolean }>()
const emit = defineEmits(['update:modelValue', 'close', 'update'])

const localForm = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>