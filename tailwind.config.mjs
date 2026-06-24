/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#10B981',
      },
      fontFamily: {
        serif: ['Noto Serif SC', 'Source Han Serif SC', 'SimSun', 'serif'],
        sans: ['Noto Sans SC', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};