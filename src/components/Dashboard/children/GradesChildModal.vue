<script setup>
import { Dialog } from '@/components/base/Headless'
import Button from '@/components/base/Button'
import Lucide from '@/components/base/Lucide'
import { computed, inject, onMounted, watch } from 'vue'

// Props del componente padre
const props = defineProps({
  ModalGradesChild: Boolean,
  setModalGradesChild: Function,
  infoChild: Object
})

const { performance, loadingPerformance, errorPerformance, loadPerformance } = inject('performance')

onMounted(() => {
  loadPerformance()
})

const grades = computed(() => {

  if (!performance.value || !props.infoChild?.id) {
    return [];
  }

  return performance.value
    .filter(perf => perf.child?.id === props.infoChild.id)
    .map(perf => ({
      activity: perf.activity?.name || 'Actividad desconocida',
      score: perf.value || 0
    }));
});


const notaMax = 10;

// Método para cerrar el modal
const closeModal = () => {
  if (props.loadingPerformance) return
  props.setModalGradesChild({ open: false })
}
</script>


<template>
  <Dialog size="xl" :open="ModalGradesChild" @close="closeModal">
    <Dialog.Panel class="text-center flex flex-col">
      <!-- Encabezado del modal -->
      <div
        class="flex flex-row px-10 py-5 justify-between items-center w-full dark:border-slate-600 border-slate-300 border-b">
        <h1 class="text-2xl font-bold text-black dark:text-slate-200">
          Información de {{ props.infoChild?.name || 'el niño' }}
        </h1>
        <Lucide icon="XCircle" class="w-10 h-full text-danger cursor-pointer dark:text-red-500" @click="closeModal" />
      </div>

      <h2 class="text-2xl font-bold text-black dark:text-slate-200">Calificaciones</h2>

      <div class="flex flex-col">
        <div class="dark:border-slate-600 border-slate-300 border-b max-h-[70vh] overflow-y-auto scrollbar-custom">
          <div
            class="flex flex-col md:flex-row justify-between py-5 my-5 sm:flex mx-5 px-5 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700">
            <table class="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th
                    class="text-center font-bold text-slate-700 dark:text-slate-200 border-b dark:border-slate-600 py-2">
                    Actividad
                  </th>
                  <th
                    class="text-center font-bold text-slate-700 dark:text-slate-200 border-b dark:border-slate-600 py-2">
                    Calificación
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(grades, index) in grades" :key="index"
                  class="odd:bg-gray-300 even:bg-white dark:odd:bg-slate-800 dark:even:bg-slate-700">
                  <td class="border-t border-slate-200/60 dark:border-slate-700 py-2  text-black dark:text-slate-200">
                    {{ grades.activity }}
                  </td>
                  <td class="border-t border-slate-200/60 dark:border-slate-700 py-2  text-black dark:text-slate-200">
                    {{ grades.score }}/ {{ notaMax }}
                  </td>
                </tr>
                <tr v-if="grades.length === 0">
                  <td colspan="2" class="text-center text-black dark:text-slate-200 py-4">
                    No hay calificaciones disponibles para este niño.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>
</template>
