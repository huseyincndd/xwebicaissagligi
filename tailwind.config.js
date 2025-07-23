/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#003366',    // Ana Renk: Koyu Lacivert
          'accent': '#4CAF50',     // Vurgu Rengi: Canlı Yeşil
          'light': '#F4F7F6',      // Arka Plan Rengi: Açık Gri
          'dark': '#333333',       // Metin Rengi: Koyu Gri
        },
      },
    },
    plugins: [],
  }