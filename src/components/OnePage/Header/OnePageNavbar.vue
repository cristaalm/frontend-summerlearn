<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Tippy from '@/components/base/Tippy'

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
      <div class="flex justify-center items-center h-full">
        <div class="bg-transparent hover:bg-hblue1/30 rounded-md transition-all duration-300">
          <a
            href="#home"
            @click="smoothScroll"
            :class="`h-full flex justify-center items-center text-black px-4 py-2 whitespace-nowrap transition-all duration-300 ${topScroll ? 'hover:text-hblue2' : 'text-white hover:text-hblue2'} `"
          >
            {{ $t('navbar.home') }}
          </a>
        </div>
      </div>

      <div class="flex justify-center items-center space-x-4">
        <div class="bg-transparent hover:bg-hgeen1/30 rounded-md transition-all duration-300">
          <a
            href="#mission"
            @click="smoothScroll"
            :class="`h-full flex justify-center items-center text-black px-4 py-2 whitespace-nowrap transition-all duration-300 ${topScroll ? 'hover:text-hgeen2' : 'text-white hover:text-hgeen1'} `"
          >
            {{ $t('navbar.mission') }}
          </a>
        </div>

        <div class="bg-transparent hover:bg-hyellow1/30 rounded-md transition-all duration-300">
          <a
            href="#impact"
            @click="smoothScroll"
            :class="`h-full flex justify-center items-center text-black px-4  py-2 whitespace-nowrap transition-all duration-300 ${topScroll ? 'hover:text-hyellow2' : 'text-white hover:text-hyellow1'} `"
          >
            {{ $t('navbar.impact') }}
          </a>
        </div>

        <div class="bg-transparent hover:bg-hred1/30 rounded-md transition-all duration-300">
          <a
            href="#joinOurTeam"
            @click="smoothScroll"
            :class="`h-full flex justify-center items-center text-black px-4 py-2 whitespace-nowrap min-w-[150px] transition-all duration-300 ${topScroll ? 'hover:text-hred2' : 'text-white hover:text-hred2'} `"
          >
            {{ $t('navbar.joinOurTeam') }}
          </a>
        </div>
      </div>
    </nav>
    <div class="flex flex-row justify-center items-center">
      <button
        @click="router.push({ name: 'register', params: { rol: 'donante' } })"
        class="px-6 py-2 text-xl bg-rose-500 hover:bg-rose-400 transition-all duration-300 rounded-2xl text-white"
      >
        {{ $t('navbar.donate') }}
      </button>

      <Tippy
        as="button"
        @click="router.push({ name: 'login' })"
        :class="`px-6 py-2 text-lg text-nowrap transition-all duration-300 text-black cursor-pointer ${topScroll ? ' hover:text-hgeen1' : 'text-white dark:text-slate-200 hover:text-hgeen2'}`"
        content="Iniciar sesión"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-8"
        >
          <path
            fill-rule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clip-rule="evenodd"
          />
        </svg>
      </Tippy>
    </div>
  </div>
</template>
