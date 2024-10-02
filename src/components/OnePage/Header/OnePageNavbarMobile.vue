<template>
  <div class="md:hidden flex flex-col w-full text-black">
    <div class="w-full flex flex-row justify-between px-10">
      <a class="w-[100px]" href="#home" @click.prevent="smoothScroll('#home')">
        <img src="/logo_icono.png" alt="Logo"
          class="w-[100px] p-2 m-auto hover:scale-105 transition-all duration-300" />
      </a>
      <div class="flex flex-row justify-center items-center">
        <button>
          <Menu class="w-12 hover:scale-105 transition-all duration-300" v-if="!enableMenu" @click="toggleMenu" />
          <Close class="w-12 hover:scale-105 transition-all duration-300 text-white" v-else @click="toggleMenu" />
        </button>
      </div>
    </div>
    <div class="w-full h-[0px] overflow-hidden flex flex-col gap-5 justify-between" ref="navbarMenu">
      <div class="flex flex-col gap-4">
        <a href="#home" @click.prevent="smoothScroll('#home')" @click="toggleMenu"
          :class="`h-full flex flex-row justify-center items-center text-4xl py-4 transition-all duration-300 text-white hover:text-blue-light hover:bg-blue/10`">
          {{ $t('navbar.home') }}
        </a>
        <a href="#mission" @click.prevent="smoothScroll('#mission')" @click="toggleMenu"
          :class="`h-full flex flex-row justify-center items-center text-4xl py-4 transition-all duration-300 text-white hover:text-green-light hover:bg-green/10`">
          {{ $t('navbar.mission') }}
        </a>
        <a href="#impact" @click.prevent="smoothScroll('#impact')" @click="toggleMenu"
          :class="`h-full flex flex-row justify-center items-center text-4xl py-4 transition-all duration-300 text-white hover:text-yellow-light hover:bg-yellow/10`">
          {{ $t('navbar.impact') }}
        </a>
        <a href="#joinOurTeam" @click.prevent="smoothScroll('#joinOurTeam')" @click="toggleMenu"
          :class="`h-full flex flex-row justify-center items-center text-4xl py-4 transition-all duration-300 text-white hover:text-red-light hover:bg-red/10`">
          {{ $t('navbar.joinOurTeam') }}
        </a>
      </div>
      <div class="flex flex-col justify-center items-center gap-6">
        <span @click="router.push({ name: 'login' })"
          :class="`px-6 py-2 text-2xl transition-all duration-300 text-white ${topScroll ? ' hover:text-emerald-300' : ' hover:text-emerald-500'}`">
          {{ $t('navbar.logIn') }}
        </span>
        <button @click="router.push('/register?rol=3')"
          class="px-6 py-2 text-3xl bg-rose-500 hover:bg-rose-400 transition-all duration-300 rounded-2xl text-white">
          {{ $t('navbar.donate') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Menu from '@/components/icons/IconMenu.vue'
import Close from '@/components/icons/IconClose.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// definimos las props que recibira el componente
const props = defineProps({
  changeColor: Function
})

// definimos las variables reactivas para el menu desplegable
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

// Función para hacer scroll suave con un ajuste de 100px más arriba
const smoothScroll = (hash) => {
  const targetElement = document.querySelector(hash)
  if (targetElement) {
    // Calcular la posición del elemento en la página y restar 100px
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY - 100

    // Hacer scroll suave a la posición calculada
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}


const toggleMenu = () => {
  props.changeColor()
  enableMenu.value = !enableMenu.value
  // verificamos si el menu tiene la clase h-[0px], si es asi la eliminamos
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
