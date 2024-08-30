<script setup>
import HeaderHome from '@/components/OnePage/Header/HeaderHome.vue'
import Hero from '@/components/OnePage/Hero.vue'
import Impact from '@/components/OnePage/Impact.vue';
import Join from '@/components/OnePage/Volunteer.vue';
import Mission from '@/components/OnePage/Mission.vue';
</script>

<template>
  <header class="flex flex-col w-full">
    <HeaderHome />
  </header>

  <main class="flex flex-col w-full mt-[100px] md:mt-0">

    <!-- Here we are importing the components and rendering them in the main section of the HomeView component. -->

    <Hero />

    <Mission />

    <Impact />

    <Join />

  </main>

</template>
