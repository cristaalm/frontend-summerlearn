<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full h-screen">
    <RouterLink
      to="/login"
      class="bg-transparent px-4 py-2 border border-green-600 text-green-600 hover:bg-green-600 hover:scale-110 hover:text-white transition-all duration-300 rounded-xl"
    >
      {{ $t('logIn') }}
    </RouterLink>
  </div>
</template>
