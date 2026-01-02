/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#E50914', // Le rouge du design
        dark: '#0F1014',  // Le fond sombre
      }
    },
  },
  plugins: [],
}