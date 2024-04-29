/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#211951",
        secondary: "#836FFF",
        accent: "#15F5BA",
        light: "#F0F3FF"
      }
    },
  },
  plugins: [],
}

