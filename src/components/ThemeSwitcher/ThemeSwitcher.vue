<script setup lang="ts">
import { ref, computed } from 'vue'
import { Slideover } from '@/components/base/Headless'
import { FormSwitch } from '@/components/base/Form'
import Lucide from '@/components/base/Lucide'
import { logoutColorScheme } from '@/utils/switchColorScheme'
import { useColorSchemeStore, colorSchemes, type ColorSchemes } from '@/stores/color-scheme'
import { useDarkModeStore } from '@/stores/dark-mode' // Importar el store del modo oscuro

interface MainProps {
  slide: boolean
}

const props: MainProps = defineProps({
  slide: {
    type: Boolean,
    default: false
  }
})

const themeSwitcherSlideover = ref(false)
const setThemeSwitcherSlideover = (value: boolean) => {
  themeSwitcherSlideover.value = value
}

// Computed para manejar el modo oscuro con un getter/setter
const darkMode = computed({
  get: () => useDarkModeStore().darkMode,
  set: (value: boolean) => {
    useDarkModeStore().setDarkMode(value)
    logoutColorScheme(colorSchemeStore.colorScheme, value)
    setColorSchemeClass() // Actualizar las clases al cambiar el modo oscuro
  }
})

// Función para establecer las clases del esquema de color y agregar la clase 'dark' si el modo oscuro está activado
const setColorSchemeClass = () => {
  const el = document.querySelector('html')
  const colorSchemeStore = useColorSchemeStore()
  const darkModeStore = useDarkModeStore()

  // Obtener la clase actual del esquema de color
  let classes = colorSchemeStore.colorScheme

  // Verificar si el modo oscuro está activado y agregar la clase 'dark'
  if (darkModeStore.darkMode) {
    classes += ' dark'
  }

  // Establecer las clases en el elemento <html>
  el?.setAttribute('class', classes)
}

const colorSchemeStore = useColorSchemeStore()
const switchColorScheme = (colorScheme: ColorSchemes) => {
  logoutColorScheme(colorScheme, useDarkModeStore().darkMode)
  useColorSchemeStore().setColorScheme(colorScheme)
  setColorSchemeClass() // Actualizar las clases después de cambiar el esquema de color
}
setColorSchemeClass() // Establecer las clases al cargar la página

// Computed para filtrar los color schemes excluyendo 'default' y los temas a partir de 'theme-18'
const filteredColorSchemes = computed(() => {
  return colorSchemes.filter((scheme) => {
    const themeNumber = parseInt(scheme.replace('theme-', ''))
    return scheme !== 'default' && (isNaN(themeNumber) || themeNumber < 19)
  })
})

// Computed para filtrar los color schemes a partir de 'theme-19'
const filteredColorSchemesFrom19 = computed(() => {
  return colorSchemes.filter((scheme) => {
    const themeNumber = parseInt(scheme.replace('theme-', ''))
    return !isNaN(themeNumber) && themeNumber >= 19
  })
})
</script>

<template>
  <div v-if="props.slide">
    <Slideover :open="themeSwitcherSlideover" @close="() => {
        setThemeSwitcherSlideover(false)
      }
      ">
      <Slideover.Panel>
        <a href=""
          class="absolute inset-y-0 left-0 right-auto my-auto -ml-[60px] flex h-8 w-8 items-center justify-center rounded-full border border-white/90 bg-white/5 text-white/90 transition-all hover:rotate-180 hover:scale-105 hover:bg-white/10 focus:outline-none sm:-ml-[105px] sm:h-14 sm:w-14"
          @click="(event: MouseEvent) => {
              event.preventDefault()
              setThemeSwitcherSlideover(false)
            }
            ">
          <Lucide class="h-3 w-3 stroke-[1] sm:h-8 sm:w-8" icon="X" />
        </a>
        <Slideover.Description class="p-0">
          <div class="flex flex-col">
            <div class="px-8 pt-6 pb-8">
              <div class="text-base font-medium dark:text-white">Color del tema</div>
              <div class="mt-0.5 text-slate-500 dark:text-slate-400">
                Cambia el color del tema de la aplicación
              </div>
              <div class="border-b border-dashed pt-5 dark:border-slate-700"></div>
              <p class="mt-5 dark:text-white">Tema actual</p>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3.5 mt-5">
                <div>
                  <div
                    :class="'h-12 cursor-pointer bg-slate-50 dark:bg-slate-800 box rounded-full p-1 border-slate-300/80 dark:border-slate-600'">
                    <div class="h-full overflow-hidden rounded-full">
                      <div class="flex items-center h-full gap-1 -mx-2">
                        <div :class="['w-1/2 h-[140%] bg-theme-1 rotate-12', colorSchemes[0]]"></div>
                        <div :class="['w-1/2 h-[140%] bg-theme-2 rotate-12', colorSchemes[0]]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="border-b border-dashed mt-5 dark:border-slate-700"></div>
              <p class="mt-5 dark:text-white">Temas disponibles</p>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3.5 mt-5">
                <div v-for="colorScheme in filteredColorSchemesFrom19" :key="colorScheme">
                  <div @click="(event: MouseEvent) => {
                      event.preventDefault()
                      switchColorScheme(colorScheme)
                    }
                    " :class="[
                      'h-12 cursor-pointer bg-slate-50 dark:bg-slate-800 box rounded-full p-1 border-slate-300/80 dark:border-slate-600',
                      {
                        'border-2 border-theme-1/60': colorSchemeStore.value === colorScheme
                      }
                    ]">
                    <div class="h-full overflow-hidden rounded-full">
                      <div class="flex items-center h-full gap-1 -mx-2">
                        <div :class="['w-1/2 h-[140%] bg-theme-1 rotate-12', colorScheme]"></div>
                        <div :class="['w-1/2 h-[140%] bg-theme-2 rotate-12', colorScheme]"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-for="colorScheme in filteredColorSchemes" :key="colorScheme">
                  <div @click="(event: MouseEvent) => {
                      event.preventDefault()
                      switchColorScheme(colorScheme)
                    }
                    " :class="[
                      'h-12 cursor-pointer bg-slate-50 dark:bg-slate-800 box rounded-full p-1 border-slate-300/80 dark:border-slate-600',
                      {
                        'border-2 border-theme-1/60': colorSchemeStore.value === colorScheme
                      }
                    ]">
                    <div class="h-full overflow-hidden rounded-full">
                      <div class="flex items-center h-full gap-1 -mx-2">
                        <div :class="['w-1/2 h-[140%] bg-theme-1 rotate-12', colorScheme]"></div>
                        <div :class="['w-1/2 h-[140%] bg-theme-2 rotate-12', colorScheme]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center flex-row px-8 pt-6 pb-8">
              <label class="inline-block w-60 mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium dark:text-white">Modo oscuro</div>
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-0">
                <FormSwitch.Input id="darkmode" type="checkbox" v-model="darkMode" class=" shadow-current" />
              </div>
            </div>
          </div>
        </Slideover.Description>
      </Slideover.Panel>
    </Slideover>
    <div
      class="fixed bottom-0 right-0 z-50 flex items-center justify-center mb-5 mr-5 text-white rounded-full shadow-lg cursor-pointer h-14 w-14 bg-theme-1 dark:bg-theme-2"
      @click="(event: MouseEvent) => {
          event.preventDefault()
          setThemeSwitcherSlideover(true)
        }
        ">
      <Lucide class="w-5 h-5 animate-spin" icon="Settings" />
    </div>
  </div>
</template>
