<script setup>

import Lucide from '@/components/base/Lucide'
import ReportBarChart5 from "@/components/ReportBarChart5";
import Litepicker from "@/components/base/Litepicker";
import { FormSelect } from '@/components/base/Form'
import { ref } from 'vue'

const generalReportFilter = ref("");

</script>

<template>
    <div class="flex flex-col col-span-12 p-5 box box--stacked">
        <div class="flex flex-col lg:items-center lg:flex-row gap-y-5">
            <div class="flex flex-col sm:items-center sm:flex-row gap-x-3 gap-y-2">
                <div class="relative">
                    <Lucide icon="CalendarCheck2"
                        class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] dark:text-slate-200" />
                    <FormSelect class="sm:w-55 pl-9 dark:text-slate-200 dark:placeholder:text-slate-400">
                        <option value="custom-date">Seleccionar tiempo</option>
                        <option value="daily">Dias</option>
                        <option value="weekly">Semanal</option>
                        <option value="monthly">Mensual</option>
                        <option value="yearly">Anual</option>
                    </FormSelect>
                </div>
                <div class="relative">
                    <Lucide icon="Calendar" class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3]" />
                    <Litepicker v-model="generalReportFilter" :options="{
                        autoApply: false,
                        singleMode: false,
                        numberOfColumns: 2,
                        numberOfMonths: 2,
                        showWeekNumbers: true,
                        dropdowns: {
                            minYear: 1990,
                            maxYear: null,
                            months: true,
                            years: true,
                        },
                    }" class="pl-9 sm:w-64 rounded-[0.3rem] dark:text-slate-200" />
                </div>
            </div>
            <div class="flex items-center lg:ml-auto gap-3.5">
                <a href="" class="flex items-center text-slate-500 dark:text-slate-200">
                    <Lucide icon="Printer" class="w-3.5 h-3.5 stroke-[1.7] dark:text-slate-200" />
                    <div
                        class="ml-1.5 whitespace-nowrap underline decoration-dotted decoration-slate-300 underline-offset-[3px] dark:text-slate-200">
                        Exportar PDF
                    </div>
                </a>
                <a href="" class="flex items-center text-primary">
                    <Lucide icon="ExternalLink" class="w-3.5 h-3.5 stroke-[1.7] dark:text-blue-500" />
                    <div
                        class="ml-1.5 whitespace-nowrap underline decoration-dotted decoration-primary/30 underline-offset-[3px] dark:text-blue-500">
                        Reporte completo
                    </div>
                </a>
            </div>
        </div>
        <div class="mb-1 mt-7">
            <ReportBarChart5 :height="220" />
        </div>
        <div class="flex flex-wrap items-center justify-center mt-5 gap-y-3 gap-x-5">
            <div class="flex items-center text-slate-500 dark:text-slate-200">
                <div class="w-2 h-2 mr-2 border rounded-full border-primary/60 bg-primary/60 dark:bg-blue-500 ">
                </div>
                Total de ingresos
            </div>
            <div class="flex items-center text-slate-500 dark:text-slate-200">
                <div class="w-2 h-2 mr-2 border rounded-full border-slate-500/60 bg-slate-500/60 dark:bg-success">
                </div>
                Total de egresos
            </div>
        </div>
    </div>
</template>