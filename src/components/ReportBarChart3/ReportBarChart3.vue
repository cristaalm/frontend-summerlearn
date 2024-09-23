<script setup lang="ts">
import { computed } from "vue";
import { type ChartData, type ChartOptions } from "chart.js/auto";
import { useColorSchemeStore } from "@/stores/color-scheme";
import { useDarkModeStore } from "@/stores/dark-mode";
import Chart from "@/components/Base/Chart";
import { getColor } from "@/utils/colors";

const props = defineProps<{
  width?: number;
  height?: number;
}>();

const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const darkMode = computed(() => useDarkModeStore().darkMode);

const data = computed<ChartData>(() => {
  return {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        barPercentage: 0.38,
        borderRadius: 2,
        data: [4, 7, 5, 4, 9, 7, 5],
        borderWidth: 1,
        borderColor: colorScheme.value ? getColor("theme.1", 0.7) : "",
        backgroundColor: colorScheme.value ? getColor("theme.1", 0.3) : "",
      },
    ],
  };
});

const options = computed<ChartOptions>(() => {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: getColor("slate.500", 0.8),
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
          beginAtZero: true,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };
});
</script>

<template>
  <Chart
    type="bar"
    :width="props.width"
    :height="props.height"
    :data="data"
    :options="options"
  />
</template>
