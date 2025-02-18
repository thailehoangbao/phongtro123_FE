/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/index.html"
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#fdf5ed",
        secondary1: "#1266dd",
        secondary2: "#e51f40",
        overlay30: "rgba(0,0,0,0.3)",
        overlay70: "rgba(0,0,0,0.7)",
      },
      maxWidth: {
        '600': '600px',
        '1100': '1100px'
      },
      minWidth: {
        '300': '300px',
        '1100': '1100px'
      }
    },
  },
  plugins: [],
}