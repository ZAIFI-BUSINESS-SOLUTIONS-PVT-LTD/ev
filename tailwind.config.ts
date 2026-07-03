import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: "#03050a",
        ink: "#070b13",
        electric: "#38bdf8",
        signal: "#16f2b3",
        caution: "#f8d462",
        danger: "#ff5d73"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 80px rgba(56, 189, 248, 0.28)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.5)"
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(circle at top, rgba(56,189,248,0.25), transparent 32rem)"
      }
    }
  },
  plugins: []
};

export default config;
