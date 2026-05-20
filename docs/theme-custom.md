🎨 Theming & Custom Colors
Aplikasi ini menggunakan skema warna kustom premium berbasis aksen Gold & Charcoal. Anda dapat memodifikasi penjenamaan warna ini secara global langsung melalui berkas tailwind.config.ts:

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