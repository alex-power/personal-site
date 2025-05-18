/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "sans-serif"],
        heading: ["Inter", "sans-serif"],
      },
      colors: {
        midnight: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        coral: {
          50: "#fff1f1",
          100: "#ffe1e1",
          200: "#ffc9c9",
          300: "#ffa2a2",
          400: "#ff7070",
          500: "#f87171",
          600: "#e74c4c",
          700: "#c53030",
          800: "#9b2c2c",
          900: "#7f2a2a",
          950: "#450f0f",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
      },
      spacing: {
        "8-4": "2rem", // 32px - larger section spacing
        "8-3": "1.5rem", // 24px - medium section spacing
        "8-2": "1rem", // 16px - standard spacing
        "8-1": "0.5rem", // 8px - tight spacing
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideUp: "slideUp 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};