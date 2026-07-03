import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FBF8F3",
          100: "#F5EEE1",
          200: "#EAE0CB",
        },
        charcoal: {
          DEFAULT: "#22201C",
          light: "#3A362E",
        },
        heritage: {
          50: "#FAF6F0",
          100: "#F0E6D6",
          200: "#DFC9A3",
          300: "#C9A96E",
          400: "#B08D4F",
          500: "#8C6D3B",
          600: "#6E552E",
          700: "#544224",
          800: "#3A2E1A",
          900: "#241C10",
        },
        forest: {
          500: "#4A5D45",
          600: "#3A4A36",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-work-sans)", "Helvetica", "Arial", "sans-serif"],
      },
      maxWidth: {
        "8xl": "1440px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(34, 32, 28, 0.08)",
        elevated: "0 12px 40px rgba(34, 32, 28, 0.14)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease-out forwards",
        fadeIn: "fadeIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
