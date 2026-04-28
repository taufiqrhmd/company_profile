<template>
  <div class="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 font-sans">
    <Toaster position="top-center" richColors :toastOptions="{
      style: { borderRadius: '1rem' },
      class: 'shadow-lg border-0',
    }" />

    <div class="w-full max-w-md space-y-6">
      <div class="text-center space-y-2">
        <h1 class="text-3xl font-black uppercase tracking-tight text-slate-900">
          Admin Login
        </h1>
        <p class="text-sm text-slate-500">Silakan masukkan akun Anda untuk masuk ke dashboard</p>
      </div>

      <div class="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-slate-600 ml-1">
              Username
            </label>
            <input v-model="form.username" type="text"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
              placeholder="Masukkan username" />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-slate-600 ml-1">
              Password
            </label>
            <input v-model="form.password" type="password"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
              placeholder="••••••••" />
          </div>

          <button type="submit" :disabled="isLoading"
            class="w-full p-4 bg-primary text-white rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-all flex justify-center items-center gap-2 shadow-md mt-2">
            <span v-if="isLoading" class="animate-spin">◌</span>
            {{ isLoading ? 'Sedang memproses...' : 'Masuk ke Dashboard' }}
          </button>
        </form>
      </div>

      <p class="text-center text-xs text-slate-400">
        &copy; 2026 Digital Excellent Studio. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Toaster, toast } from 'vue-sonner'
import 'vue-sonner/style.css'

definePageMeta({
  layout: false,
  middleware: ['auth']
})

const isLoading = ref<boolean>(false)
const authToken = useCookie<string | null>('auth_token', {
  maxAge: 60 * 60 * 24, // 1 hari
  path: '/'
})

// Ambil state global agar bisa langsung diisi
const adminUser = useState<any>('adminUser')

const form = reactive({
  username: '',
  password: ''
})

const handleLogin = async (): Promise<void> => {
  // 1. Validasi Input Dasar
  if (!form.username || !form.password) {
    toast.warning('Peringatan', { description: 'Harap isi semua field.' })
    return
  }
  isLoading.value = true

  try {
    // 2. Memanggil API Server Internal (/server/api/auth/login.post.ts)
    // $fetch secara otomatis mengenali method POST berdasarkan nama file atau opsi
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: form.username,
        password: form.password
      }
    })

    // 3. Jika Berhasil
    if (response.success) {
      // Simpan cookie token yang dikirim dari server
      authToken.value = response.token

      // Simpan data user ke global state (tanpa password)
      adminUser.value = response.user

      toast.success('Berhasil Masuk', {
        description: `Selamat datang kembali, ${response.user.full_name}!`
      })

      // Redirect ke dashboard
      setTimeout(() => {
        navigateTo('/admin', { replace: true })
      }, 800)
    }

  } catch (err: any) {
    // 4. Menangani Error dari Server
    // Nuxt $fetch melempar error yang berisi data dari 'createError' di server
    const errorMessage = err.data?.statusMessage || 'Username atau Password salah.'
    
    toast.error('Gagal Login', { 
      description: errorMessage 
    })
  } finally {
    isLoading.value = false
  }
}
</script>