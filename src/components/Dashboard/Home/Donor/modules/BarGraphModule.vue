<script setup>
import { onMounted, ref, watch } from 'vue'
import Lucide from '@/components/base/Lucide'
import ReportBarChart5 from '@/components/ReportBarChart5'
import { FormSelect } from '@/components/base/Form'
const generalReportFilter = ref('')
const isChartLoaded = ref(false)

const handleFilterChange = (event) => {
  generalReportFilter.value = event.target.value
}
</script>

<template>
  <div class="flex flex-col col-span-12 p-5 box box--stacked" id="graficaBarra">
    <div class="flex flex-col lg:items-center lg:flex-row gap-y-5">
      <div class="flex flex-col sm:items-center sm:flex-row gap-x-3 gap-y-2">
        <Lucide
          icon="CalendarCheck2"
          class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] dark:text-slate-200"
        />
        <FormSelect
          class="sm:w-55 pl-9 dark:text-slate-200 dark:placeholder:text-slate-400"
          @change="handleFilterChange"
          id="filtrarFecha"
        >
          <option value="daily">Días</option>
          <option value="weekly">Semanal</option>
          <option value="monthly">Mensual</option>
        </FormSelect>
      </div>
    </div>

    <div class="mb-1 mt-7" id="barraDonaciones">
      <ReportBarChart5 :height="220" :filter="generalReportFilter" />
    </div>

    <div
      v-if="isChartLoaded"
      class="flex flex-wrap items-center justify-center mt-5 gap-y-3 gap-x-5"
    >
      <div class="flex items-center text-slate-500 dark:text-slate-200">
        <div
          class="w-2 h-2 mr-2 border rounded-full border-primary/60 bg-primary/60 dark:bg-blue-500"
        ></div>
        Total de ingresos
      </div>
      <div class="flex items-center text-slate-500 dark:text-slate-200">
        <div
          class="w-2 h-2 mr-2 border rounded-full border-slate-500/60 bg-slate-500/60 dark:bg-success"
        ></div>
        Total de egresos
      </div>
    </div>
  </div>
</template>
