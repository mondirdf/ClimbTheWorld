import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mountain: {
          deep: "#05070e",
          mid: "#0a1531",
          high: "#16336d",
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(59,130,246,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
