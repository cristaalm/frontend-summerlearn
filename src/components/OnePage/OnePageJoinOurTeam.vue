<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template>
  <div class="w-full py-12 md:py-24 lg:py-32 flex flex-col justify-center items-center bg-red/20 space-y-4 "
    id="joinOurTeam">
    <h1 class="text-7xl font-bold text-center mb-10">{{ $t('joinOurTeam.title') }}</h1>
    <div class="w-full md:flex md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">

      <!-- Sección de voluntarios -->
      <section id="volunteer"
        class="w-full md:w-1/3 flex flex-col justify-center items-center p-6 rounded-lg bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
        data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-delay="300">
        <div class="container px-4 md:px-6">
          <div class="flex flex-col items-center justify-center space-y-4 text-center">
            <div class="space-y-2">
              <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">
                {{ $t('joinOurTeam.volunteer.title') }}
              </h2>
              <p class="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {{ $t('joinOurTeam.volunteer.description') }}
              </p>
            </div>
            <div class="flex gap-2 flex-row justify-center">
              <button @click="router.push({ name: 'register', params: { rol: 'voluntario' } })"
                class="inline-flex h-10 w-3/4 md:w-fit items-center whitespace-nowrap justify-center cursor-pointer select-none rounded-md bg-emerald-500 px-10 py-6 text-lg font-medium text-white shadow transition-colors hover:bg-emerald-500/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 duration-300 transform hover:scale-105 hover:rotate-2">
                {{ $t('joinOurTeam.volunteer.button') }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Sección de beneficiarios -->
      <section id="beneficiary"
        class="w-full md:w-1/3 flex flex-col justify-center items-center p-6 rounded-lg bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
        data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-delay="100">
        <div class="container px-4 md:px-6">
          <div class="flex flex-col items-center justify-center space-y-4 text-center">
            <div class="space-y-2">
              <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">
                {{ $t('joinOurTeam.beneficiary.title') }}
              </h2>
              <p class="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {{ $t('joinOurTeam.beneficiary.description') }}
              </p>
            </div>
            <div class="flex gap-2 flex-row justify-center">
              <button @click="router.push({ name: 'register', params: { rol: 'beneficiario' } })"
                class="inline-flex h-10 w-3/4 md:w-fit items-center whitespace-nowrap justify-center cursor-pointer select-none rounded-md bg-emerald-500 px-10 py-6 text-lg font-medium text-white shadow transition-colors hover:bg-emerald-500/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 duration-300 transform hover:scale-105 hover:rotate-2">
                {{ $t('joinOurTeam.beneficiary.button') }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Sección de donantes -->
      <section id="donor"
        class="w-full md:w-1/3 flex flex-col justify-center items-center p-6 rounded-lg bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
        data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-delay="300">
        <div class="container px-4 md:px-6">
          <div class="flex flex-col items-center justify-center space-y-4 text-center">
            <div class="space-y-2">
              <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">
                {{ $t('joinOurTeam.donor.title') }}
              </h2>
              <p class="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {{ $t('joinOurTeam.donor.description') }}
              </p>
            </div>
            <div class="flex gap-2 flex-row justify-center">
              <button @click="router.push({ name: 'register', params: { rol: 'donante' } })"
                class="inline-flex h-10 w-3/4 md:w-fit items-center whitespace-nowrap justify-center cursor-pointer select-none rounded-md bg-emerald-500 px-10 py-6 text-lg font-medium text-white shadow transition-colors hover:bg-emerald-500/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 duration-300 transform hover:scale-105 hover:rotate-2">
                {{ $t('joinOurTeam.donor.button') }}
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>
