<script setup>
import DashboardHomeDonor from '@/components/Dashboard/Home/Donor/DashboardHome.vue'
import DashBoardHomeAdmin from '@/components/Dashboard/Home/Admin/DashboardHome.vue'
import DashboardHomeCoord from '@/components/Dashboard/Home/Coord/DashboardHome.vue'
import getIdByToken from '@/logic/getIdByToken'
import Alert from '@/components/base/Alert'

// Obtener el rol del usuario a partir del token
const { rol: role, status } = getIdByToken(localStorage.getItem('access_token'))


</script>

<template>

  <template v-if="status == 3">
    <div
      class="bg-white dark:bg-[#28334e] w-full h-[calc(100vh-190px)] rounded-xl flex flex-col justify-center items-center dark:text-slate-200">

      <div class="p-10 pb-2 bg-blue-100/80 dark:bg-slate-900/50 rounded-xl">

        <h2 class="text-5xl text-black dark:text-slate-200 text-center mb-4">Esperando verificación</h2>

        <p class="text-lg text-gray-700 dark:text-slate-400 text-center">
          Por favor, espere a que su cuenta sea verificada por un administrador.
        </p>

        <p class="text-lg text-gray-700 dark:text-slate-400 text-center">
          Recibirá una notificación una vez que el proceso haya sido completado.
        </p>

        <Alert variant="outline-secondary"
          message="Si ya recibió notificación de verificación, por favor, reinicie su sesión."
          class="flex items-center my-5" />
      </div>


    </div>
  </template>

  <DashBoardHomeAdmin v-else-if="role === 1" />

  <DashboardHomeCoord v-else-if="role === 2" />

  <DashboardHomeDonor v-else-if="role === 3" />


  <div v-else
    class="bg-white dark:bg-[#28334e] w-full h-screen rounded-xl flex flex-col justify-center items-center dark:text-slate-200">
    <h2 class="text-5xl text-black dark:text-slate-200 text-center">Panel de control</h2>
  </div>

</template>
