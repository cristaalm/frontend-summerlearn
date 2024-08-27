<script setup>
import { ref } from 'vue'
import Navbar from '@/components/OnePage/Navbar.vue'
import NavbarResponsive from '@/components/OnePage/NavbarResponsive.vue'

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
    :class="`flex flex-col md:flex-row w-full fixed transition-all duration-300 min-h-[80px] bg-emerald-50`"
  >
    <div class="flex flex-row w-full md:container md:m-auto justify-between">
      <div class="m-2 lg:m-0 xl:m-2 text-4xl font-bold lg:w-full">
        <a
          href="#home"
          class="hover:text-gray-400 transition-all duration-300 hover:scale-105 flex flex-row"
        >
          <img
            src="/LogoPI.png"
            alt="Logo"
            class="hidden lg:inline-block min-w-[100px] w-[100px] xl:-my-[20px]"
          />
          <img
            src="/LogoPILetters.png"
            alt="Letters Logo"
            class="hidden xl:inline-block w-[350px]"
          />
        </a>
      </div>
      <Navbar />
      <NavbarResponsive />
    </div>
  </header>
</template>
