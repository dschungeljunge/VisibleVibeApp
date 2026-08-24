import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fhnw: "#fde70e",
        "fhnw-soft": "#fff48d",
        ink: "#1e1e1e",
        muted: "#767573",
        paper: "#f7f7f5",
        cat: {
          pedagogy: "#8fce9f",
          technology: "#8db9e8",
          usability: "#cfa3dd",
        },
      },
      fontFamily: {
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
        hand: ["var(--font-excalifont)", "cursive"],
      },
      boxShadow: {
        sketch: "3px 3px 0 0 #1e1e1e",
        "sketch-lg": "5px 5px 0 0 #1e1e1e",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
