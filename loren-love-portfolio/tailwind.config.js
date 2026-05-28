/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#7a9e7e',
          light: '#eaf2eb',
          dark: '#4a7a50',
          blob: '#e4ece4',
        },
        cream: '#fafaf8',
        terminal: '#0d0d0d',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
      fontSize: {
        hero: 'clamp(2.8rem, 8vw, 7rem)',
        section: 'clamp(1.8rem, 4vw, 2.8rem)',
        contact: 'clamp(2rem, 5vw, 4rem)',
      },
    },
  },
  plugins: [],
}
