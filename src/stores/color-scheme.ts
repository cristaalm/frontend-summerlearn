import { defineStore } from 'pinia'

export const colorSchemes = [
  'default',
  'theme-1',
  'theme-2',
  'theme-3',
  'theme-4',
  'theme-5',
  'theme-6',
  'theme-7',
  'theme-8',
  'theme-9',
  'theme-10',
  'theme-11',
  'theme-12',
  'theme-13',
  'theme-14',
  'theme-15',
  'theme-16',
  'theme-17',
  'theme-18'
] as const

export type ColorSchemes = (typeof colorSchemes)[number]

interface ColorSchemeState {
  value: ColorSchemes
}

export const getColorScheme = () => {
  const colorScheme = localStorage.getItem('colorScheme')
  if (colorScheme === null) {
    console.log('colorScheme is null')
    localStorage.setItem('colorScheme', 'theme-1')
    return 'theme-1'
  }
  return colorSchemes.filter((item, key) => {return item === colorScheme})[0] 
}

export const useColorSchemeStore = defineStore('colorScheme', {
  state: (): ColorSchemeState => ({
    value: localStorage.getItem('colorScheme') === null ? 'theme-1' : getColorScheme()
  }),
  getters: {
    colorScheme(state) {
      if (localStorage.getItem('colorScheme') === null) {
        localStorage.setItem('colorScheme', 'theme-1')
      }

      return state.value
    }
  },
  actions: {
    setColorScheme(colorScheme: ColorSchemes) {
      localStorage.setItem('colorScheme', colorScheme)
      this.value = colorScheme
    }
  }
})
