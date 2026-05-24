/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#003087",
        "navy-dark": "#001d52",
        "navy-mid": "#00419e",
        gold: "#C9A84C",
        "gold-light": "#e8c96a",
        cream: "#f7f4ef",
        ink: "#1a1a2e",
        muted: "#6b7280",
      },
      fontFamily: {
        garamond: ['"EB Garamond"', "serif"],
        "noto-serif": ['"Noto Serif JP"', "serif"],
        "noto-sans": ['"Noto Sans JP"', "sans-serif"],
      },
    },
  },
  plugins: [],
}

