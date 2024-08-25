/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or false
  theme: {
    extend: {
      gridAutoRows: {
        max: "max-content",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
