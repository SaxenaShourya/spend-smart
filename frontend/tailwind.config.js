const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "theme('colors.blue.600')",
        secondary: "theme('colors.gray.300')",
        error: "#E9094C",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        calSans: ["Cal-sans", "sans-serif"],
      },
      screens: {
        xmd: "910px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
