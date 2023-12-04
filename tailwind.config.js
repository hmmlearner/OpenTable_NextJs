/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontSize:{
      "2xsm": "10px",
      xsm: "12px",
      sm: "13px",
      reg: "15px",
      lg: "18px",
      "2xl": "22px",
      "4xl": "32px",
      "5xl": "40px",
      "6xl": "50px",
      "7xl": "60px"
    }
  },
  plugins: [],
}
