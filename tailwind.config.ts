import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        "soft-text": "var(--soft-text)",
        "muted-text": "var(--muted-text)",
        "border-color": "var(--border-color)",
        "hover-bg": "var(--hover-bg)",
        "active-bg": "var(--active-bg)",
        "active-border": "var(--active-border)",
        "input-bg": "var(--input-bg)",
        "input-border": "var(--input-border)",
        "input-text": "var(--input-text)",
      },
    },
  },
  plugins: [],
};

export default config;
