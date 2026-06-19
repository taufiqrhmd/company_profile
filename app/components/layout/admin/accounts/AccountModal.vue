<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="modelValue"
                class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm p-4">
                <div
                    class="bg-white dark:bg-[#16191E] w-full max-w-md rounded-xl shadow-2xl overflow-hidden flex flex-col border border-transparent dark:border-white/5 animate-in fade-in zoom-in-95 duration-200">

                    <div
                        class="p-6 pb-4 flex justify-between items-center border-b border-slate-100 dark:border-white/5">
                        <h3 class="text-xl font-black uppercase tracking-tighter text-slate-800 dark:text-white">
                            {{ isEditMode ? 'Update Account Access' : 'Register New Account' }}
                        </h3>
                        <button @click="closeModal"
                            class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                            <Icon name="solar:close-circle-bold" class="w-7 h-7" />
                        </button>
                    </div>

                    <form @submit.prevent="handleFormSubmit" class="p-6 space-y-5">
                        <div class="space-y-2">
                            <label
                                class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">Full
                                Name</label>
                            <input v-model="localForm.full_name" type="text" placeholder="Example: Alex Chandra"
                                class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-300 placeholder:text-slate-400/70"
                                :class="{ 'border-red-500 dark:border-red-500/50 focus:ring-red-500 focus:border-red-500': errors.full_name }"
                                @input="clearError('full_name')" />
                            <p v-if="errors.full_name"
                                class="text-xs text-red-500 font-medium pl-1 animate-in fade-in duration-200">
                                {{ errors.full_name }}
                            </p>
                        </div>

                        <div class="space-y-2">
                            <label
                                class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">Username
                                (For Login)</label>
                            <input v-model="localForm.username" type="text" placeholder="Example: alexchandra"
                                class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-300 font-mono placeholder:text-slate-400/70"
                                :class="{ 'border-red-500 dark:border-red-500/50 focus:ring-red-500 focus:border-red-500': errors.username }"
                                @input="clearError('username')" />
                            <p v-if="errors.username"
                                class="text-xs text-red-500 font-medium pl-1 animate-in fade-in duration-200">
                                {{ errors.username }}
                            </p>
                        </div>

                        <div class="space-y-2">
                            <label
                                class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                                {{ isEditMode ? 'Change Password (Leave blank if not changing)' : 'Temporary Password'
                                }}
                            </label>
                            <input v-model="localForm.password" type="password"
                                :placeholder="isEditMode ? 'Fill only if you want to reset the staff password' : 'At least 8 characters'"
                                class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition duration-300 placeholder:text-slate-400/70"
                                :class="{ 'border-red-500 dark:border-red-500/50 focus:ring-red-500 focus:border-red-500': errors.password }"
                                @input="clearError('password')" />
                            <p v-if="errors.password"
                                class="text-xs text-red-500 font-medium pl-1 animate-in fade-in duration-200">
                                {{ errors.password }}
                            </p>
                        </div>

                        <div class="space-y-2 custom-select-container relative">
                            <label
                                class="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                                Right System Access
                            </label>

                            <div @click="isDropdownOpen = !isDropdownOpen"
                                class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 flex items-center justify-between cursor-pointer select-none transition duration-300 ring-primary/20"
                                :class="{ 'ring-2 border-primary dark:border-primary': isDropdownOpen }">
                                <span :class="{ 'text-slate-400/70': !localForm.role }">
                                    {{ currentRoleLabel }}
                                </span>

                                <Icon name="solar:alt-arrow-down-linear"
                                    class="w-4 h-4 text-slate-400 transition-transform duration-300"
                                    :class="{ 'rotate-180 text-primary': isDropdownOpen }" />
                            </div>

                            <Transition enter-active-class="transition duration-200 ease-out"
                                enter-from-class="transform scale-95 opacity-0 -translate-y-2"
                                enter-to-class="transform scale-100 opacity-100 translate-y-0"
                                leave-active-class="transition duration-150 ease-in"
                                leave-from-class="transform scale-100 opacity-100 translate-y-0"
                                leave-to-class="transform scale-95 opacity-0 -translate-y-2">
                                <div v-if="isDropdownOpen"
                                    class="absolute z-50 left-0 right-0 mt-1 bg-white dark:bg-[#16191E] border border-slate-100 dark:border-white/5 shadow-xl rounded-xl overflow-hidden p-1.5 backdrop-blur-md">
                                    <div @click="localForm.role = 'editor'; isDropdownOpen = false"
                                        class="flex items-center justify-between px-3 py-2.5 text-sm rounded-lg cursor-pointer transition duration-200 select-none"
                                        :class="localForm.role === 'editor'
                                            ? 'bg-primary/10 text-primary font-semibold'
                                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'">
                                        <span>Editor / Creator (Landing Content Control)</span>
                                        <Icon v-if="localForm.role === 'editor'" name="solar:check-circle-bold"
                                            class="w-4 h-4 text-primary" />
                                    </div>

                                    <div @click="localForm.role = 'super_admin'; isDropdownOpen = false"
                                        class="flex items-center justify-between px-3 py-2.5 text-sm rounded-lg cursor-pointer transition duration-200 select-none"
                                        :class="localForm.role === 'super_admin'
                                            ? 'bg-primary/10 text-primary font-semibold'
                                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'">
                                        <span>Super Admin (Full Control & Accounts)</span>
                                        <Icon v-if="localForm.role === 'super_admin'" name="solar:check-circle-bold"
                                            class="w-4 h-4 text-primary" />
                                    </div>
                                </div>
                            </Transition>
                        </div>

                        <div
                            class="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-white/5">
                            <BaseButton type="button" variant="outline" size="md" rounded="xl"
                                class="text-[10px] tracking-wider text-slate-400 dark:text-slate-500"
                                @click="closeModal">
                                Cancel
                            </BaseButton>

                            <BaseButton type="submit" variant="primary" size="md" rounded="xl" :loading="isSubmitting"
                                class="text-[10px] tracking-wider shadow-md">
                                {{ isEditMode ? 'Save Changes' : 'Register Account' }}
                            </BaseButton>
                        </div>
                    </form>

                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
import { reactive, watch, ref, onMounted, onUnmounted } from 'vue'

const isDropdownOpen = ref(false)

const closeDropdown = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('.custom-select-container')) {
        isDropdownOpen.value = false
    }
}

onMounted(() => window.addEventListener('click', closeDropdown))
onUnmounted(() => window.removeEventListener('click', closeDropdown))

const currentRoleLabel = computed(() => {
    if (localForm.role === 'editor') return 'Editor / Creator (Landing Content Control)'
    if (localForm.role === 'super_admin') return 'Super Admin (Full Control & Accounts)'
    return 'Pilih Role'
})

const props = defineProps<{
    modelValue: boolean
    isEditMode: boolean
    isSubmitting: boolean
    formData: { full_name: string; username: string; role: string }
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'submit', formPayload: any): void
}>()

// Salin form data prop ke local reactive state agar aman di-edit secara dua arah
const localForm = reactive({
    full_name: '',
    username: '',
    password: '',
    role: 'editor'
})

const errors = reactive({
    full_name: '',
    username: '',
    password: ''
})

// Sinkronisasi data ketika modal dibuka/prop diubah oleh parent
watch(() => props.modelValue, (newVal) => {
    if (newVal) {
        localForm.full_name = props.formData.full_name
        localForm.username = props.formData.username
        localForm.role = props.formData.role
        localForm.password = ''
        clearAllErrors()
    }
})

const clearError = (field: keyof typeof errors) => { errors[field] = '' }
const clearAllErrors = () => {
    errors.full_name = ''
    errors.username = ''
    errors.password = ''
}

const validateForm = (): boolean => {
    clearAllErrors()
    let isValid = true

    if (!localForm.full_name.trim()) {
        errors.full_name = 'Full name is required.'
        isValid = false
    } else if (localForm.full_name.trim().length < 3) {
        errors.full_name = 'Full name must be at least 3 characters long.'
        isValid = false
    }

    const usernameRegex = /^[a-z0-9_.]+$/
    if (!localForm.username.trim()) {
        errors.username = 'Username is required.'
        isValid = false
    } else if (localForm.username.trim().length < 4) {
        errors.username = 'Username must be at least 4 characters long.'
        isValid = false
    } else if (!usernameRegex.test(localForm.username)) {
        errors.username = 'Username can only contain lowercase letters, numbers, underscores, or periods.'
        isValid = false
    }

    if (!props.isEditMode) {
        if (!localForm.password) {
            errors.password = 'Password is required for new registration.'
            isValid = false
        } else if (localForm.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long.'
            isValid = false
        }
    } else if (localForm.password && localForm.password.length < 8) {
        errors.password = 'If updated, password must be at least 8 characters long.'
        isValid = false
    }

    return isValid
}

const closeModal = () => {
    emit('update:modelValue', false)
}

const handleFormSubmit = () => {
    if (!validateForm()) return
    emit('submit', { ...localForm })
}
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