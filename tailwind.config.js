/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { opacity: 0, transform: "translateY(0)" },
          "100%": { opacity: 1, transform: "translateY(-100%)" }
        },
        borderAmimate : {
          "0%": { opacity: 0, transform: "translateY(0)" },
          "100%": { opacity: 1, transform: "translateY(-100%)" }
        }
      },
      animation: {
        slideIn: "slideIn .50s ease-in-out forwards",
        borderAmimate : 'borderAmimate 250ms ease-in-out',
      }
    }
  },
  plugins: [],
}