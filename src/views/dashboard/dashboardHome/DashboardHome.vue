<script setup>
import InvalidAccount from './modules/InvalidAccount.vue'
import DashboardHomeBenef from '@/views/dashboard/children/ChildrenViewBen.vue'
import DashboardHomeVolun from '@/views/dashboard/subscriptions/SubscriptionsGridView.vue'
import DashboardHomeDonor from '@/components/Dashboard/Home/Donor/DashboardHome.vue'
import DashBoardHomeAdmin from '@/components/Dashboard/Home/Admin/DashboardHome.vue'
import DashboardHomeCoord from '@/components/Dashboard/Home/Coord/DashboardHome.vue'
import getIdByToken from '@/logic/getIdByToken'

// Obtener el rol del usuario a partir del token
const { rol: role, status } = getIdByToken(localStorage.getItem('access_token'))


</script>

<template>

  <InvalidAccount v-if="status === 3" />

  <DashBoardHomeAdmin v-else-if="role === 1" />

  <DashboardHomeCoord v-else-if="role === 2" />

  <DashboardHomeDonor v-else-if="role === 3" />

  <DashboardHomeVolun v-else-if="role === 4" />

  <DashboardHomeBenef v-else-if="role === 5" />

  <div v-else
    class="bg-white dark:bg-[#28334e] w-full h-screen rounded-xl flex flex-col justify-center items-center dark:text-slate-200">
    <h2 class="text-5xl text-black dark:text-slate-200 text-center">Panel de control</h2>
  </div>

</template>
