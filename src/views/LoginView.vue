<script setup>
import { ref } from 'vue'
import SingUp from '@/components/formsSession/SingUp.vue'
import LogIn from '@/components/formsSession/LogIn.vue'
import ArrowLeft from '@/components/icons/arrowLeft.vue'

// Define a reactive variable to toggle between sign up and log in forms
const formSingUp = ref(true)

// Function to toggle the value of formSingUp
const changeForms = () => {
  formSingUp.value = !formSingUp.value
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center w-full min-h-screen bg-[rgba(19,35,47,1)] md:bg-[url('src/assets/img/backgraundLogin.png')] bg-cover bg-no-repeat"
  >
    <!-- Background image and container for the login form -->
    <div
      class="md:bg-[rgba(19,35,47,0.9)] drop-shadow-2xl max-w-[600px] w-full px-4 sm:px-12 py-6 flex flex-col rounded-xl"
    >
      <!-- Buttons to toggle between sign up and log in forms -->
      <div class="flex flex-col md:flex-row gap-4">
        <button
          :class="` w-full md:w-1/2 p-3 select-none cursor-pointer rounded-xl text-2xl text-white font-light transition-all duration-300 ${formSingUp ? 'bg-emerald-500 scale-105' : 'hover:bg-emerald-500/80 bg-gray-600 text-gray-500'}`"
          @click="changeForms"
          :disabled="formSingUp"
        >
          Sing up
        </button>
        <button
          :class="`w-full md:w-1/2 p-3 select-none cursor-pointer rounded-xl text-2xl text-white font-light transition-all duration-300  ${!formSingUp ? 'bg-emerald-500 scale-105' : 'hover:bg-emerald-500/80 bg-gray-600 text-gray-500'}`"
          @click="changeForms"
          :disabled="!formSingUp"
        >
          Log in
        </button>
      </div>

      <!-- Button to go back to the home page -->
      <RouterLink
        to="/"
        class="flex flex-row items-center justify-center mt-4 text-white hover:text-emerald-400 transition-all duration-300 hover:scale-105"
      >
        <ArrowLeft class="w-6 h-6 mr-1" />
        <span> Go back </span>
      </RouterLink>

      <!-- Render the sign up or log in component based on the value of formSingUp -->
      <div class="flex flex-col mt-4">
        <SingUp v-show="formSingUp" />
        <LogIn v-show="!formSingUp" />¿
      </div>
    </div>
  </div>
</template>
