import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-outfit)', 'sans-serif'],
      },
      colors: {
        rose: {
          50: '#FFF5F5',
          100: '#FFE4E1',
          600: '#DC143C',
          900: '#2C2C2C', // Using charcoal for text as requested
        },
        gold: '#FFD700',
      },
    },
  },
  plugins: [],
};
export default config;
