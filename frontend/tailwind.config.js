/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navbar: "#9fb8ab",
        form: "#fdf6e9",
        formBorder: "#f2c99f",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
