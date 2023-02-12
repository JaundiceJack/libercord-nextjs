/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        99.5: "0.995",
        100.5: "1.005",
        101: "1.01",
        102: "1.02",
        103: "1.03",
        104: "1.04",
      },
      spacing: {
        82: "20.5rem",
        84: "21rem",
        86: "21.5rem",
        88: "22rem",
        90: "22.5rem",
        92: "23rem",
        94: "23.5rem",
        98: "24.5rem",
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
