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
          DEFAULT: "#08120d",
          soft: "#0b1712",
          card: "#101c16",
        },
        // Light "result" surfaces — warm, green-tinted stone (not stark white)
        paper: {
          DEFAULT: "#eef1ec",
          soft: "#e5eae2",
          card: "#fcfdfa",
        },
        vea: {
          neon: "#2dd4a0", // dark-mode refined jade (primary accent)
          glow: "#17b184", // deeper jade for glows / gradients
          mist: "#7ff0d0", // light mint tip for gradient text
          steel: "#7c9cff", // cool secondary — adds technical depth
          emerald: "#059669", // light-mode professional green (value)
          "emerald-soft": "#10b981",
          amber: "#e08a12", // the "flare" — acceleration / live signals
          "amber-soft": "#f5a623",
          gold: "#fbbf24",
          ink: "#06110d",
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
