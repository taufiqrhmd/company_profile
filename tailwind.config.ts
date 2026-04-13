// tailwind.config.ts
import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#D4AF37", // Gold
        accent: "#FFD700", // Bright Gold
        dark: "#1C1C1C", // Charcoal
        soft: "#FAF9F6", // Off-White
        darkBg: "#121212", // Deep Dark
        darkCard: "#1E1E1E", // Elevated Dark
      },
    },
  },
};
