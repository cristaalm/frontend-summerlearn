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
  <div class="hidden md:flex flex-row justify-between lg:gap-10 w-full">
    <nav class="flex flex-row text-2xl lg:gap-2 navbar">
      <a
        href="#home"
        :class="`h-full flex flex-row justify-center items-center px-4 transition-all duration-300 ${topScroll ? ' hover:text-emerald-600' : 'text-black hover:text-emerald-600'}`"
      >
        {{ $t('home') }}
      </a>
      <a
        href="#home"
        :class="`h-full flex flex-row justify-center items-center px-4 transition-all duration-300 ${topScroll ? ' hover:text-emerald-600' : 'text-black hover:text-emerald-600'}`"
      >
        {{ $t('about') }}
      </a>
      <a
        href="#home"
        :class="`h-full flex flex-row justify-center items-center px-4 transition-all duration-300 ${topScroll ? ' hover:text-emerald-600' : 'text-black hover:text-emerald-600'}`"
      >
        {{ $t('donatives') }}
      </a>
      <a
        href="#home"
        :class="`h-full flex flex-row justify-center items-center px-4 transition-all duration-300 ${topScroll ? ' hover:text-emerald-600' : 'text-black hover:text-emerald-600'}`"
      >
        {{ $t('contact') }}
      </a>
    </nav>
    <div class="flex flex-row justify-center items-center">
      <RouterLink
        to="/login"
        :class="`px-6 py-2 text-lg transition-all duration-300 ${topScroll ? ' hover:text-emerald-600' : 'text-black hover:text-emerald-500'}`"
      >
        {{ $t('logIn') }}
      </RouterLink>
      <button
        class="px-6 py-2 text-xl bg-rose-500 hover:bg-rose-400 transition-all duration-300 rounded-2xl text-white"
      >
        {{ $t('donate') }}
      </button>
    </div>
  </div>
</template>
