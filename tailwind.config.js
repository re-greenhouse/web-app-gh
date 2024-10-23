/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4C6444",
        secondary: "#898989",
        third: "#282A3F",
        accent: "#15F5BA",
        background: "#F0F3FF",
        loginButton: "#282A3F",
        textCardColorE: "#465B3F",
        textCardColorR: "#282A3F",
        textCardColorM: "#DE4F4F"
      }
    },
  },
  plugins: [],
}

