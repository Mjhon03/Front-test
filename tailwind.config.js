/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00BFB3",
        Pine_green: "#037971",
        Persian_green: "#049A8F",
        Midnight_green: "#023436",
        Light_sea_green: "#03B5AA",
        DimWhite: "rgba(255, 255, 255, 0.7)",
        BackColor: "#1b3b6f",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        robotoSlab: ["Roboto Slab", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
  variants: {
    scrollbar: ["rounded"],
  },
};
