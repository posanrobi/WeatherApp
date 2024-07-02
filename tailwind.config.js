/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "spin-once": {
          "0%": {
            transform: "rotate(0deg)",
            animationTimingFunction: "ease-in",
          },
          "50%": {
            transform: "rotate(140deg)",
            animationTimingFunction: "ease-out",
          },
          "100%": {
            transform: "rotate(280deg)",
            animationTimingFunction: "ease-out",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "spin-once": "spin-once 1.5s forwards",
        "fade-in": "fade-in 1.5s forwards",
      },
    },
  },
  plugins: [],
};
