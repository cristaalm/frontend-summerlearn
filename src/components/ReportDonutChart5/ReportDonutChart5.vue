<script setup>
import { computed, onMounted, ref, watch, inject } from 'vue'
import { useColorSchemeStore } from '@/stores/color-scheme'
import { useDarkModeStore } from '@/stores/dark-mode'
import Chart from '@/components/base/Chart'
import Table from '../base/Table'
import { getColor } from '@/utils/colors'
// @ts-ignore
import LoadingIcon from '@/components/base/LoadingIcon'

const { donations, loadDonations, loadingDonations } = inject('donations')

const props = defineProps({
  width: Number,
  height: Number
})

// Variables para almacenar la suma total de 'quanty' y 'spent'
const totalDonations = ref(0)
const totalSpent = ref(0)

onMounted(async () => {
  setTimeout(() => {
    if (loadingDonations.value) {
      loadDonations()
    }
  }, 100)
})

// Observa los cambios en `donations`
watch(
  donations,
  (newValue) => {
    if (newValue) {
      // Asegúrate de que 'newValue' es un array y tiene elementos
      if (Array.isArray(newValue) && newValue.length > 0) {
        // Calcula la suma total de las donaciones
        totalDonations.value = newValue.reduce((total, donation) => {
          return total + (donation.quanty || 0) // Asegúrate de que 'quanty' tiene un valor por defecto
        }, 0)

        // Calcula la suma total de los gastos de las donaciones
        totalSpent.value = newValue.reduce((total, donation) => {
          return total + (donation.spent || 0) // Asegúrate que 'spent' tiene un valor por defecto
        }, 0)
      }
    }
  },
  { immediate: true }
)

// Calcula la diferencia entre spent y quanty
const difference = computed(() => totalDonations.value - totalSpent.value)

// Definimos chartData como un computed que retorna un arreglo con las sumas totales
const chartData = computed(() => {
  return [totalDonations.value, totalSpent.value]
})

const colorScheme = computed(() => useColorSchemeStore().colorScheme)
const darkMode = computed(() => useDarkModeStore().darkMode)

const data = computed(() => {
  return {
    labels: ['Donaciones', 'Gastos'],
    datasets: [
      {
        data: chartData.value,
        backgroundColor: darkMode.value
          ? [getColor('primary'), getColor('success')]
          : colorScheme.value
            ? [getColor('primary', 0.6), getColor('success', 0.6)]
            : '',
        hoverBackgroundColor: darkMode.value
          ? [getColor('primary', 0.8), getColor('success', 0.8)]
          : colorScheme.value
            ? [getColor('primary', 0.6), getColor('success', 0.6)]
            : '',
        borderWidth: 1,
        borderColor: darkMode.value
          ? [getColor('primary', 0.8), getColor('success', 0.8)]
          : colorScheme.value
            ? [getColor('primary', 0.6), getColor('success', 0.6)]
            : ''
      }
    ]
  }
})

const options = computed(() => {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    cutout: '90%'
  }
})
</script>

<template>
  <div>
    <Chart
      v-if="!loadingDonations"
      type="doughnut"
      :width="props.width"
      :height="props.height"
      :data="data"
      :options="options"
    />

    <div class="flex flex-row justify-center items-center w-full h-[200px]" v-if="loadingDonations">
      <div class="w-32">
        <LoadingIcon icon="three-dots" color="gray" />
      </div>
    </div>

    <Table.Tbody v-if="!loadingDonations">
      <Table.Tr class="[&_td]:last:border-b-0">
        <Table.Td colspan="4" class="py-8 text-center text-xs font-bold">
          <!-- Cambiado a text-xs -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <div class="mt-1 text-[28px] font-medium text-slate-600/90 dark:text-slate-200">
                <!-- Cambiado a text-sm -->
                ${{ difference }}
              </div>
              <div class="text-[16px] mt-4 text-slate-500 dark:text-slate-200">Donación</div>
              <div class="text-[16px] text-slate-500 dark:text-slate-200">disponible</div>
            </div>
          </div>
        </Table.Td>
      </Table.Tr>
    </Table.Tbody>
  </div>
</template>
