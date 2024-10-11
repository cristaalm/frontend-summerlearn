<script setup lang="ts">
import { Slideover } from "@/components/base/Headless";
import Lucide from "@/components/base/Lucide";
import {
  useColorSchemeStore,
  colorSchemes,
  type ColorSchemes,
} from "@/stores/color-scheme";
import { ref, computed } from "vue";

const themeSwitcherSlideover = ref(false);
const setThemeSwitcherSlideover = (value: boolean) => {
  themeSwitcherSlideover.value = value;
};

const setColorSchemeClass = () => {
  const el = document.querySelectorAll("html")[0];
  el.setAttribute("class", useColorSchemeStore().colorScheme);
};
const colorSchemeStore = useColorSchemeStore();
const switchColorScheme = (colorScheme: ColorSchemes) => {
  useColorSchemeStore().setColorScheme(colorScheme);
  setColorSchemeClass();
};
setColorSchemeClass();

// Computed para filtrar los color schemes excluyendo 'default'
const filteredColorSchemes = computed(() => {
  return colorSchemes.filter((scheme) => scheme !== 'default');
});
</script>

<template>
  <div>
    <Slideover
      :open="themeSwitcherSlideover"
      @close="
        () => {
          setThemeSwitcherSlideover(false);
        }
      "
    >
      <Slideover.Panel>
        <a
          href=""
          class="absolute inset-y-0 left-0 right-auto my-auto -ml-[60px] flex h-8 w-8 items-center justify-center rounded-full border border-white/90 bg-white/5 text-white/90 transition-all hover:rotate-180 hover:scale-105 hover:bg-white/10 focus:outline-none sm:-ml-[105px] sm:h-14 sm:w-14"
          @click="(event: MouseEvent) => {
            event.preventDefault();
            setThemeSwitcherSlideover(false);
          }"
        >
          <Lucide class="h-3 w-3 stroke-[1] sm:h-8 sm:w-8" icon="X" />
        </a>
        <Slideover.Description class="p-0">
          <div class="flex flex-col">
            <div class="px-8 pt-6 pb-8">
              <div class="text-base font-medium">Color del tema</div>
              <div class="mt-0.5 text-slate-500">
                Cambia el color del tema de la aplicación
              </div>
              <div class="border-b border-dashed pt-5"></div>
              <p class="mt-5">Tema actual</p>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3.5 mt-5">
                <!-- Muestra la lista de temas, excluyendo el tema 'default' -->
                <div>
                  <div :class="'h-12 cursor-pointer bg-slate-50 box rounded-full p-1 border-slate-300/80'">
                    <div class="h-full overflow-hidden rounded-full">
                      <div class="flex items-center h-full gap-1 -mx-2">
                        <div
                          :class="['w-1/2 h-[140%] bg-theme-1 rotate-12', colorSchemes[0] ]"
                        ></div>
                        <div
                          :class="['w-1/2 h-[140%] bg-theme-2 rotate-12', colorSchemes[0] ]"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="border-b border-dashed mt-5"></div>
              <p class="mt-5">Temas disponibles</p>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3.5 mt-5">
                <!-- Muestra la lista de temas, excluyendo el tema 'default' -->

                <div
                  v-for="colorScheme in filteredColorSchemes"
                  :key="colorScheme"
                >
                  <div
                    @click="(event: MouseEvent) => {
                      event.preventDefault();
                      switchColorScheme(colorScheme);
                    }"
                    :class="[
                      'h-12 cursor-pointer bg-slate-50 box rounded-full p-1 border-slate-300/80',
                      {
                        'border-2 border-theme-1/60':
                          colorSchemeStore.value === colorScheme,
                      },
                    ]"
                  >
                    <div class="h-full overflow-hidden rounded-full">
                      <div class="flex items-center h-full gap-1 -mx-2">
                        <div
                          :class="[
                            'w-1/2 h-[140%] bg-theme-1 rotate-12',
                            colorScheme,
                          ]"
                        ></div>
                        <div
                          :class="[
                            'w-1/2 h-[140%] bg-theme-2 rotate-12',
                            colorScheme,
                          ]"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slideover.Description>
      </Slideover.Panel>
    </Slideover>
    <!-- Botón para abrir el selector de temas -->
    <div
      class="fixed bottom-0 right-0 z-50 flex items-center justify-center mb-5 mr-5 text-white rounded-full shadow-lg cursor-pointer h-14 w-14 bg-theme-1"
      @click="(event: MouseEvent) => {
        event.preventDefault();
        setThemeSwitcherSlideover(true);
      }"
    >
      <Lucide class="w-5 h-5 animate-spin" icon="Settings" />
    </div>
  </div>
</template>
