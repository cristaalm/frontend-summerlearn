<script setup>
import { ref, computed, watch, onMounted, inject } from "vue";
import Chart from "@/components/base/Chart";
import { useColorSchemeStore } from "@/stores/color-scheme";
import { useDarkModeStore } from "@/stores/dark-mode";
import { getColor } from "@/utils/colors";
import LoadingIcon from '@/components/base/LoadingIcon';

const props = defineProps({
  width: Number,
  height: Number,
  filter: String, // Hacer que filter sea opcional
});

const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const darkMode = computed(() => useDarkModeStore().darkMode);

// Estado para las donaciones
const { donations, loadDonations, loadingDonations } = inject("donations");
const chartData = ref({
  labels: [],
  datasets: [],
});

// Cargar donaciones al montar el componente y generar datos del gráfico
onMounted(() => {
  setTimeout(() => {
    if (loadingDonations.value) {
      loadDonations();
    }
  }, 100);
});

watch(loadingDonations, (value) => {
  if (!value) {
    generateChartData(props.filter || "daily"); // Usar "daily" como default si no hay filtro
  }
});

// Función para generar los datos dinámicamente según el filtro
const generateChartData = (filter) => {
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
        backgroundColor: darkMode.value ? getColor('success', 0.8) : getColor('success', 0.35),
      },
    ],
  };
};

// Agrupar donaciones por día, semana o mes
const groupDonationsByTime = (filter) => {
  const grouped = {};
  const currentDate = new Date();
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  if (filter === "daily") {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const dayLabel = `${day}`;
      grouped[dayLabel] = { quanty: 0, spent: 0 };
    }
  } else if (filter === "weekly") {
    for (let week = 1; week <= 4; week++) {
      const weekLabel = `Semana ${week}`;
      grouped[weekLabel] = { quanty: 0, spent: 0 };
    }
  } else if (filter === "monthly") {
    for (let month = 0; month < 12; month++) {
      const monthLabel = monthNames[month];
      grouped[monthLabel] = { quanty: 0, spent: 0 };
    }
  }

  donations.value.forEach((donation) => {
    const date = new Date(donation.date);
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

    if (grouped[key]) {
      grouped[key].quanty += Number(donation.quanty) || 0;
      grouped[key].spent += Number(donation.spent) || 0;
    }
  });

  return grouped;
};

watch(
  () => props.filter,
  (newFilter) => {
    generateChartData(newFilter || "daily"); // Usar "daily" como default si no hay filtro
  },
  { immediate: true }
);

const options = computed(() => {
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
  <div>
    <div v-if="loadingDonations" class="w-full h-[220px] flex flex-row justify-center items-center">
      <div class="w-32">
        <LoadingIcon icon="three-dots" color="gray" />
      </div>
    </div>

    <p v-else class="text-gray-600 dark:text-gray-300 mt-2">
      Nota: La gráfica se cargará una vez que se hayan recuperado las donaciones.
    </p>

    <Chart v-else type="bar" class="cursor-pointer" :width="props.width" :height="props.height" :data="chartData"
      :options="options" />
  </div>
</template>
