/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", 
    "./context/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'],
        traditional: ['Amiri', 'serif'],
      },
      colors: {
        primary: {
          50: '#fdfceb',
          100: '#fbf6c5',
          200: '#f6ec8b',
          300: '#efde46',
          400: '#e8cc16',
          500: '#d1b10b',
          600: '#a68506',
          700: '#856407',
          800: '#6e500e',
          900: '#5e4212',
        }
      }
    },
  },
  plugins: [],
}
