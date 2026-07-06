import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        // Dark "engine" surfaces
        ink: {
          DEFAULT: "#07080a",
          soft: "#0c0e11",
          card: "#101317",
        },
        // Light "result" surfaces
        paper: {
          DEFAULT: "#fafbfc",
          soft: "#f2f4f6",
          card: "#ffffff",
        },
        vea: {
          neon: "#00ffc2", // dark-mode medical/neon green
          glow: "#00e5ac",
          emerald: "#059669", // light-mode professional green
          "emerald-soft": "#10b981",
          ink: "#0b1a15",
        },
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        "spin-slow": "spin-slow 26s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
