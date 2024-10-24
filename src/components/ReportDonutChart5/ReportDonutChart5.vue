<script setup lang="ts">
import { computed } from "vue";
import { type ChartData, type ChartOptions } from "chart.js/auto";
import { useColorSchemeStore } from "@/stores/color-scheme";
import { useDarkModeStore } from "@/stores/dark-mode";
import Chart from "@/components/base/Chart";
import { getColor } from "@/utils/colors";

const props = defineProps<{
  width?: number;
  height?: number;
}>();

const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const darkMode = computed(() => useDarkModeStore().darkMode);

const chartData = [35, 35, 35];
const data = computed<ChartData>(() => {
  return {
    labels: ["31 - 50 Years old", ">= 50 Years old", "17 - 30 Years old"],
    datasets: [
      {
        data: chartData,
        backgroundColor: darkMode.value
          ? [
            getColor("primary"),
            getColor("success"),
            getColor("danger"),
          ]
          : colorScheme.value
            ? [
              getColor("primary", 0.6),
              getColor("success", 0.6),
              getColor("danger", 0.6),
            ]
            : "",
        hoverBackgroundColor: darkMode.value
          ? [
            getColor("primary", 0.8),
            getColor("success", 0.8),
            getColor("danger", 0.8),
          ]
          : colorScheme.value
            ? [
              getColor("primary", 0.6),
              getColor("success", 0.6),
              getColor("danger", 0.6),
            ]
            : "",
        borderWidth: 1,
        borderColor: darkMode.value
          ? [
            getColor("primary", 0.8),
            getColor("success", 0.8),
            getColor("danger", 0.8),
          ]
          : colorScheme.value
            ? [
              getColor("primary", 0.6),
              getColor("success", 0.6),
              getColor("danger", 0.6),
            ]
            : "",
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
    cutout: "90%",
  };
});
</script>

<template>
  <Chart type="doughnut" :width="props.width" :height="props.height" :data="data" :options="options" />
</template>
