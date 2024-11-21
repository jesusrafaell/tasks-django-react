/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        wiggle: {
          "0%": { scale: "0" },
          "100%": { scale: "100%" },
        },
      },
      animation: {
        wiggle: "wiggle 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
};
