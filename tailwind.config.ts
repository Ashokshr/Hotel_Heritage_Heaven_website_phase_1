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
        // Heritage Green — primary brand color, calibrated from the Heritage
        // Heaven logo. Used for buttons, links, active states, ratings,
        // headings accents. 600 is the "Dark Forest Green" hover shade.
        heritage: {
          50: "#F1F6EC",
          100: "#DFEACE",
          200: "#BFD69E",
          300: "#98BD6C",
          400: "#729E48",
          500: "#4F7F35",
          600: "#3D652A",
          700: "#33511F",
          800: "#243A16",
          900: "#17250E",
        },
        // Antique Gold / Brass — accent color for card icons and dividers.
        // (This is the site's original V1 primary palette, repurposed.)
        gold: {
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
