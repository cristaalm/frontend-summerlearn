/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        navActivate: 'navActivate 1s forwards',
        navDeactivate: 'navDeactivate 0.5s forwards'
      },
      keyframes: {
        navActivate: {
          '0%': { height: '0px' },
          '100%': { height: 'calc(100vh - 100px)', padding: '1rem 0' }
        },
        navDeactivate: {
          '0%': { height: 'calc(100vh - 100px)', padding: '1rem 0' },
          '100%': { height: '0px' }
        }
      }
    }
  },
  plugins: []
}
