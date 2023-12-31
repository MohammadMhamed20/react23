/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0d6efd",
      },
    },
    darkMode: ["class", '[data-mode="dark"]'],
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "3rem",
        xl: "3rem",
        "2xl": "7rem",
      },
      center: true,
    },
  },
  plugins: [],
};
