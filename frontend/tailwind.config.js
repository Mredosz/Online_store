/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navbar: "#9fb8ab",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
