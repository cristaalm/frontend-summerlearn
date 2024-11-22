<script setup>
import Alert from '@/components/base/Alert'
</script>

<template>
  <div
    class="bg-white dark:bg-[#28334e] w-full h-[calc(100vh-190px)] rounded-xl flex flex-col justify-center items-center dark:text-slate-200"
  >
    <div class="p-10 pb-2 bg-blue-100/80 dark:bg-slate-900/50 rounded-xl">
      <h2 class="text-5xl text-black dark:text-slate-200 text-center mb-4">
        Esperando verificación
      </h2>

      <p class="text-lg text-gray-700 dark:text-slate-400 text-center">
        Por favor, espere a que su cuenta sea verificada por un administrador.
      </p>

      <p class="text-lg text-gray-700 dark:text-slate-400 text-center">
        Recibirá una notificación una vez que el proceso haya sido completado.
      </p>

      <Alert
        variant="outline-secondary"
        message="Si ya recibió notificación de verificación, por favor, reinicie su sesión."
        class="flex items-center my-5"
      />
    </div>
  </div>
</template>
