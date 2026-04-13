<template>
  <div class="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 font-sans">
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
            <input 
              v-model="form.username" 
              type="text"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
              placeholder="Masukkan username" 
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-slate-600 ml-1">
              Password
            </label>
            <input 
              v-model="form.password" 
              type="password"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-slate-400"
              placeholder="••••••••" 
            />
          </div>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full p-4 bg-primary text-white rounded-xl font-bold hover:brightness-105 disabled:opacity-50 transition-all flex justify-center items-center gap-2 shadow-md shadow-primary/20 mt-2"
          >
            <span v-if="isLoading" class="animate-spin text-lg">◌</span>
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

<script setup>
definePageMeta({
  layout: false,
  middleware: ['auth']
})

const form = reactive({ username: '', password: '' })
const isLoading = ref(false)
const authToken = useCookie('auth_token', {
  maxAge: 60 * 60 * 24,
  path: '/'
})

const handleLogin = async () => {
  if (!form.username || !form.password) {
    alert('Username dan Password wajib diisi.')
    return
  }

  isLoading.value = true
  
  // Simulasi login
  setTimeout(() => {
    const targetUser = 'admin'
    const targetPass = 'admin123'

    if (form.username === targetUser && form.password === targetPass) {
      authToken.value = 'secret-token-123'
      navigateTo('/admin', { replace: true })
    } else {
      alert('Username atau Password salah.')
    }

    isLoading.value = false
  }, 1000)
}
</script>