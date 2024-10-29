<script setup>
import { ref, watch } from 'vue';
import Lucide from '@/components/base/Lucide';
import ReportBarChart5 from "@/components/ReportBarChart5";
import { FormSelect } from '@/components/base/Form'

const generalReportFilter = ref("");
const isChartLoaded = ref(false); // Estado para controlar si la gráfica ha cargado

// Función para manejar el cambio en el select
const handleFilterChange = (event) => {
  generalReportFilter.value = event.target.value;
  console.log('Filtro seleccionado:', generalReportFilter.value); // Para verificar el valor seleccionado
};

// Observador para verificar cuando el filtro cambia y simular la carga de la gráfica

</script>

<template>
  <div class="flex flex-col col-span-12 p-5 box box--stacked">
    <div class="flex flex-col lg:items-center lg:flex-row gap-y-5">
      <div class="flex flex-col sm:items-center sm:flex-row gap-x-3 gap-y-2">
        <div class="relative">
          <Lucide icon="CalendarCheck2"
            class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] dark:text-slate-200" />
          <FormSelect class="sm:w-55 pl-9 dark:text-slate-200 dark:placeholder:text-slate-400"
            @change="handleFilterChange">
            <option value="daily" id="primero">Días</option>
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensual</option>
          </FormSelect>
        </div>
      </div>
    </div>

    <!-- Pasar el valor seleccionado al componente ReportBarChart5 -->
    <div class="mb-1 mt-7">
      <ReportBarChart5 :height="220" :filter="generalReportFilter" @chart-loaded="isChartLoaded = true" />
    </div>

    <!-- Mostrar la parte de donaciones y gastos solo si la gráfica ha cargado -->
    <div v-if="isChartLoaded" class="flex flex-wrap items-center justify-center mt-5 gap-y-3 gap-x-5">
      <div class="flex items-center text-slate-500 dark:text-slate-200">
        <div class="w-2 h-2 mr-2 border rounded-full border-primary/60 bg-primary/60 dark:bg-blue-500"></div>
        Total de ingresos
      </div>
      <div class="flex items-center text-slate-500 dark:text-slate-200">
        <div class="w-2 h-2 mr-2 border rounded-full border-slate-500/60 bg-slate-500/60 dark:bg-success"></div>
        Total de egresos
      </div>
    </div>
  </div>
</template>
