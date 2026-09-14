import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bear: {
          bg: "#0A0A0A",
          surface: "#161616",
          "surface-alt": "#1F1F1F",
          border: "#2A2A2A",
          primary: "#F2600C",
          "primary-dark": "#C94A00",
          muted: "#9A9A9A",
        },
      },
      fontFamily: {
        display: ["Anton", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
