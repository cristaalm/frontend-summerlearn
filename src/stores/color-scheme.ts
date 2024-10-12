import { defineStore } from 'pinia'

export const colorSchemes = [
  'default',
  'theme-9',
  'theme-14',
  'theme-17',
  'theme-18',
  'theme-19',
  'theme-20',
  'theme-21',
  'theme-22',
] as const

export type ColorSchemes = (typeof colorSchemes)[number]

interface ColorSchemeState {
  value: ColorSchemes
}

export const getColorScheme = () => {
  const colorScheme = localStorage.getItem('colorScheme')
  if (colorScheme === null) {
    console.log('colorScheme is null')
    localStorage.setItem('colorScheme', 'theme-19')
    return 'theme-19'
  }
  return colorSchemes.filter((item, key) => {return item === colorScheme})[0] 
}

export const useColorSchemeStore = defineStore('colorScheme', {
  state: (): ColorSchemeState => ({
    value: localStorage.getItem('colorScheme') === null ? 'theme-19' : getColorScheme()
  }),
  getters: {
    colorScheme(state) {
      if (localStorage.getItem('colorScheme') === null) {
        localStorage.setItem('colorScheme', 'theme-19')
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
