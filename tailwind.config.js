/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      rotate: {
        210: "210deg",
        225: "225deg",
        240: "240deg",
        270: "270deg",
        300: "300deg",
        315: "315deg",
        330: "330deg",
        360: "360deg",
      },
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
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-textshadow"),
    require("tailwind-scrollbar-hide"),
  ],
};
