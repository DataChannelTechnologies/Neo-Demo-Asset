/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neo-blue': 'oklch(50% 0.21 265)',
        'neo-blue-hover': 'oklch(43% 0.21 265)',
      },
    },
    fontFamily: {
      'plus-jakarta': ['Plus Jakarta Sans', 'sans-serif'],
    },
  },
  plugins: [],
};