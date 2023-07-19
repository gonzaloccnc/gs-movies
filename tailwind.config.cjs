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
        gs_black: 'rgba(0, 0, 0, 0.8)',
        top: 'rgba(0,0,0,0.6)'
      },
      transitionTimingFunction: {
        slide: 'cubic-bezier(.46,-0.29,0,1.32)',
        text: 'cubic-bezier(1,0,.37,.37)'
      },
      backgroundImage: {
        banner: 'url(/banner.png)'
      },
      gridTemplateRows: {
        c1: 'repeat(3, minmax(240px, 240px))'
      },
      keyframes: {
        line: {
          '0%': {
            height: '0px'
          },

          '100%': {
            height: '98%'
          }
        }
      },
      animation: {
        line: 'line 1s ease-in-out 1s forwards'
      }
    }
  },
  plugins: []
}
