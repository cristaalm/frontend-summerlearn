<script setup>
import { onMounted, computed, inject } from 'vue';
import LoadingIcon from '@/components/base/LoadingIcon';

const { donations, loadDonations, loadingDonations } = inject('donations');

onMounted(() => {
  loadDonations();
});

// Computada para obtener las últimas seis donaciones ordenadas por fecha
const lastSixDonations = computed(() => {
  return donations.value
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);
});

// Formatea el total en formato de moneda
function formatCurrency(value) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
}

// Función para formatear la fecha sin desfase de zona horaria
function formatLocalDate(date) {
  const localDate = new Date(date);
  return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toLocaleDateString();
}
</script>

<template>
  <div class="flex flex-col col-span-12 md:col-span-6 lg:col-span-8 gap-2 p-5 box box--stacked">
    <div
      class="flex flex-col p-5 border border-dashed rounded-lg gap-y-8 lg:items-center lg:flex-row bg-slate-50/60 dark:bg-transparent dark:border-none">
      <div class="relative flex flex-col gap-5 lg:gap-8">
        <div>
          <div class="text-md uppercase text-slate-500 dark:text-slate-400">Últimas 6 donaciones:</div>
        </div>
      </div>
    </div>

    <div v-if="loadingDonations" class="w-full h-full justify-center items-center flex flex-row">
      <div class="w-32">
        <LoadingIcon icon="three-dots" color="gray" />
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <template v-if="lastSixDonations.length">
        <div v-for="(donation, index) in lastSixDonations" :key="index"
          class="border border-dashed rounded-lg border-slate-300/80 flex flex-col justify-between p-4 hover:bg-slate-50 dark:bg-slate-700 dark:border-slate-600 cursor-pointer">
          <div>
            <div class="max-w-[12rem] font-medium truncate text-primary dark:text-slate-200">
              {{ donation.concept }}
            </div>
            <div class="whitespace-nowrap text-slate-500 mt-0.5 dark:text-slate-400">
              Donaciones
            </div>
            <div class="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              {{ formatLocalDate(donation.date) }}
            </div>
          </div>
          <div class="font-medium whitespace-nowrap dark:text-slate-200 mt-2">
            {{ formatCurrency(donation.quanty) }} MXN
          </div>
        </div>
      </template>
      <template v-else>
        <div class="flex justify-center w-full p-4 text-slate-500 dark:text-slate-400">No hay donaciones disponibles
        </div>
      </template>
    </div>
  </div>
</template>
