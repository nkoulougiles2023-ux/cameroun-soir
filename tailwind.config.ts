// NOTE: This project uses Tailwind CSS v4.
// Runtime configuration is handled via @theme in src/app/globals.css.
// This file documents the design tokens for reference and IDE tooling.
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        "teal-brand": "#2B8C8C",
        "teal-dark": "#1E6B6B",
        "teal-light": "#3AA8A8",
        // Dark theme
        "dark-primary": "#1A1A2E",
        "dark-secondary": "#16213E",
        // Accent
        "red-brand": "#E63946",
        // Institutional content section
        "institutional-bg": "#FDF6E3",
        "institutional-border": "#D4A843",
        "institutional-badge": "#B8860B",
      },
    },
  },
  plugins: [],
};

export default config;
