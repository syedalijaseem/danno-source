module.exports = {
  purge: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
