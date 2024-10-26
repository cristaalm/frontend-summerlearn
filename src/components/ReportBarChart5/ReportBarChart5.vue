<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { type ChartData, type ChartOptions } from "chart.js/auto";
import { useColorSchemeStore } from "@/stores/color-scheme";
import { useDarkModeStore } from "@/stores/dark-mode";
import Chart from "@/components/base/Chart";
import { getColor } from "@/utils/colors";
import _ from "lodash";
import { useDonations } from '@/hooks/donations/';

const props = defineProps<{
  width?: number;
  height?: number;
  filter: string;
}>();

const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const darkMode = computed(() => useDarkModeStore().darkMode);

// Estado para las donaciones
const { donations, loadDonations } = useDonations();
const chartData = ref<ChartData>({
  labels: [],
  datasets: [],
});

// Cargar donaciones al montar el componente
onMounted(() => {
  loadDonations();
});

// Función para generar los datos dinámicamente según el filtro
const generateChartData = (filter: string) => {
  const groupedData = groupDonationsByTime(filter);
  const labels = Object.keys(groupedData);
  const dataQuanty = labels.map((label) => groupedData[label].quanty);
  const dataSpent = labels.map((label) => groupedData[label].spent);

  chartData.value = {
    labels,
    datasets: [
      {
        label: "Total Donaciones",
        data: dataQuanty,
        borderWidth: 1,
        borderColor: darkMode.value ? getColor('primary', 0.8) : getColor("primary", 0.7),
        backgroundColor: darkMode.value ? getColor('primary', 0.8) : getColor("primary", 0.35),
      },
      {
        label: "Total Gastado",
        data: dataSpent,
        borderWidth: 1,
        borderColor: darkMode.value ? getColor('success', 0.8) : getColor("success", 0.7),
        backgroundColor: darkMode.value ? getColor('success', 0.8) : getColor("success", 0.35),
      },
    ],
  };
};

// Agrupar donaciones por día, semana o mes
const groupDonationsByTime = (filter: string) => {
  const grouped: Record<string, { quanty: number; spent: number }> = {};
  const currentDate = new Date();
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  if (filter === "daily") {
    // Generar los días del mes actual (solo número de día)
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const dayLabel = `${day}`;
      grouped[dayLabel] = { quanty: 0, spent: 0 };
    }
  } else if (filter === "weekly") {
    // Generar las cuatro semanas del mes actual (etiqueta como "Semana X")
    for (let week = 1; week <= 4; week++) {
      const weekLabel = `Semana ${week}`;
      grouped[weekLabel] = { quanty: 0, spent: 0 };
    }
  } else if (filter === "monthly") {
    // Generar los 12 meses del año actual (solo nombre del mes)
    for (let month = 0; month < 12; month++) {
      const monthLabel = monthNames[month];
      grouped[monthLabel] = { quanty: 0, spent: 0 };
    }
  }

  // Sumar las donaciones a los grupos generados
  donations.value.forEach((donation) => {
    const date = new Date(donation.date);
    // Aseguramos que la fecha esté correctamente interpretada sin desfase
    const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    let key;

    if (filter === "daily") {
      key = `${adjustedDate.getDate()}`;
    } else if (filter === "weekly") {
      const weekNumber = Math.ceil((adjustedDate.getDate() + 1) / 7);
      key = `Semana ${weekNumber}`;
    } else if (filter === "monthly") {
      key = monthNames[adjustedDate.getMonth()];
    }

    // Verificar que el grupo existe en el objeto `grouped`
    if (grouped[key]) {
      grouped[key].quanty += Number(donation.quanty) || 0;
      grouped[key].spent += Number(donation.spent) || 0;
    }
  });

  return grouped;
};

// Verificar y actualizar los datos del gráfico cuando cambie el filtro
watch(
  () => props.filter,
  (newFilter) => {
    console.log("Opción seleccionada:", newFilter);
    generateChartData(newFilter); // Generar nuevos datos según el filtro
  },
  { immediate: true }
);

const options = computed<ChartOptions>(() => {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
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
          color: darkMode.value ? getColor('slate.700', 0.7) : getColor('slate.200', 0.7),
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
  <Chart type="bar" :width="props.width" :height="props.height" :data="chartData" :options="options" />
</template>
