/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#f5e6c8',
          DEFAULT: '#c5a059',
          dark: '#9a7732',
        },
        maroon: {
          light: '#a32838',
          DEFAULT: '#801b26',
          dark: '#520e17',
        }
      }
    },
  },
  plugins: [],
}
