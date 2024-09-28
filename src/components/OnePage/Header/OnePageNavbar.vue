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
      <a href="#home"
        :class="`h-full flex justify-center items-center px-4 whitespace-nowrap transition-all duration-300 ${topScroll ? ' hover:text-blue-dark' : 'text-black hover:text-blue-dark'}`">
        {{ $t('navbar.home') }}
      </a>
      <a href="#mission"
        :class="`h-full flex justify-center items-center px-4 whitespace-nowrap transition-all duration-300 ${topScroll ? ' hover:text-green-dark' : 'text-black hover:text-green-dark'}`">
        {{ $t('navbar.mission') }}
      </a>
      <a href="#impact"
        :class="`h-full flex justify-center items-center px-4 whitespace-nowrap transition-all duration-300 ${topScroll ? ' hover:text-yellow-dark' : 'text-black hover:text-yellow-dark'}`">
        {{ $t('navbar.impact') }}
      </a>
      <a href="#joinOurTeam"
        :class="`h-full flex justify-center items-center px-4 whitespace-nowrap min-w-[150px] transition-all duration-300 ${topScroll ? ' hover:text-red-dark' : 'text-black hover:text-red-dark'}`">
        {{ $t('navbar.joinOurTeam') }}
      </a>
    </nav>
    <div class="flex flex-row justify-center items-center">
      <RouterLink to="/login"
        :class="`px-6 py-2 text-lg text-nowrap transition-all duration-300 ${topScroll ? ' hover:text-emerald-600' : 'text-black hover:text-emerald-500'}`">
        {{ $t('navbar.logIn') }}
      </RouterLink>
      <button
        class="px-6 py-2 text-xl bg-rose-500 hover:bg-rose-400 transition-all duration-300 rounded-2xl text-white">
        {{ $t('navbar.donate') }}
      </button>
    </div>
  </div>
</template>

