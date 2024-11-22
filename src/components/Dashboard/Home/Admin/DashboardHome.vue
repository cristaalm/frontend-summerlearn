<template>
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <programList />
    <div class="col-span-12 lg:col-span-8 grid grid-cols-12 gap-y-10 gap-x-6 h-fit">
      <usersStats />
      <donationsList />
      <billsList />
    </div>
  </div>
</template>

<script setup>
import usersStats from './modules/usersStats.vue'
import programList from './modules/programList.vue'
import donationsList from './modules/donationsList.vue'
import billsList from './modules/billsList.vue'
</script>
