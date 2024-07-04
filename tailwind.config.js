/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fit-minmax-255": "repeat(auto-fit, minmax(255px, 1fr))",
      },
      fontFamily: {
        sans: ["Amiko", "sans-serif"], // ตั้งค่าฟอนต์
      },
      colors: {
        customBeige: "#f8f4ed",
        luckyPoint: "#1d2b53",
        torchRed: "#ff004d",
        gainsboro: "#dbdbdb",
        corn: "#faef5d",
        pigmentGreen: "#00a850",
        windsor: "#4e2e7f",
        summerSky: "#1ba5e1",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
