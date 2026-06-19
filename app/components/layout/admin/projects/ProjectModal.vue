<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="isOpen"
                class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm p-4">
                <div
                    class="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-transparent dark:border-slate-800">

                    <div
                        class="p-8 pb-4 flex justify-between items-center border-b border-slate-50 dark:border-slate-800">
                        <h3 class="text-2xl font-black uppercase tracking-tighter dark:text-white">
                            {{ isEditMode ? 'Edit Project' : 'Create Project' }}
                        </h3>
                        <button @click="$emit('close')"
                            class="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                            <Icon name="solar:close-circle-bold" class="w-8 h-8" />
                        </button>
                    </div>

                    <form @submit.prevent="$emit('submit')" class="flex-1 flex flex-col overflow-hidden">
                        <div class="p-10 pt-4 overflow-y-auto flex-1 custom-scrollbar space-y-6">
                            <div class="grid grid-cols-2 gap-6">

                                <div class="space-y-2 col-span-2">
                                    <label class="label-style">Project Title</label>
                                    <input :value="form.title"
                                        @input="updateField('title', ($event.target as HTMLInputElement).value)"
                                        type="text" class="form-input" placeholder="Lumina Retail"
                                        :class="{ 'border-red-500 dark:border-red-500/50 focus:ring-red-500/5': errors.title }">
                                    <p v-if="errors.title" class="text-xs text-red-500 font-medium pl-1">{{ errors.title
                                        }}</p>
                                </div>

                                <div class="space-y-2 col-span-2 sm:col-span-1">
                                    <label class="label-style">Category</label>
                                    <input :value="form.category"
                                        @input="updateField('category', ($event.target as HTMLInputElement).value)"
                                        type="text" class="form-input" placeholder="E-commerce"
                                        :class="{ 'border-red-500 dark:border-red-500/50 focus:ring-red-500/5': errors.category }">
                                    <p v-if="errors.category" class="text-xs text-red-500 font-medium pl-1">{{
                                        errors.category }}</p>
                                </div>

                                <div class="space-y-4 col-span-2">
                                    <label class="label-style">Icon Selection</label>
                                    <div class="grid grid-cols-4 sm:grid-cols-8 gap-3">
                                        <button v-for="icon in iconPresets" :key="icon.value" type="button"
                                            @click="updateField('icon', icon.value)"
                                            :class="['icon-btn', form.icon === icon.value ? 'active' : '']">
                                            <Icon :name="icon.value" class="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div class="space-y-2 col-span-2">
                                    <label class="label-style">Project Thumbnail</label>
                                    <div class="flex items-center gap-6 p-6 border-2 border-dashed rounded-[2rem] bg-slate-50/50 dark:bg-[#16191E]/50"
                                        :class="errors.image ? 'border-red-500/60 dark:border-red-500/40' : 'border-slate-200 dark:border-white/10'">
                                        <div
                                            class="w-32 h-20 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shrink-0">
                                            <img v-if="imagePreview || form.image" :src="imagePreview || form.image"
                                                class="w-full h-full object-cover" />
                                            <div v-else
                                                class="w-full h-full flex items-center justify-center text-slate-400">
                                                <Icon name="solar:gallery-bold" class="w-8 h-8" />
                                            </div>
                                        </div>
                                        <div class="flex-1 space-y-2">
                                            <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                                Format: JPG, PNG, WEBP</p>
                                            <input ref="fileInput" type="file" @change="onFileChange" accept="image/*"
                                                class="hidden" />
                                            <button @click="fileInput?.click()" type="button"
                                                class="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-[10px] font-black uppercase dark:text-white">
                                                Choose Image
                                            </button>
                                        </div>
                                    </div>
                                    <p v-if="errors.image" class="text-xs text-red-500 font-medium pl-1">{{ errors.image
                                        }}</p>
                                </div>

                                <div class="space-y-2">
                                    <label class="label-style">Impact Metric</label>
                                    <input :value="form.impact"
                                        @input="updateField('impact', ($event.target as HTMLInputElement).value)"
                                        type="text" class="form-input" placeholder="+140%"
                                        :class="{ 'border-red-500 dark:border-red-500/50 focus:ring-red-500/5': errors.impact }">
                                    <p v-if="errors.impact" class="text-xs text-red-500 font-medium pl-1">{{
                                        errors.impact }}</p>
                                </div>

                                <div class="space-y-2">
                                    <label class="label-style">Impact Label</label>
                                    <input :value="form.impact_label"
                                        @input="updateField('impact_label', ($event.target as HTMLInputElement).value)"
                                        type="text" class="form-input" placeholder="Growth"
                                        :class="{ 'border-red-500 dark:border-red-500/50 focus:ring-red-500/5': errors.impact_label }">
                                    <p v-if="errors.impact_label" class="text-xs text-red-500 font-medium pl-1">{{
                                        errors.impact_label }}</p>
                                </div>

                                <div class="space-y-2 col-span-2">
                                    <label class="label-style">Description</label>
                                    <textarea :value="form.description"
                                        @input="updateField('description', ($event.target as HTMLTextAreaElement).value)"
                                        rows="3" class="form-input py-4" placeholder="Enter project description..."
                                        :class="{ 'border-red-500 dark:border-red-500/50 focus:ring-red-500/5': errors.description }"></textarea>
                                    <p v-if="errors.description" class="text-xs text-red-500 font-medium pl-1">{{
                                        errors.description }}</p>
                                </div>

                                <div class="space-y-2 col-span-2">
                                    <label class="label-style">Full Story - Part 1 (Challenge/Context)</label>
                                    <textarea :value="form.full_story_1"
                                        @input="updateField('full_story_1', ($event.target as HTMLTextAreaElement).value)"
                                        rows="4" class="form-input py-4 custom-scrollbar"
                                        placeholder="Tell about the background or main challenges of this project..."
                                        :class="{ 'border-red-500 dark:border-red-500/50 focus:ring-red-500/5': errors.full_story_1 }"></textarea>
                                    <p v-if="errors.full_story_1" class="text-xs text-red-500 font-medium pl-1">{{
                                        errors.full_story_1 }}</p>
                                </div>

                                <div class="space-y-2 col-span-2">
                                    <label class="label-style">Full Story - Part 2 (Solution/Result)</label>
                                    <textarea :value="form.full_story_2"
                                        @input="updateField('full_story_2', ($event.target as HTMLTextAreaElement).value)"
                                        rows="4" class="form-input py-4 custom-scrollbar"
                                        placeholder="Tell about the solution provided and the final results achieved..."
                                        :class="{ 'border-red-500 dark:border-red-500/50 focus:ring-red-500/5': errors.full_story_2 }"></textarea>
                                    <p v-if="errors.full_story_2" class="text-xs text-red-500 font-medium pl-1">{{
                                        errors.full_story_2 }}</p>
                                </div>

                                <div class="space-y-2 col-span-2">
                                    <label class="label-style">Tech Stack</label>
                                    <input :value="techStack"
                                        @input="$emit('update:techStack', ($event.target as HTMLInputElement).value)"
                                        type="text" class="form-input"
                                        placeholder="Contoh: Nuxt 3, Tailwind CSS, Laravel"
                                        :class="{ 'border-red-500 dark:border-red-500/50 focus:ring-red-500/5': errors.tech_stack }">
                                    <p v-if="errors.tech_stack" class="text-xs text-red-500 font-medium pl-1">{{
                                        errors.tech_stack }}</p>
                                </div>
                            </div>
                        </div>

                        <div
                            class="p-8 pt-4 flex gap-4 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800">
                            <BaseButton type="button" variant="outline" size="md" rounded="xl" class="flex-1"
                                @click="$emit('close')">
                                Cancel
                            </BaseButton>
                            <BaseButton type="submit" variant="primary" size="md" rounded="xl" class="flex-1"
                                :loading="isSubmitting">
                                {{ isEditMode ? 'Update Changes' : 'Publish Project' }}
                            </BaseButton>
                        </div>
                    </form>

                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
    isOpen: boolean
    isEditMode: boolean
    isSubmitting: boolean
    form: any
    errors: any
    imagePreview: string | null
    techStack: string
    iconPresets: Array<{ name: string, value: string }>
}>()

const emit = defineEmits(['close', 'submit', 'update:formField', 'update:techStack', 'file-change', 'clear-error'])

const fileInput = ref<HTMLInputElement | null>(null)

const updateField = (field: string, value: any) => {
    emit('update:formField', { field, value })
    emit('clear-error', field)
}

const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.files && target.files[0]) {
        emit('file-change', target.files[0])
    }
}
</script>

<style lang="postcss" scoped>
.label-style {
    @apply text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500;
}

.form-input {
    @apply w-full bg-slate-50 dark:bg-[#16191E]/50 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium dark:text-white dark:placeholder:text-slate-600;
}

.icon-btn {
    @apply p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#16191E] text-slate-400 transition-all hover:scale-110 hover:border-primary/50;
}

.icon-btn.active {
    @apply bg-primary border-primary text-white shadow-lg shadow-primary/20;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    @apply bg-slate-200 dark:bg-slate-700 rounded-full;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>