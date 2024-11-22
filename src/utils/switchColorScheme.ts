import {
  useColorSchemeStore,
  colorSchemes,
  getColorScheme,
  type ColorSchemes
} from '@/stores/color-scheme'
import { useDarkModeStore } from '@/stores/dark-mode'

const setColorSchemeClass = (): void => {
  const el = document.querySelectorAll('html')[0]
  el.setAttribute(
    'class',
    `${useColorSchemeStore().colorScheme} ${useDarkModeStore().darkMode ? 'dark' : ''}`
  )
}

const getColorSchemeUser = (): ColorSchemes => {
  const userTheme = localStorage.getItem('userTheme') as ColorSchemes
  return userTheme || colorSchemes[5]
}

const getDarkModeUser = (): boolean => {
  return localStorage.getItem('userDarkMode') === 'true' || false
}

const switchColorScheme = (colorScheme: ColorSchemes, darkMode: boolean): void => {
  useColorSchemeStore().setColorScheme(colorScheme)
  useDarkModeStore().setDarkMode(darkMode)
  setColorSchemeClass()
}

const setLocalStorage = (key: string, value: string | boolean): void => {
  localStorage.setItem(key, value.toString())
}

export const loginColorSheme = (): void => {
  switchColorScheme(getColorSchemeUser(), getDarkModeUser())
}

export const logoutColorScheme = (
  theme: ColorSchemes = 'default',
  darkMode: boolean = false
): void => {
  if (theme != 'default') {
    setLocalStorage('userTheme', theme)
    setLocalStorage('userDarkMode', darkMode)
    switchColorScheme(theme, darkMode)
    return
  }
  setLocalStorage('userDarkMode', useDarkModeStore().darkMode)
  setLocalStorage('userTheme', getColorScheme())
  changeLoginColorScheme()
}

export const changeLoginColorScheme = (): void => {
  switchColorScheme('theme-19', false)
}

export const changeColorScheme = (scheme: ColorSchemes): void => {
  switchColorScheme(scheme , false)
}