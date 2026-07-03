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
        // Heritage Gold — primary brand color, sampled directly from the
        // official Heritage Heaven crest logo (gold on black, no green).
        // Used for buttons, links, active states, ratings, card headings.
        // 600/700 are the darker hover/pressed shades.
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
        // Bright Gold — lighter highlight variant (from the logo's metallic
        // bevel/shine) used for card accent icons, stars, and dividers so
        // they read as a shade distinct from primary buttons/links.
        gold: {
          50: "#FDF9F0",
          100: "#F8EDD2",
          200: "#F0D9A3",
          300: "#E5BE72",
          400: "#D4A24C",
          500: "#B8843A",
          600: "#8F672C",
          700: "#6B4D21",
          800: "#493516",
          900: "#2E210E",
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
