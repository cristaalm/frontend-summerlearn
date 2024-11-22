<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div
    class="min-h-screen h-fit w-full py-12 md:py-24 lg:py-32 flex flex-col justify-center items-center space-y-8 bg-gradient-to-r from-hred1 to-hred2"
    id="joinOurTeam"
  >
    <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8 text-white">
      {{ $t('joinOurTeam.title') }}
    </h1>
    <div
      class="w-full flex flex-wrap justify-center items-stretch gap-4 px-4 lg:px-10"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-delay="300"
    >
      <!-- Sección de voluntarios -->
      <section
        id="volunteer"
        class="w-full sm:w-[90%] md:w-[48%] lg:w-[30%] flex flex-col justify-between items-center p-6 rounded-lg bg-white shadow-lg hover:shadow-2xl transition-transform duration-200 hover:scale-105"
      >
        <div class="flex flex-col items-center text-center space-y-4">
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-hblue2">
            {{ $t('joinOurTeam.volunteer.title') }}
          </h2>
          <p class="text-sm sm:text-base md:text-lg text-justify text-black">
            {{ $t('joinOurTeam.volunteer.description') }}
          </p>
        </div>
        <button
          @click="router.push({ name: 'register', params: { rol: 'voluntario' } })"
          class="mt-4 w-full sm:w-auto px-6 py-3 text-sm sm:text-base font-medium text-white bg-emerald-500 rounded-lg shadow hover:bg-emerald-500/80 transition-transform duration-200 hover:scale-105"
        >
          {{ $t('joinOurTeam.volunteer.button') }}
        </button>
      </section>

      <!-- Repetir estructura para beneficiarios y donantes -->
      <section
        id="beneficiary"
        class="w-full sm:w-[90%] md:w-[48%] lg:w-[30%] flex flex-col justify-between items-center p-6 rounded-lg bg-white shadow-lg hover:shadow-2xl transition-transform duration-200 hover:scale-105"
      >
        <div class="flex flex-col items-center text-center space-y-4">
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-hblue2">
            {{ $t('joinOurTeam.beneficiary.title') }}
          </h2>
          <p class="text-sm sm:text-base md:text-lg text-justify text-black">
            {{ $t('joinOurTeam.beneficiary.description') }}
          </p>
        </div>
        <button
          @click="router.push({ name: 'register', params: { rol: 'beneficiario' } })"
          class="mt-4 w-full sm:w-auto px-6 py-3 text-sm sm:text-base font-medium text-white bg-emerald-500 rounded-lg shadow hover:bg-emerald-500/80 transition-transform duration-200 hover:scale-105"
        >
          {{ $t('joinOurTeam.beneficiary.button') }}
        </button>
      </section>

      <section
        id="donor"
        class="w-full sm:w-[90%] md:w-[48%] lg:w-[30%] flex flex-col justify-between items-center p-6 rounded-lg bg-white shadow-lg hover:shadow-2xl transition-transform duration-200 hover:scale-105"
      >
        <div class="flex flex-col items-center text-center space-y-4">
          <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-hblue2">
            {{ $t('joinOurTeam.donor.title') }}
          </h2>
          <p class="text-sm sm:text-base md:text-lg text-justify text-black">
            {{ $t('joinOurTeam.donor.description') }}
          </p>
        </div>
        <button
          @click="router.push({ name: 'register', params: { rol: 'donante' } })"
          class="mt-4 w-full sm:w-auto px-6 py-3 text-sm sm:text-base font-medium text-white bg-emerald-500 rounded-lg shadow hover:bg-emerald-500/80 transition-transform duration-200 hover:scale-105"
        >
          {{ $t('joinOurTeam.donor.button') }}
        </button>
      </section>
    </div>
  </div>
</template>
