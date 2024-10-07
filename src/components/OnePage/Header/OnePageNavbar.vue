<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const topScroll = ref(true)

window.addEventListener('scroll', () => {
  topScroll.value = window.scrollY <= 0
})

const smoothScroll = (event) => {
  event.preventDefault()
  const targetId = event.target.getAttribute('href').substring(1)
  const targetElement = document.getElementById(targetId)
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>

<template>
  <div class="hidden md:flex flex-row justify-between lg:gap-10 w-full">
    <nav class="flex flex-row text-2xl lg:gap-2 navbar">
      <a
        href="#home"
        @click="smoothScroll"
        :class="`h-full flex justify-center items-center px-4 whitespace-nowrap transition-all duration-300 ${topScroll ? ' hover:text-blued' : 'text-gray-900 hover:text-gray-500 '}`"
      >
        {{ $t('navbar.home') }}
      </a>
      <a
        href="#mission"
        @click="smoothScroll"
        :class="`h-full flex justify-center items-center px-4 whitespace-nowrap transition-all duration-300 ${topScroll ? ' hover:text-green' : 'text-gray-900 hover:text-gray-500 '}`"
      >
        {{ $t('navbar.mission') }}
      </a>
      <a
        href="#impact"
        @click="smoothScroll"
        :class="`h-full flex justify-center items-center px-4 whitespace-nowrap transition-all duration-300 ${topScroll ? ' hover:text-yellow' : 'text-gray-900 hover:text-gray-500 '}`"
      >
        {{ $t('navbar.impact') }}
      </a>
      <a
        href="#joinOurTeam"
        @click="smoothScroll"
        :class="`h-full flex justify-center items-center px-4 whitespace-nowrap min-w-[150px] transition-all duration-300 ${topScroll ? ' hover:text-redd' : 'text-gray-900 hover:text-gray-500'}`"
      >
        {{ $t('navbar.joinOurTeam') }}
      </a>
    </nav>
    <div class="flex flex-row justify-center items-center">
      <span
        @click="router.push({ name: 'login' })"
        :class="`px-6 py-2 text-lg text-nowrap transition-all duration-300 cursor-pointer ${topScroll ? ' hover:text-emerald-600' : 'text-black hover:text-gray-500'}`"
      >
        {{ $t('navbar.logIn') }}
      </span>
      <button
        @click="router.push({ name: 'register', params: { rol: 'donante' } })"
        class="px-6 py-2 text-xl bg-rose-500 hover:bg-rose-400 transition-all duration-300 rounded-2xl text-white"
      >
        {{ $t('navbar.donate') }}
      </button>
    </div>
  </div>
</template>
