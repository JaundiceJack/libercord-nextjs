/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        104: "26rem",
        120: "30rem",
        128: "32rem",
        136: "34rem",
        152: "38rem",
        168: "42rem",
      },
    },
  },
  plugins: [],
};
