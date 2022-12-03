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
