# 🚀 Nuxt 3 Open Source Console Project

Proyek Landing Page Company Profile dengan Admin Panel open-source ini dibangun menggunakan **Nuxt 3** dengan arsitektur modern yang mengintegrasikan ekosistem Supabase untuk database, Tailwind CSS untuk visual, serta Pinia untuk manajemen state aplikasi.

---

## 👥 Sistem Manajemen Peran (Admin Roles)

Aplikasi ini dilengkapi dengan sistem otentikasi dan otorisasi berbasis peran (*Role-Based Access Control*) pada Admin Panel untuk menjaga keamanan data. Terdapat **2 peran utama** dengan hak akses yang berbeda:

*   **👑 Superadmin**  
    Memiliki kendali penuh atas sistem. Peran ini dapat mengakses halaman **Admin Dashboard** utama untuk memantau performa, melihat statistik data, serta membaca dan mengelola seluruh **pesan masuk (*inquiries/messages*)** dari pengguna.
*   **✍️ Editor**  
    Fokus pada pengelolaan konten publik. Peran ini memiliki hak akses penuh untuk melakukan operasi **CRUD (Create, Read, Update, Delete)** pada manajemen data **Proyek (*Projects*)** dan **Layanan (*Services*)** perusahaan.

---

## 🔒 Kebijakan Keamanan (Row Level Security - RLS)

Proyek ini menerapkan **Supabase RLS** secara ketat di tingkat database untuk memastikan integritas data dan mencegah manipulasi ilegal dari luar sistem. Berikut adalah spesifikasi aturan hak akses yang dikonfigurasi pada database:

| Nama Tabel | Operasi | Target Peran (*Target Roles*) | Nama & Logika Kebijakan (*Policies*) |
| :--- | :--- | :--- | :--- |
| `admin_accounts` | 🔄 `UPDATE` | `public` | **Admins can update their own data:** Akun admin hanya diizinkan mengubah datanya sendiri jika nilai kolom `username` cocok dengan klaim data terenkripsi di dalam token JWT (`request.jwt.claims`). |
| `inquiries` | ✨ `INSERT` | `anon` | **Public Insert Only:** Mengizinkan pengunjung publik (non-login) untuk mengirimkan formulir kontak dari Landing Page (`WITH CHECK (true)`). |
| `inquiries` | 🔥 `ALL` | `authenticated` | **Admin Full Access:** Memberikan hak akses penuh (baca/tambah/ubah/hapus) kepada pengguna dengan sesi otentikasi admin yang valid. |
| `projects` | 👁️ `SELECT` | `public` | **Allow Public Select:** Konten proyek portofolio dibuka secara transparan agar bisa dibaca oleh seluruh pengunjung website. |
| `projects` | 🔥 `ALL` | `public` (Auth Check) | **Admin Full Access:** Operasi modifikasi data portofolio wajib menyertakan token admin aktif (`auth.role() = 'authenticated'`). |
| `project_details`| 👁️ `SELECT` | `public` | **Allow Public Select Details:** Cerita lengkap, latar belakang, dan daftar teknologi proyek dapat diakses bebas oleh publik. |
| `project_details`| 🔥 `ALL` | `public` (Auth Check) | **Admin Full Access Details:** Perubahan atau penghapusan teks detail cerita proyek dikunci rapat untuk admin terotentikasi. |
| `services` | 👁️ `SELECT` | `public` | **Public Read Access:** Daftar layanan komersial perusahaan dapat dilihat oleh publik tanpa hambatan otentikasi (`USING (true)`). |
| `services` | 🔄 `UPDATE` | `authenticated` | **Authenticated Update Access:** Perubahan isi data komponen layanan hanya bisa dieksekusi oleh admin/editor yang memiliki sesi login aktif. |

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

## 🗂️ Dokumentasi Spesifik

Untuk mempermudah pengembangan, rincian teknis proyek ini telah dibagi menjadi beberapa bagian:

*   **🗄️ [Inisialisasi Database Supabase](./docs/database-setup.md)** – Skrip SQL lengkap untuk tabel, relasi, dan fungsi internal database.
*   **🎨 [Kustomisasi Tema & Warna](./docs/theme-custom.md)** – Panduan mengubah palet warna bawaan aplikasi melalui Tailwind.

---

## 🚀 Langkah Instalasi Lokal

1. **Klon Repositori:**
   ```bash
   git clone [https://github.com/username/repository-name.git](https://github.com/username/repository-name.git)
   cd repository-name

2. **Install Dependensi**
   ```bash
   npm install

3. **Konfigurasi Environment (.env)**
   Buat berkas .env di root direktori dan lengkapi variabel berikut:
   # 🟢 SUPABASE CONFIGURATION
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_public_key
   
   # 🔐 SERVER-SIDE ONLY CONFIGURATION (PRIVATE)
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   JWT_SECRET=your_custom_jwt_secret_key_minimum_32_characters

