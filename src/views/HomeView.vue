<script setup>
import HeaderHome from '@/components/OnePage/Header/HeaderHome.vue'
import Hero from '@/components/OnePage/OnePageHero.vue'
import Impact from '@/components/OnePage/OnePageImpact.vue'
import Join from '@/components/OnePage/OnePageVolunteer.vue'
import Mission from '@/components/OnePage/OnePageMission.vue'
import Footer from '@/components/OnePage/OnePageFooter.vue'
</script>

<template>
  <header class="flex flex-col w-full">
    <HeaderHome />
  </header>

  <main class="flex flex-col w-full mt-[100px] md:mt-0 ">
    <!-- Here we are importing the components and rendering them in the main section of the HomeView component. -->

    <Hero />

    <Mission />

    <Impact />

    <Join />
  </main>

  <Footer />
</template>
