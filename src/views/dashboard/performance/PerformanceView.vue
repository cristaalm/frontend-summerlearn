<script setup>
import { ref, onMounted, inject, computed, watch } from 'vue';
import { updateScore, saveAllScores } from '@/hooks/performance/performanceChild/useCalChild.js'; // Importa las funciones
import { useFilter, usePagination, usePerformance, useDialogDelete, useExportExcel, useExportPDF } from '@/hooks/performance/';
import formatDate from '@/logic/formatDate';
import { FormInput, FormSelect } from '@/components/base/Form';
import { Menu, Popover, Dialog } from '@/components/base/Headless';
import { useRouter } from 'vue-router';
import LoadingIcon from '@/components/base/LoadingIcon';
import Pagination from '@/components/base/Pagination';
import Button from '@/components/base/Button';
import Lucide from '@/components/base/Lucide';
import Table from '@/components/base/Table';

const { performance, loadingPerformance, errorPerformance, loadPerformance } = inject('performance');
const { searchQuery, selectedStatus, filteredItems, activeFilters } = useFilter(performance);
const { currentPage, pageSize, totalPages, paginatedItems, changePage, changePageSize } = usePagination(filteredItems);
const { dialogStatusDelete, openDeleteModal, confirmDeleteProgram, closeDeleteProgram } = useDialogDelete({ performance });
const { loadExportExcel, loadingExportExcel } = useExportExcel();
const { loadExportPDF, loadingExportPDF } = useExportPDF();
const router = useRouter();
// Estado reactivo para nota y valid
const nota = ref({});
const valid = ref({});
const token = localStorage.getItem('access_token');
const notamax = 10;
// Actualización de isSaveButtonEnabled
const isSaveButtonEnabled = computed(() => {
  return Object.values(valid.value).some((v) => v === true);
});

const handleInput = (id) => {
  const inputValue = nota.value[id];

  // Si el valor está vacío o es nulo
  if (inputValue === null || inputValue === '') {
    valid.value[id] = false;
  } else {
    // Validación para valores decimales entre 0 y 10
    const decimalPattern = /^(10(\.0+)?|[0-9](\.[0-9]{0,2})?)$/; // Solo acepta números entre 0 y 10, con hasta 2 decimales
    if (decimalPattern.test(inputValue)) {
      valid.value[id] = true;
    } else {
      valid.value[id] = false;
      // Si no es válido, eliminamos el último carácter ingresado
      nota.value[id] = inputValue.slice(0, -1);
    }
  }
};


// Actualiza o envía los datos de la calificación individual
const updateScoreHandler = async (id) => {
  if (valid.value[id]) {
    await updateScore(id, nota.value[id]); // Usa la función importada
  }
  // Buscamos la calificación guardada, para actualizarla
  const index = performance.value.findIndex((p) => p.id === id)
  if (index || index == 0){
    performance.value[index].value = nota.value[id];
  }
  loadPerformance();
};

// Función para guardar todas las calificaciones válidas
const saveAllHandler = async () => {
  const scores = Object.keys(nota.value).filter(id => valid.value[id]).map(id => ({
    id: parseInt(id),
    grade: nota.value[id]
  }));
  await saveAllScores(scores, performance, nota); // Usa la función importada
  loadPerformance();
};

// Cargar datos y asignar valores a `nota` y `valid`
onMounted(() => {
  loadPerformance().then(() => {
    if (performance.value) {
      performance.value.forEach(item => {
        nota.value[item.id] = null;  // Inicializar los valores en null
        valid.value[item.id] = false; // Inicializar como inválidos
      });
    }
  });
});

</script>




<template>
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12">
      <!-- HEADER -->
      <!-- <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div class="text-base font-medium group-[.mode--light]:text-white">Desempeños</div>
        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
          <Button variant="primary" @click="() => router.push({ name: 'addPerformance' })">
            <Lucide icon="PenLine" class="stroke-[1.3] w-4 h-4 mr-2" /> Agregar nuevo desempeño
          </Button>
        </div>
      </div> -->
      <!-- SEARCH AND FILTER -->
      <div class="mt-3.5">
        <div class="flex flex-col box box--stacked" id="table-performance">
          <div class="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
            <div class="relative">
              <Lucide icon="Search" class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500" />
              <FormInput v-model="searchQuery" type="text" placeholder="Buscar nombre..." class="pl-9 sm:w-72 rounded-[0.5rem] dark:text-slate-200 dark:placeholder:text-slate-400" />
            </div>
            <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
              <Menu>
                <Menu.Button :as="Button" variant="outline-secondary" :disabled="loadingExportExcel || loadingExportPDF">
                  <Lucide icon="Download" class="stroke-[1.3] w-4 h-4 mr-2" />
                  Exportar
                  <Lucide icon="ChevronDown" class="stroke-[1.3] w-4 h-4 ml-2" />
                </Menu.Button>
              </Menu>
            </div>
          </div>


      <!-- SEARCH AND FILTER -->
      <div class="mt-3.5">
        <div class="flex flex-col box box--stacked" id="table-performance">
          <!-- TABLE -->
          <div class="overflow-auto xl:overflow-visible">
            <Table class="border-b border-slate-200/60">
              <Table.Thead>
                <Table.Tr>
                  <Table.Td class="text-center">Nombre</Table.Td>
                  <Table.Td class="text-center">Actividad</Table.Td>
                  <Table.Td class="text-center">Calificación</Table.Td>
                  <Table.Td class="text-center">Acción</Table.Td>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody v-if="!loadingPerformance && !errorPerformance">
                <template v-for="performance in paginatedItems" :key="performance.id">
                  <Table.Tr>
                    <Table.Td  class="text-center">{{ performance.child.name }}</Table.Td>
                    <Table.Td  class="text-center">{{ performance.activity.name }}</Table.Td>
                    <Table.Td  class="text-center">
                      <div v-if="performance.value >= 0">
                        <input 
                          type="text" 
                          class="w-20 rounded-lg border-gray-200 border-2 text-center" 
                          :disabled="true"
                          :value="performance.value"
                        />/{{ notamax }}
                      </div>
                      <div v-else>
                        <input 
                        v-model="nota[performance.id]" 
                        @input="handleInput(performance.id)" 
                        type="text" 
                        class="w-20 rounded-lg text-center"
                        :class="{'border-blue-600 border-2': nota[performance.id], 'border-gray-300': !nota[performance.id]}" 
                        :value="nota[performance.id]"
                      /> 
                      /{{ notamax }}
                      </div>
                    </Table.Td>
                    <Table.Td  class="text-center">
                      <Button 
                        variant="outline-success"
                        :class="[
                          'w-full px-10 md:w-auto font-bold',
                          !valid[performance.id] || loadingPerformance || performance.value >= 1 ? 'border-gray-500 text-gray-500' : 'border-green text-green dark:text-slate-200'
                        ]"
                        :disabled="!valid[performance.id] || performance.value >= 1"
                        @click="() => updateScoreHandler(performance.id)"
                      >
                        <LoadingIcon 
                          v-if="loadingPerformance" 
                          icon="tail-spin" 
                          class="stroke-[1.3] w-4 h-4 mr-2 -ml-2"
                          color="black" 
                        />
                        <Lucide 
                          v-if="!loadingPerformance" 
                          icon="Check" 
                          class="stroke-[1.3] w-4 h-4 mr-2" 
                        />
                        <span v-if="performance.value >= 0">Calificar</span>
                        <span v-else-if="loadPerformance">Calificando ...</span>
                        <span v-else>Calificado</span>
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                </template>
              </Table.Tbody>
            </Table>
          </div>
          
          <!-- PAGINATION AND SAVE ALL BUTTON -->
          <div class="flex flex-col-reverse flex-wrap items-center p-5 flex-reverse gap-y-2 sm:flex-row">
            <Pagination class="flex-1 w-full mr-auto sm:w-auto">
              <Pagination.Link @click="changePage(1)">
                <Lucide icon="ChevronsLeft" class="w-4 h-4" />
              </Pagination.Link>
              <Pagination.Link @click="changePage(currentPage - 1)">
                <Lucide icon="ChevronLeft" class="w-4 h-4" />
              </Pagination.Link>
              <template v-for="page in totalPages" :key="page">
                <Pagination.Link :active="page === currentPage" @click="changePage(page)">
                  {{ page }}
                </Pagination.Link>
              </template>
              <Pagination.Link @click="changePage(currentPage + 1)">
                <Lucide icon="ChevronRight" class="w-4 h-4" />
              </Pagination.Link>
            </Pagination>

            <Button 
              variant="outline-primary"
              :class="{
                'bg-white text-black cursor-not-allowed': !isSaveButtonEnabled, 
                'bg-white text-blue-600 border-blue-900 hover:bg-blue-300': isSaveButtonEnabled
              }"
              :disabled="!isSaveButtonEnabled"
              @click="saveAllHandler"
            >
            <Lucide 
              v-if="!loadingPerformance" 
              icon="Check" 
              class="stroke-[1.3] w-4 h-4 mr-2" 
            />
              Guardar Todos
          </Button>

          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>
