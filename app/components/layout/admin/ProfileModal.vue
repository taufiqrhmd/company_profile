<template>
  <div v-if="modelValue" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="$emit('update:modelValue', false)"></div>

    <div
      class="relative bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
      <div class="p-8">
        <div class="flex justify-between items-center mb-8">
          <h3 class="text-xl font-black uppercase tracking-tighter text-slate-900">Account Settings</h3>
          <button @click="$emit('update:modelValue', false)"
            class="text-slate-400 hover:text-slate-900 transition-colors">
            <Icon name="solar:close-circle-bold" class="w-7 h-7" />
          </button>
        </div>

        <form @submit.prevent="handleUpdate" class="space-y-6">
          <div class="space-y-1">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
            <input v-model="form.full_name" type="text"
              class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-bold text-dark" />
          </div>

          <div class="space-y-1">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Role</label>
            <input :value="user?.role?.replace('_', ' ')" disabled type="text"
              class="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 text-sm font-bold uppercase" />
          </div>

          <div class="pt-4 border-t border-slate-100 space-y-4">
            <div class="space-y-1">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">New Password
                (Optional)</label>
              <div class="relative w-full">
                <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                  class="w-full px-4 pr-12 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-bold text-dark mb-0 leading-none" />
                <button type="button" @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors z-10 flex items-center justify-center h-5 w-5">
                  <Icon :name="showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <div v-if="form.password.length > 0" class="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Confirm New
                Password</label>
              <div class="relative w-full">
                <input v-model="form.confirm_password" :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full px-4 pr-12 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-bold text-dark mb-0 leading-none" />
                <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors z-10 flex items-center justify-center h-5 w-5">
                  <Icon :name="showConfirmPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <button type="submit" :disabled="loading"
            class="w-full py-4 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-dark transition-colors duration-300 shadow-lg shadow-slate-200 disabled:opacity-50">
            {{ loading ? 'Updating...' : 'Update Profile' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from 'vue'
import { toast } from 'vue-sonner'

const props = defineProps(['modelValue', 'user'])
const emit = defineEmits(['update:modelValue', 'submit'])

const loading = ref(false)

// State untuk visibility password
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Menggunakan reactive untuk struktur form yang lebih rapi
const form = reactive({
  full_name: '',
  password: '',
  confirm_password: ''
})

const syncFormData = () => {
  if (props.user) {
    form.full_name = props.user.full_name || ''
  }
}

watch(() => props.user, () => {
  syncFormData()
}, { deep: true, immediate: true })

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    syncFormData()
    form.password = ''
    form.confirm_password = ''
    showPassword.value = false // Reset toggle visibility saat modal dibuka kembali
    showConfirmPassword.value = false
  }
})

const handleUpdate = async () => {
  // 1. Validasi Nama Lengkap
  if (!form.full_name.trim()) {
    toast.error('Full name cannot be empty.')
    return
  }

  // 2. Validasi Kompleksitas Password & Konfirmasi (Jika Password diisi)
  if (form.password.length > 0) {
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters long.')
      return
    }

    if (form.password !== form.confirm_password) {
      toast.error('Password confirmation does not match.')
      return
    }
  }

  loading.value = true

  try {
    const payload: any = {
      full_name: form.full_name
    }

    if (form.password.trim()) {
      payload.password = form.password
    }

    emit('submit', payload)

    // Clear state password setelah submit sukses
    form.password = ''
    form.confirm_password = ''
  } catch (error) {
    console.error('Failed to update profile:', error)
  } finally {
    loading.value = false
  }
}
</script>