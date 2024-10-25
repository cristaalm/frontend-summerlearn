<script setup lang="ts">
import { computed } from "vue";
import { type ChartData, type ChartOptions } from "chart.js/auto";
import { useColorSchemeStore } from "@/stores/color-scheme";
import { useDarkModeStore } from "@/stores/dark-mode";
import Chart from "@/components/base/Chart";
import { getColor } from "@/utils/colors";
import _ from "lodash";

const props = defineProps<{
  width?: number;
  height?: number;
}>();

const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const darkMode = computed(() => useDarkModeStore().darkMode);

const data = computed<ChartData>(() => {
  return {
    labels: Array.from({ length: 15 }, (_, index) => index + 15),
    datasets: [
      {
        categoryPercentage: 0.4,
        barPercentage: 0.8,
        borderRadius: 2,
        data: Array.from({ length: 15 }, (index) => _.random(1, 1000)),
        borderWidth: 1,
        borderColor: darkMode.value ? getColor('primary', 0.8) : colorScheme.value ? getColor("primary", 0.7) : "",
        backgroundColor: darkMode.value ? getColor('primary', 0.8) : colorScheme.value ? getColor("primary", 0.35) : "",
      },
      {
        categoryPercentage: 0.4,
        barPercentage: 0.8,
        borderRadius: 2,
        data: Array.from({ length: 15 }, (index) => _.random(1, 1000)),
        borderWidth: 1,
        borderColor: darkMode.value ? getColor('success', 0.8) : colorScheme.value ? getColor("success", 0.7) : "",
        backgroundColor: darkMode.value ? getColor('success', 0.8) : colorScheme.value ? getColor("success", 0.35) : "",
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
          color: darkMode.value ? getColor('slate.200', 0.8) : getColor("slate.500", 0.7),
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
          autoSkipPadding: 15,
          color: darkMode.value ? getColor('slate.200', 0.8) : getColor("slate.500", 0.9),
          beginAtZero: true,
        },
        grid: {
          color: darkMode.value ? getColor('slate.700', 0.7) : getColor("slate.200", 0.7),
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
  <Chart type="bar" :width="props.width" :height="props.height" :data="data" :options="options" />
</template>
