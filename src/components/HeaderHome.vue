<script setup>
import { ref } from 'vue'

const topScroll = ref(true)

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    topScroll.value = false
  } else {
    topScroll.value = true
  }
})
</script>

<template>
  <header
    :class="`flex flex-col md:flex-row w-full fixed transition-all duration-300 bg-gradient-to-t from-transparent ${topScroll ? 'to-black ' : 'to-transparent bg-sky-100'}`"
  >
    <div class="hidden md:flex flex-row container m-auto justify-between">
      <div class="m-2 text-4xl font-bold">
        <a
          href="#home"
          class="hover:text-gray-400 transition-all duration-300 hover:scale-105 flex flex-row"
        >
          <img src="../../public/LogoPI.png" alt="Logo" class="w-[100px] -my-[20px]" />
          <img src="../../public/LogoPILetters.png" alt="Letters Logo" class="w-[350px]" />
        </a>
      </div>

      <div class="flex flex-row text-2xl gap-2 navbar">
        <a
          href="#home"
          :class="`h-full flex flex-row justify-center items-center px-4 transition-all duration-300 ${topScroll ? 'text-white hover:text-emerald-300' : 'text-black hover:text-emerald-500'}`"
        >
          {{ $t('home') }}
        </a>
        <a
          href="#home"
          :class="`h-full flex flex-row justify-center items-center px-4 transition-all duration-300 ${topScroll ? 'text-white hover:text-emerald-300' : 'text-black hover:text-emerald-500'}`"
        >
          {{ $t('about') }}
        </a>
        <a
          href="#home"
          :class="`h-full flex flex-row justify-center items-center px-4 transition-all duration-300 ${topScroll ? 'text-white hover:text-emerald-300' : 'text-black hover:text-emerald-500'}`"
        >
          {{ $t('donatives') }}
        </a>
        <a
          href="#home"
          :class="`h-full flex flex-row justify-center items-center px-4 transition-all duration-300 ${topScroll ? 'text-white hover:text-emerald-300' : 'text-black hover:text-emerald-500'}`"
        >
          {{ $t('contact') }}
        </a>
      </div>
      <div class="flex flex-row justify-center items-center">
        <RouterLink
          to="/login"
          :class="`px-6 py-2 text-lg transition-all duration-300 ${topScroll ? 'text-white hover:text-emerald-300' : 'text-black hover:text-emerald-500'}`"
        >
          {{ $t('login') }}
        </RouterLink>
        <button
          class="px-6 py-2 text-xl bg-rose-500 hover:bg-rose-400 transition-all duration-300 rounded-2xl text-white"
        >
          {{ $t('donate') }}
        </button>
      </div>
    </div>
  </header>
</template>
