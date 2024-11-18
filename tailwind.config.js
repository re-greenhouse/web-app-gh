/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
      },
      blur: {
        xs: "2px",
      },
      colors: {
        primary: "#4C6444",
        secondary: "#898989",
        third: "#282A3F",
        accent: "#7DA257",
        background: "#F0F3FF",
        loginButton: "#282A3F",
        textCardColorE: "#465B3F",
        textCardColorR: "#282A3F",
        textCardColorM: "#DE4F4F",
        inviteCompontentText: "#111827",
      },
    },
  },
  plugins: [],
};
