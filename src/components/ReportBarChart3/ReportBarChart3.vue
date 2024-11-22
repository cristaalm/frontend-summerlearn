<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { type ChartData, type ChartOptions } from 'chart.js/auto'
import { useColorSchemeStore } from '@/stores/color-scheme'
import { useDarkModeStore } from '@/stores/dark-mode'
import Chart from '@/components/base/Chart'
import { getColor } from '@/utils/colors'
import { useWeeklyDonations } from '@/hooks/donations/'

const props = defineProps<{
  width?: number
  height?: number
}>()

const { donationsWeek, loadingWeek, loadDonationsWeek, errorWeek } = useWeeklyDonations()
const colorScheme = computed(() => useColorSchemeStore().colorScheme)
const darkMode = computed(() => useDarkModeStore().darkMode)

onMounted(() => {
  loadDonationsWeek()
})

const data = computed<ChartData>(() => {
  return {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        barPercentage: 0.38,
        borderRadius: 2,
        data: donationsWeek.value, // Verifica que donationsWeek.value esté bien alineado
        borderWidth: 1,
        borderColor: darkMode ? getColor('slate.400', 0.8) : colorScheme.value ? getColor('theme.1', 0.7) : '',
        backgroundColor: darkMode ? getColor('slate.400', 0.8) : colorScheme.value ? getColor('theme.1', 0.7) : ''
      }
    ]
  }
})

const options = computed<ChartOptions>(() => {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? getColor('slate.200', 0.8) : getColor('slate.500', 0.8)
        },
        grid: {
          display: false
        },
        border: {
          display: false
        }
      },
      y: {
        ticks: {
          display: false,
          beginAtZero: true
        },
        grid: {
          display: false
        },
        border: {
          display: false
        }
      }
    }
  }
})
</script>

<template>
  <Chart type="bar" :width="props.width" :height="props.height" :data="data" :options="options" />
</template>
