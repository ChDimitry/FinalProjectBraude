/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or false
  theme: {
    extend: {
      gridAutoRows: {
        max: "max-content",
      },
      backgroundImage: {
        map: "url('Assets/Map/map.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
