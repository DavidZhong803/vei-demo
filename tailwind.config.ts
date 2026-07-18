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
        // Dark "engine" surfaces — deep green-black (GeniusFlare foundation)
        ink: {
          DEFAULT: "#071019",
          soft: "#0a1620",
          card: "#101d29",
        },
        // Light "result" surfaces — warm, green-tinted stone (not stark white)
        paper: {
          DEFAULT: "#eef1f5",
          soft: "#e4e9ef",
          card: "#fbfcfe",
        },
        vea: {
          neon: "#86a8ff", // primary cold-steel accent
          glow: "#597ed6", // deeper blue for glows / gradients
          mist: "#c6d6ff", // pale steel highlight
          steel: "#7c9cff", // cool secondary — adds technical depth
          emerald: "#607fbf", // legacy token remapped to steel blue
          "emerald-soft": "#7c9cff",
          amber: "#e08a12", // the "flare" — acceleration / live signals
          "amber-soft": "#f5a623",
          gold: "#fbbf24",
          ink: "#071019",
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
