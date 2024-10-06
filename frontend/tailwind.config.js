/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      navbar: "#9fb8ab",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
