# 🚀 Nuxt 3 Open Source Console Project

Proyek Landing Page Company Profile dengan Admin Panel open-source ini dibangun menggunakan **Nuxt 3** dengan arsitektur modern yang mengintegrasikan ekosistem Supabase untuk database, Tailwind CSS untuk visual, serta Pinia untuk manajemen state aplikasi.

---

## 🛠️ Tech Stack & Modules

Berdasarkan berkas konfigurasi utama `nuxt.config.ts`, proyek ini didukung oleh:
*   **⚡ Nuxt 3** – Framework SSR Vue.js dengan performa tinggi.
*   **🟢 Supabase** (`@nuxtjs/supabase`) – Otentikasi, PostgreSQL database, dan realtime sync.
*   **🎨 Tailwind CSS** (`@nuxtjs/color-mode`) – Utilitas penataan UI dengan sistem toggle Dark/Light mode bawaan (`classSuffix: ''`).
*   **🍍 Pinia** (`@pinia/nuxt`) – State management modular reaktif.
*   **✨ Nuxt Icon** (`@nuxt/icon`) – Integrasi berbagai penyedia set ikon web populer.
*   **📈 GSAP & Chart.js** – Pustaka animasi interaktif dan visualisasi diagram yang dioptimalkan dalam Vite.

---

## 🛤️ Alur Instalasi & Konfigurasi Proyek (Getting Started)

Panduan ini akan membantu Anda memahami alur proyek dari awal pengaturan hingga aplikasi dapat berjalan secara lokal.

### 1. Kloning Repositori & Instalasi Dependensi
Langkah pertama adalah mengunduh kode sumber dan menginstal semua paket yang dibutuhkan.
```bash
git clone https://github.com/username/repository-name.git
cd repository-name
npm install
```

### 2. Konfigurasi Database (Supabase)
Proyek ini sangat bergantung pada Supabase untuk manajemen basis data. Anda harus menyiapkan tabel dan kebijakan keamanan (RLS) di dashboard Supabase Anda.
*   Buka proyek Supabase Anda dan masuk ke menu **SQL Editor**.
*   Buka berkas [`docs/database-setup.md`](./docs/database-setup.md) di proyek ini.
*   Salin seluruh skrip SQL yang ada di dalamnya dan jalankan di SQL Editor Supabase.
*   Skrip ini akan secara otomatis membuat tabel-tabel penting (`admin_accounts`, `inquiries`, `projects`, `services`, dll.) beserta relasi dan fungsi internal (RPC) database.

### 3. Pengaturan Environment Variables (.env)
Setelah database siap, sambungkan aplikasi dengan Supabase melalui *environment variables*.
Buat berkas `.env` di direktori utama (*root*) proyek dan isi dengan kredensial Supabase Anda:
```env
# 🟢 SUPABASE CONFIGURATION
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_public_key

# 🔐 SERVER-SIDE ONLY CONFIGURATION (PRIVATE)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_custom_jwt_secret_key_minimum_32_characters
```

### 4. Konfigurasi Tema & Warna UI
Aplikasi ini menggunakan skema warna premium (Gold & Charcoal) yang bisa dikustomisasi sesuai jenama (brand) perusahaan Anda.
*   Buka berkas `tailwind.config.ts`.
*   Ubah variabel warna pada bagian `theme.extend.colors` seperti `primary`, `accent`, `dark`, dll.
*   Untuk panduan lebih mendetail mengenai elemen warna yang terdampak, silakan merujuk pada [`docs/theme-custom.md`](./docs/theme-custom.md).

### 5. Menjalankan Server Pengembangan Lokal
Setelah semua konfigurasi di atas selesai, Anda dapat mulai menjalankan aplikasi:
```bash
npm run dev
```
Aplikasi dapat diakses melalui browser di `http://localhost:3000`.

---

## 👥 Sistem Manajemen Peran (Admin Roles)

Aplikasi ini dilengkapi dengan sistem otentikasi dan otorisasi berbasis peran (*Role-Based Access Control*) pada Admin Panel. Terdapat **2 peran utama**:

*   **👑 Superadmin**: Memiliki kendali penuh atas sistem, termasuk mengakses **Admin Dashboard** untuk melihat statistik dan mengelola semua **pesan masuk**.
*   **✍️ Editor / Creator**: Fokus pada pengelolaan konten publik. Memiliki hak akses penuh untuk melakukan operasi **CRUD** pada **Proyek (*Projects*)** dan **Layanan (*Services*)**.

---

## 🔒 Kebijakan Keamanan (Row Level Security - RLS)

Keamanan aplikasi divalidasi langsung dari level database menggunakan **Supabase RLS**. Tabel di bawah ini merangkum aturan hak akses yang diterapkan saat Anda menjalankan skrip SQL di Langkah 2:

| Nama Tabel | Operasi | Target Peran (*Target Roles*) | Nama & Logika Kebijakan (*Policies*) |
| :--- | :--- | :--- | :--- |
| `admin_accounts` | 🔄 `UPDATE` | `public` | Akun admin hanya diizinkan mengubah datanya sendiri jika `username` cocok dengan token JWT. |
| `inquiries` | ✨ `INSERT` | `anon` | **Public Insert Only:** Pengunjung publik dapat mengirimkan formulir kontak. |
| `inquiries` | 🔥 `ALL` | `authenticated` | **Admin Full Access:** Hak akses penuh untuk admin. |
| `projects` | 👁️ `SELECT` | `public` | **Allow Public Select:** Proyek portofolio dapat dibaca oleh publik. |
| `projects` | 🔥 `ALL` | `public` (Auth Check) | **Admin Full Access:** Memodifikasi proyek wajib menyertakan token admin aktif. |
| `project_details`| 👁️ `SELECT` | `public` | Publik dapat mengakses detail cerita proyek secara bebas. |
| `project_details`| 🔥 `ALL` | `public` (Auth Check) | Perubahan detail teks proyek terkunci untuk admin terotentikasi. |
| `services` | 👁️ `SELECT` | `public` | Daftar layanan dapat dilihat publik tanpa hambatan otentikasi. |
| `services` | 🔄 `UPDATE` | `authenticated` | Perubahan data layanan hanya bisa dieksekusi oleh admin dengan sesi login. |
| `Testimonials` | 👁️ `SELECT` | `public` | Membuka akses baca ulasan agar dapat ditampilkan di halaman depan. |
| `Testimonials` | 🔥 `ALL` | `authenticated` | Operasi modifikasi hanya diizinkan untuk admin dengan role 'creator' atau 'super_admin'.|

