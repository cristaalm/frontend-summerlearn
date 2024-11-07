<script setup lang="ts">
import HeaderHome from '@/components/OnePage/Header/HeaderHome.vue'
import Hero from '@/components/OnePage/OnePageHero.vue'
import Impact from '@/components/OnePage/OnePageImpact.vue'
import JoinOurTeam from '@/components/OnePage/OnePageJoinOurTeam.vue'
import Mission from '@/components/OnePage/OnePageMission.vue'
import Footer from '@/components/OnePage/OnePageFooter.vue'
import { changeLoginColorScheme } from '@/utils/switchColorScheme'
import { onMounted } from 'vue'


// Definir la función smoothScroll
function smoothScroll(target: string) {
  const element = document.querySelector(target)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
onMounted(() => {
  changeLoginColorScheme()
})

</script>
<template>
  <header class="flex flex-col w-full">
    <HeaderHome />
  </header>

  <main class="flex flex-col w-full mt-[100px] md:mt-0">
    <!-- Componentes principales de HomeView -->

    <Hero />
    <Mission />
    <Impact />
    <JoinOurTeam />

    <!-- Enlace con logo y desplazamiento suave -->
    <a
    href="#home"
    @click.prevent="smoothScroll('#home')"
    class="fixed bottom-0 right-0 z-10 hover:text-gray-400 transition-all duration-300 hover:scale-105 flex flex-row justify-center items-center m-4"
  >
    <img
      src="/public/icono.png"
      alt="Logo"
      class="w-[50px] lg:w-[75px]"
    />
  </a>
  </main>

  <Footer />
</template>