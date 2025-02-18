/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        mainBlue: "#4242f0",
        mainBlueDarker: "#0d0db5",
        darkText: "#E5E5E5",
        darkBg: "#0F0F10",
        darkBgSoft: "#1B1C1D",
        darkBgMuted: "#323539",
        darkBorder: "#939394",
        navbar: "#9fb8ab",
        form: "#fdf6e9",
        formBorder: "#f2c99f",
        darkerNavbar: "#9fe9ab",
      },
    },
  },
  plugins: [],
};
