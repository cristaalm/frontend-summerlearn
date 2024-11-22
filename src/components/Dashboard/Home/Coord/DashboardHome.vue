<script setup>
import ProgramsList from './modules/ProgramsList.vue'
import ActivitiesList from './modules/ActivitiesList.vue'
import ProgramsAsignedList from './modules/ProgramsAsignedList.vue'
</script>

<template>
  <div class="grid grid-cols-12 gap-y-10 gap-x-2">
    <ProgramsAsignedList />
    <ProgramsList />
    <ActivitiesList />
  </div>
</template>
