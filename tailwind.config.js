// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        food: {
          primary: '#EA4B24',
          primaryDark: '#C93E1B',
          dark: '#1F2937',
        },
      },
    },
  },
  plugins: [],
}