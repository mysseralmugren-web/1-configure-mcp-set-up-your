import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#101d35",
          dark: "#091326",
          light: "#1c2e4f",
          accent: "#223963",
          50: "#f0f4f9",
          100: "#d9e2ee",
          200: "#b9c9dc",
          300: "#8fa9c6",
          400: "#6084ac",
          500: "#3e6390",
          600: "#2d4b73",
          700: "#223963",
          800: "#101d35",
          900: "#091326",
          950: "#040913",
        },
        silver: {
          DEFAULT: "#b9c2cc",
          light: "#e2e6ea",
          dark: "#8d99a6",
          metallic: "#c8d1db",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f7f8fa",
          elevated: "#ffffff",
          dark: "#0e1829",
          "dark-card": "#152238",
        },
        brand: {
          gold: "#c5a467",
          bronze: "#a67c52",
        },
        text: {
          primary: "#172235",
          secondary: "#64748b",
          muted: "#94a3b8",
        },
        border: "#e2e8f0",
      },
      fontFamily: {
        arabic: ["Cairo", "Tajawal", "IBM Plex Sans Arabic", "sans-serif"],
        sans: ["Inter", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
