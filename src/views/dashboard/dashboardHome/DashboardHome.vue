<script setup>
import DashboardHomeDonor from '@/components/Dashboard/Home/Donor/DashboardHome.vue'
import DashBoardHomeAdmin from '@/components/Dashboard/Home/Admin/DashboardHome.vue'
import DashboardHomeCoord from '@/components/Dashboard/Home/Coord/DashboardHome.vue'
import getIdByToken from '@/logic/getIdByToken'

// Obtener el rol del usuario a partir del token
const { rol: role } = getIdByToken(localStorage.getItem('access_token'))


</script>

<template>

  <DashBoardHomeAdmin v-if="role === 1" />

  <DashboardHomeCoord v-else-if="role === 2" />

  <DashboardHomeDonor v-else-if="role === 3" />


  <div v-else
    class="bg-white dark:bg-[#28334e] w-full h-screen rounded-xl flex flex-col justify-center items-center dark:text-slate-200">
    <h2 class="text-5xl text-black dark:text-slate-200 text-center">Panel de control</h2>
  </div>

</template>
