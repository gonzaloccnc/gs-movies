const { fontFamily } = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'var(--font-barlow)', ...fontFamily.sans],
        poppins: 'var(--font-poppins)',
        barlow: 'var(--font-barlow)'
      },
      colors: {
        gs_orange: '#ff5900',
        gs_dark: '#0f0f0f',
        gs_gray: '#a0a0a0',
        gs_black: 'rgba(0, 0, 0, 0.8)'
      }
    }
  },
  plugins: []
}
