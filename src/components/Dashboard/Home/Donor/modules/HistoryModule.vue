<script setup>
import { ref, onMounted, computed } from 'vue'
import { useDonations } from '@/hooks/donations/'

const { donations, loadDonations } = useDonations()

onMounted(() => {
  loadDonations()
})

// Computada para obtener las últimas seis donaciones ordenadas por fecha
const lastSixDonations = computed(() => {
  return donations.value
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6)
})

// Computada para calcular el total de todas las donaciones, asegurando que 'quanty' sea un número
const totalDonations = computed(() => {
  return donations.value.reduce((total, donation) => total + (Number(donation.quanty) || 0), 0)
})

// Formatea el total en formato de moneda
function formatCurrency(value) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value)
}

// Función para formatear la fecha sin desfase de zona horaria
function formatLocalDate(date) {
  const localDate = new Date(date)
  return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toLocaleDateString()
}
</script>

<template>
  <div class="flex flex-col col-span-12 md:col-span-6 lg:col-span-8 gap-2 p-5 box box--stacked">
    <div class="flex flex-col p-5 border border-dashed rounded-lg gap-y-8 lg:items-center lg:flex-row bg-slate-50/60 dark:bg-transparent dark:border-none">
      <div class="relative flex flex-col gap-5 lg:gap-8">
        <div>
          <div class="text-md uppercase text-slate-500 dark:text-slate-400">Ultimas 6 donaciones:</div>
          
        </div>
      </div>
    </div>

    <div class="flex flex-col md:grid md:grid-cols-4 w-full gap-2">
      <div class="border border-dashed rounded-[0.6rem] border-slate-300/80 dark:border-slate-500 col-span-4 xl:col-span-2">
        <template v-if="lastSixDonations.length">
          <div v-for="(donation, index) in lastSixDonations" :key="index"
               class="flex items-center px-5 py-4 border-b border-dashed cursor-pointer first:rounded-t-lg last:rounded-b-lg border-slate-300/80 last:border-b-0 last:border-0 hover:bg-slate-50 dark:bg-slate-700 dark:border-slate-600">
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
            <div class="ml-auto font-medium whitespace-nowrap dark:text-slate-200">
              ${{ donation.quanty }} MXN
            </div>
          </div>
        </template>
        <template v-else>
          <div class="p-4 text-center text-slate-500 dark:text-slate-400">No hay donaciones disponibles</div>
        </template>
      </div>
    </div>
  </div>
</template>
