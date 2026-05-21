# 🎨 Theming & Custom Colors

Aplikasi ini menggunakan skema warna kustom premium berbasis aksen **Gold** & **Charcoal**. Penjenamaan warna ini dikonfigurasi secara global untuk mendukung konsistensi tampilan baik pada *Light Mode* maupun *Dark Mode*.

---

## 📊 Palet Warna Utama

| Kegunaan | Nama Variabel | Kode Warna |
| :--- | :--- | :--- | :--- |
| **Aksen Utama** | `primary` | `#D4AF37` | 
| **Hover / Sorotan** | `accent` | `#FFD700` | 
| **Teks / Elemen Gelap** | `dark` | `#1C1C1C` | 
| **Latar Belakang Terang** | `soft` | `#FAF9F6` | 
| **Latar Belakang Dark** | `darkBg` | `#121212` | 
| **Card / Komponen Dark** | `darkCard` | `#1E1E1E` | 

---

## ⚙️ Konfigurasi Global

Anda dapat memodifikasi atau memperluas (*extend*) penjenamaan warna ini secara global langsung melalui berkas `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#D4AF37",    // Warna Aksen Utama (Gold)
        accent: "#FFD700",     // Warna Hover / Sorotan (Bright Gold)
        dark: "#1C1C1C",       // Teks / Elemen Gelap Utama (Charcoal)
        soft: "#FAF9F6",       // Latar Belakang Terang (Off-White)
        darkBg: "#121212",     // Latar Belakang Utama Dark Mode (Deep Dark)
        darkCard: "#1E1E1E",   // Komponen / Card Latar Belakang di Dark Mode
      },
    },
  },
};