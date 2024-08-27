<template>
  <div class="md:hidden flex flex-col w-full text-black">
    <div class="w-full flex flex-row justify-between px-10">
      <div class="w-[100px]">
        <img
          src="/LogoPI.png"
          alt="Logo"
          class="w-[100px] m-auto hover:scale-105 transition-all duration-300"
        />
      </div>
      <div class="flex flex-row justify-center items-center">
        <button>
          <Menu
            class="w-12 hover:scale-105 transition-all duration-300"
            v-if="!enableMenu"
            @click="toggleMenu"
          />
          <Close
            class="w-12 hover:scale-105 transition-all duration-300"
            v-else
            @click="toggleMenu"
          />
        </button>
      </div>
    </div>
    <div
      class="w-full h-[0px] overflow-hidden flex flex-col gap-5 justify-between"
      ref="navbarMenu"
    >
      <div class="flex flex-col gap-4">
        <a
          href="#home"
          @click="toggleMenu"
          :class="`h-full flex flex-row justify-center items-center text-4xl py-4 transition-all duration-300 text-black ${topScroll ? ' hover:text-emerald-600 hover:bg-emerald-200' : ' hover:text-emerald-600 hover:bg-emerald-200'}`"
        >
          {{ $t('home') }}
        </a>
        <a
          href="#about"
          @click="toggleMenu"
          :class="`h-full flex flex-row justify-center items-center text-4xl py-4 transition-all duration-300 text-black ${topScroll ? ' hover:text-emerald-600 hover:bg-emerald-200' : ' hover:text-emerald-600 hover:bg-emerald-200'}`"
        >
          {{ $t('about') }}
        </a>
        <a
          href="#donatives"
          @click="toggleMenu"
          :class="`h-full flex flex-row justify-center items-center text-4xl py-4 transition-all duration-300 text-black ${topScroll ? ' hover:text-emerald-600 hover:bg-emerald-200' : ' hover:text-emerald-600 hover:bg-emerald-200'}`"
        >
          {{ $t('donatives') }}
        </a>
        <a
          href="#contact"
          @click="toggleMenu"
          :class="`h-full flex flex-row justify-center items-center text-4xl py-4 transition-all duration-300 text-black ${topScroll ? ' hover:text-emerald-600 hover:bg-emerald-200' : ' hover:text-emerald-600 hover:bg-emerald-200'}`"
        >
          {{ $t('contact') }}
        </a>
      </div>
      <div class="flex flex-col justify-center items-center gap-6">
        <RouterLink
          to="/login"
          :class="`px-6 py-2 text-2xl transition-all duration-300 ${topScroll ? ' hover:text-emerald-300' : 'text-black hover:text-emerald-500'}`"
        >
          {{ $t('logIn') }}
        </RouterLink>
        <button
          class="px-6 py-2 text-3xl bg-rose-500 hover:bg-rose-400 transition-all duration-300 rounded-2xl text-white"
        >
          {{ $t('donate') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Menu from '@/components/icons/menu.vue'
import Close from '../icons/close.vue'

const topScroll = ref(true)
const enableMenu = ref(false)
const navbarMenu = ref(null)

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    topScroll.value = false
  } else {
    topScroll.value = true
  }
})

const toggleMenu = () => {
  enableMenu.value = !enableMenu.value
  // verificamos is el menu tiene la clase h-[0px], si es asi la eliminamos
  if (navbarMenu.value.classList.contains('h-[0px]')) {
    navbarMenu.value.classList.remove('h-[0px]')
  }

  if (enableMenu.value) {
    navbarMenu.value.classList.add('animate-navActivate')
    navbarMenu.value.classList.remove('animate-navDeactivate')
  } else {
    navbarMenu.value.classList.add('animate-navDeactivate')
    navbarMenu.value.classList.remove('animate-navActivate')
  }
}
</script>
