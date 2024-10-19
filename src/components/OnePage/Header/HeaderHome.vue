<script setup>
import { ref } from 'vue'
import Navbar from '@/components/OnePage/Header/OnePageNavbar.vue'
import NavbarResponsive from '@/components/OnePage/Header/OnePageNavbarMobile.vue'

const topScroll = ref(true)

const color = ref(false)

const changeColor = () => {
  color.value = !color.value
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    topScroll.value = false
  } else {
    topScroll.value = true
  }
})
</script>

<template>
  <!-- flex flex-col md:flex-row w-full fixed transition-all duration-300 min-h-[80px] bg-emerald-50 z-50 -->
  <div
    :class="`flex flex-col md:flex-row w-full fixed transition-all duration-300 min-h-[80px] bg-opacity-70 backdrop-filter backdrop-blur-sm z-50 ${color || !topScroll ? 'bg-gray-800 md:bg-blued/60' : ''} `"
  >
    <div class="flex flex-row w-full md:container md:m-auto justify-between">
      <div class="md:m-2 lg:m-0 xl:m-2 text-4xl font-bold lg:w-full">
        <a
          href="#home"
          class="hover:text-gray-400 transition-all duration-300 hover:scale-105 flex flex-row justify-center items-center"
        >
          <img
            src="/logo_completo.png"
            alt="Logo"
            class="hidden lg:inline-block min-w-[100px] w-[300px] xl:-my-[20px]"
          />
        </a>
      </div>
      <Navbar />
      <NavbarResponsive :changeColor="changeColor" />
    </div>
  </div>
</template>
