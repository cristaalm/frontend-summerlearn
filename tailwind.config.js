const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')
const { parseColor } = require('tailwindcss/lib/util/color')

/** Converts HEX color to RGB */
const toRGB = (value) => {
  return parseColor(value).color.join(' ')
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js,jsx,ts}'],
  darkMode: 'class',
  theme: {
    container: {
      screens: {
        '2xl': '1320px'
      }
    },
    extend: {
      animation: {
        navActivate: 'navActivate 1s forwards',
        navDeactivate: 'navDeactivate 0.5s forwards',
        'toast-enter': 'toastEnter 0.5s ease-out forwards',
        'toast-leave': 'toastLeave 0.5s ease-in forwards'
      },
      keyframes: {
        navActivate: {
          '0%': { height: '0px' },
          '100%': { height: 'calc(100vh - 100px)', padding: '1rem 0' }
        },
        navDeactivate: {
          '0%': { height: 'calc(100vh - 100px)', padding: '1rem 0' },
          '100%': { height: '0px' }
        },
        toastEnter: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' }, // Entrada desde la izquierda
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        toastLeave: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-20px)' } // Salida hacia la izquierda
        }
      },
      screens: {
        '3xl': '1600px'
      },
      colors: {
        customGreen: '#76D390',
        greend: '#a6f6bd',
        yellowd: '#FDFFAA',
        redd: '#FFC3C3',
        blued: '#86E6FF',
        theme: {
          1: 'rgb(var(--color-theme-1) / <alpha-value>)',
          2: 'rgb(var(--color-theme-2) / <alpha-value>)'
        },
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        pending: 'rgb(var(--color-pending) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        light: 'rgb(var(--color-light) / <alpha-value>)',
        dark: 'rgb(var(--color-dark) / <alpha-value>)',
        darkmode: {
          50: 'rgb(var(--color-darkmode-50) / <alpha-value>)',
          100: 'rgb(var(--color-darkmode-100) / <alpha-value>)',
          200: 'rgb(var(--color-darkmode-200) / <alpha-value>)',
          300: 'rgb(var(--color-darkmode-300) / <alpha-value>)',
          400: 'rgb(var(--color-darkmode-400) / <alpha-value>)',
          500: 'rgb(var(--color-darkmode-500) / <alpha-value>)',
          600: 'rgb(var(--color-darkmode-600) / <alpha-value>)',
          700: 'rgb(var(--color-darkmode-700) / <alpha-value>)',
          800: 'rgb(var(--color-darkmode-800) / <alpha-value>)',
          900: 'rgb(var(--color-darkmode-900) / <alpha-value>)'
        },
        blue: {
          light: 'rgb(var(--color-blue-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-blue) / <alpha-value>)',
          dark: 'rgb(var(--color-blue-dark) / <alpha-value>)'
        },
        green: {
          light: 'rgb(var(--color-green-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-green) / <alpha-value>)',
          dark: 'rgb(var(--color-green-dark) / <alpha-value>)'
        },
        yellow: {
          light: 'rgb(var(--color-yellow-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-yellow) / <alpha-value>)',
          dark: 'rgb(var(--color-yellow-dark) / <alpha-value>)'
        },
        red: {
          light: 'rgb(var(--color-red-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-red) / <alpha-value>)',
          dark: 'rgb(var(--color-red-dark) / <alpha-value>)'
        },
        footerColor: '#F6F6EB'
      },
      fontFamily: {
        'public-sans': ['Public Sans'],
        'dm-sans': ['DM Sans']
      },
      backgroundImage: {
        'texture-black':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2346.899' height='1200.894' viewBox='0 0 2346.899 1200.894'%3E%3Cg id='Group_369' data-name='Group 369' transform='translate(-33.74 508.575)'%3E%3Cg id='Group_366' data-name='Group 366' transform='translate(33.74 -458.541)'%3E%3Crect id='Rectangle_492' data-name='Rectangle 492' width='745.289' height='650.113' transform='matrix(0.978, 0.208, -0.208, 0.978, 296.729, 261.648)' fill='rgba(30,41,59,0.01)'/%3E%3Crect id='Rectangle_491' data-name='Rectangle 491' width='1335.276' height='650.113' transform='translate(0 543.106) rotate(-24)' fill='rgba(30,41,59,0.01)'/%3E%3C/g%3E%3Cg id='Group_367' data-name='Group 367' transform='translate(1647.456 1026.688) rotate(-128)'%3E%3Crect id='Rectangle_492-2' data-name='Rectangle 492' width='745.289' height='650.113' transform='matrix(0.978, 0.208, -0.208, 0.978, 296.729, 261.648)' fill='rgba(30,41,59,0.01)'/%3E%3Crect id='Rectangle_491-2' data-name='Rectangle 491' width='1335.276' height='650.113' transform='translate(0 543.106) rotate(-24)' fill='rgba(30,41,59,0.01)'/%3E%3C/g%3E%3Cg id='Group_368' data-name='Group 368' transform='matrix(-0.656, -0.755, 0.755, -0.656, 1017.824, 1042.94)'%3E%3Crect id='Rectangle_492-3' data-name='Rectangle 492' width='745.289' height='650.113' transform='matrix(0.978, 0.208, -0.208, 0.978, 296.729, 261.648)' fill='rgba(30,41,59,0.01)'/%3E%3Crect id='Rectangle_491-3' data-name='Rectangle 491' width='1335.276' height='650.113' transform='translate(0 543.106) rotate(-24)' fill='rgba(30,41,59,0.01)'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A\")",
        'texture-white':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2346.899' height='1200.894' viewBox='0 0 2346.899 1200.894'%3E%3Cg id='Group_369' data-name='Group 369' transform='translate(-33.74 508.575)'%3E%3Cg id='Group_366' data-name='Group 366' transform='translate(33.74 -458.541)'%3E%3Crect id='Rectangle_492' data-name='Rectangle 492' width='745.289' height='650.113' transform='translate(296.729 261.648) rotate(12.007)' fill='rgba(255,255,255,0.014)'/%3E%3Crect id='Rectangle_491' data-name='Rectangle 491' width='1335.276' height='650.113' transform='translate(0 543.106) rotate(-24)' fill='rgba(255,255,255,0.014)'/%3E%3C/g%3E%3Cg id='Group_367' data-name='Group 367' transform='translate(1647.456 1026.688) rotate(-128)'%3E%3Crect id='Rectangle_492-2' data-name='Rectangle 492' width='745.289' height='650.113' transform='translate(296.729 261.648) rotate(12.007)' fill='rgba(255,255,255,0.014)'/%3E%3Crect id='Rectangle_491-2' data-name='Rectangle 491' width='1335.276' height='650.113' transform='translate(0 543.106) rotate(-24)' fill='rgba(255,255,255,0.014)'/%3E%3C/g%3E%3Cg id='Group_368' data-name='Group 368' transform='matrix(-0.656, -0.755, 0.755, -0.656, 1017.824, 1042.94)'%3E%3Crect id='Rectangle_492-3' data-name='Rectangle 492' width='745.289' height='650.113' transform='translate(296.729 261.648) rotate(12.007)' fill='rgba(255,255,255,0.014)'/%3E%3Crect id='Rectangle_491-3' data-name='Rectangle 491' width='1335.276' height='650.113' transform='translate(0 543.106) rotate(-24)' fill='rgba(255,255,255,0.014)'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A\")",
        'chevron-white':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff95' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
        'chevron-black':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2300000095' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")"
      },
      container: {
        center: true
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addBase, matchUtilities }) {
      addBase({
        // Default colors
        ':root': {
          "--color-theme-1": toRGB("#03045e"),
          "--color-theme-2": toRGB("#0c4a6e"),
          "--color-theme-3": toRGB("#0077b6"),
          "--color-primary": toRGB("#03045e"),
          "--color-secondary": toRGB(colors.slate["200"]),
          "--color-success": toRGB(colors.teal["600"]),
          "--color-info": toRGB(colors.cyan["600"]),
          "--color-warning": toRGB(colors.yellow["600"]),
          "--color-pending": toRGB(colors.orange["700"]),
          "--color-danger": toRGB(colors.red["700"]),
          "--color-light": toRGB(colors.slate["100"]),
          "--color-dark": toRGB(colors.slate["800"]),

          // // Tonalidades agregadas
          '--color-blue-light': toRGB('#7BD3EA'), // Azul claro
          '--color-blue': toRGB('#5BA3B8'), // Azul intermedio
          '--color-blue-dark': toRGB('#3A7386'), // Azul oscuro

          '--color-green-light': toRGB('#A1EEBD'), // Verde claro
          '--color-green': toRGB('#7FCC95'), // Verde intermedio
          '--color-green-dark': toRGB('#5EAA6D'), // Verde oscuro

          '--color-yellow-light': toRGB('#F6F7C4'), // Amarillo claro
          '--color-yellow': toRGB('#D2D49B'), // Amarillo intermedio
          '--color-yellow-dark': toRGB('#AEAF73'), // Amarillo oscuro

          '--color-red-light': toRGB('#F6D6D6'), // Rojo claro
          '--color-red': toRGB('#D2AEAE'), // Rojo intermedio
          '--color-red-dark': toRGB('#AE8787') // Rojo oscuro
        },
        // Default dark-mode colors
        '.dark': {
          '--color-primary': toRGB(colors.blue['700']),
          '--color-darkmode-50': '87 103 132',
          '--color-darkmode-100': '74 90 121',
          '--color-darkmode-200': '65 81 114',
          '--color-darkmode-300': '53 69 103',
          '--color-darkmode-400': '48 61 93',
          '--color-darkmode-500': '41 53 82',
          '--color-darkmode-600': '40 51 78',
          '--color-darkmode-700': '35 45 69',
          '--color-darkmode-800': '27 37 59',
          '--color-darkmode-900': '15 23 42'
        },
        '.theme-1': {
          '--color-theme-1': toRGB('#76D390'), // Tonalidad oscura de esmeralda
          '--color-theme-2': toRGB('#4c855c'), // Tonalidad más clara
          '--color-theme-3': toRGB('#64b079 '), // Tonalidad más clara
          '--color-primary': toRGB('#064e3b'),
          '--color-secondary': toRGB(colors.emerald['200']), // Usé un tono claro de esmeralda
          '--color-success': toRGB(colors.emerald['500']), // Color de éxito con tono esmeralda
          '--color-info': toRGB(colors.cyan['400']),
          '--color-warning': toRGB(colors.amber['500']),
          '--color-pending': toRGB(colors.orange['600']),
          '--color-danger': toRGB(colors.red['600']),
          '--color-light': toRGB(colors.emerald['100']), // Tonalidad más suave de esmeralda
          '--color-dark': toRGB(colors.emerald['900']), // Tonalidad muy oscura de esmeralda
          '&.dark': {
            '--color-primary': toRGB(colors.emerald['800'])
          }
        },
        // Theme 1 colors
        '.theme-2': {
          '--color-theme-1': toRGB(colors.violet['900']),
          '--color-theme-2': toRGB(colors.rose['800']),
          '--color-theme-3': toRGB(colors.rose['800']),
          '--color-primary': toRGB(colors.violet['900']),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        // Theme 2 colors
        '.theme-3': {
          '--color-theme-1': toRGB(colors.purple['900']),
          '--color-theme-2': toRGB(colors.cyan['700']),
          '--color-theme-3': toRGB(colors.cyan['700']),
          '--color-primary': toRGB(colors.purple['900']),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        // Theme 3 colors
        '.theme-4': {
          '--color-theme-1': toRGB(colors.cyan['700']),
          '--color-theme-2': toRGB(colors.violet['800']),
          '--color-theme-3': toRGB(colors.violet['800']),
          '--color-primary': toRGB(colors.cyan['700']),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        // Theme 4 colors
        '.theme-5': {
          '--color-theme-1': toRGB(colors.sky['700']),
          '--color-theme-2': toRGB(colors.rose['800']),
          '--color-theme-3': toRGB(colors.rose['800']),
          '--color-primary': toRGB(colors.sky['700']),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        // Theme 5 colors
        '.theme-6': {
          '--color-theme-1': toRGB(colors.sky['800']),
          '--color-theme-2': toRGB(colors.emerald['800']),
          '--color-theme-3': toRGB(colors.emerald['800']),
          '--color-primary': toRGB(colors.sky['800']),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        // Theme 6 colors
        '.theme-7': {
          '--color-theme-1': toRGB('#247ba0'),
          '--color-theme-2': toRGB('#0a2463'),
          '--color-theme-3': toRGB('#0a2463'),
          '--color-primary': toRGB('#247ba0'),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        // Theme 7 colors
        '.theme-8': {
          '--color-theme-1': toRGB(colors.lime['950']),
          '--color-theme-2': toRGB(colors.teal['900']),
          '--color-theme-3': toRGB(colors.teal['900']),
          '--color-primary': toRGB(colors.lime['950']),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        // Theme 8 colors
        '.theme-9': {
          '--color-theme-1': toRGB('#357266'),
          '--color-theme-2': toRGB('#0E3B43'),
          '--color-theme-3': toRGB('#0E3B43'),
          '--color-primary': toRGB('#357266'),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        // Theme 9 colors
        '.theme-10': {
          '--color-theme-1': toRGB('#6C6C60'),
          '--color-theme-2': toRGB('#4D4D42'),
          '--color-theme-3': toRGB('#4D4D42'),
          '--color-primary': toRGB('#6C6C60'),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        // Theme 10 colors
        '.theme-11': {
          '--color-theme-1': toRGB(colors.indigo['800']),
          '--color-theme-2': toRGB(colors.blue['900']),
          '--color-theme-3': toRGB(colors.blue['900']),
          '--color-primary': toRGB(colors.indigo['800']),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        // Theme 11 colors
        '.theme-12': {
          '--color-theme-1': toRGB('#2f3e46'),
          '--color-theme-2': toRGB('#52796f'),
          '--color-theme-3': toRGB('#52796f'),
          '--color-primary': toRGB('#2f3e46'),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        // Theme 12 colors
        '.theme-13': {
          '--color-theme-1': toRGB('#5e503f'),
          '--color-theme-2': toRGB('#22333b'),
          '--color-theme-3': toRGB('#22333b'),
          '--color-primary': toRGB('#5e503f'),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        // Theme 13 colors
        '.theme-14': {
          '--color-theme-1': toRGB('#5e548e'),
          '--color-theme-2': toRGB('#231942'),
          '--color-theme-3': toRGB('#231942'),
          '--color-primary': toRGB('#5e548e'),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        // Theme 14 colors
        '.theme-15': {
          '--color-theme-1': toRGB('#02292f'),
          '--color-theme-2': toRGB('#767522'),
          '--color-theme-3': toRGB('#767522'),
          '--color-primary': toRGB('#02292f'),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        // Theme 15 colors
        '.theme-16': {
          '--color-theme-1': toRGB('#4c956c'),
          '--color-theme-2': toRGB('#006466'),
          '--color-theme-3': toRGB('#006466'),
          '--color-primary': toRGB('#4c956c'),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        // Theme 16 colors
        '.theme-17': {
          '--color-theme-1': toRGB(colors.sky['900']),
          '--color-theme-2': toRGB(colors.blue['950']),
          '--color-theme-3': toRGB(colors.blue['950']),
          '--color-primary': toRGB(colors.sky['900']),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        // Theme 17 colors
        '.theme-18': {
          '--color-theme-1': toRGB(colors.slate['900']),
          '--color-theme-2': toRGB(colors.slate['800']),
          '--color-theme-3': toRGB(colors.slate['800']),
          '--color-primary': toRGB(colors.slate['900']),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        '.theme-19': {
          '--color-theme-2': toRGB('#1E6B88'),
          '--color-theme-1': toRGB('#5BCAE6'),
          '--color-theme-3': toRGB('#1E6B88'),
          '--color-primary': toRGB('#1E6B88'),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        '.theme-20': {
          '--color-theme-2': toRGB('#1aca60'),
          '--color-theme-1': toRGB('#67de96'),
          '--color-theme-3': toRGB('#1aca60'),
          '--color-primary': toRGB('#1aca60'),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        '.theme-21': {
          '--color-theme-2': toRGB('#f88e15'),
          '--color-theme-1': toRGB('#f0e035'),
          '--color-theme-3': toRGB('#f88e15'),
          '--color-primary': toRGB('#f88e15'),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        },
        '.theme-22': {
          '--color-theme-2': toRGB('#db3e29'),
          '--color-theme-1': toRGB('#ffa094'),
          '--color-theme-3': toRGB('#db3e29'),
          '--color-primary': toRGB('#db3e29'),
          '--color-secondary': toRGB(colors.slate['200']),
          '--color-success': toRGB(colors.teal['600']),
          '--color-info': toRGB(colors.cyan['600']),
          '--color-warning': toRGB(colors.yellow['600']),
          '--color-pending': toRGB(colors.orange['700']),
          '--color-danger': toRGB(colors.red['700']),
          '--color-light': toRGB(colors.slate['100']),
          '--color-dark': toRGB(colors.slate['800']),
          '&.dark': {
            '--color-primary': toRGB(colors.sky['800'])
          }
        }
      })
    })
  ]
}
