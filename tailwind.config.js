/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: '400px',
      md: '960px',
      lg: '1280px',
      xl: '1600px'
    },
  },
  plugins: [],
}

