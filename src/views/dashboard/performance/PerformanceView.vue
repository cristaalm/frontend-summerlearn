<script setup>
import { ref, onMounted, inject, computed, watch } from 'vue'
import { updateScore, saveAllScores } from '@/hooks/performance/performanceChild/useCalChild.js' // Importa las funciones
import {
  useFilter,
  usePagination,
  usePerformance,
  useDialogDelete,
  useExportExcel,
  useExportPDF
} from '@/hooks/performance/'
import formatDate from '@/logic/formatDate'
import { FormInput, FormSelect } from '@/components/base/Form'
import { Menu, Popover, Dialog } from '@/components/base/Headless'
import { useRouter } from 'vue-router'
import LoadingIcon from '@/components/base/LoadingIcon'
import Pagination from '@/components/base/Pagination'
import Button from '@/components/base/Button'
import Lucide from '@/components/base/Lucide'
import Table from '@/components/base/Table'

const { performance, loadingPerformance, errorPerformance, loadPerformance } = inject('performance')
const { searchQuery, selectedStatus, filteredItems, activeFilters } = useFilter(performance)
const { currentPage, pageSize, totalPages, paginatedItems, changePage, changePageSize } =
  usePagination(filteredItems)
const { dialogStatusDelete, openDeleteModal, confirmDeleteProgram, closeDeleteProgram } =
  useDialogDelete({ performance })
const { loadExportExcel, loadingExportExcel } = useExportExcel()
const { loadExportPDF, loadingExportPDF } = useExportPDF()
const router = useRouter()
// Estado reactivo para nota y valid
const nota = ref({})
const valid = ref({})
const loadings = ref({})
const notamax = 10

// Actualización de isSaveButtonEnabled
const isSaveButtonEnabled = computed(() => {
  // validamos que las notas locales sean diferentes a las de la base de datos
  return Object.keys(nota.value).some((id) => {
    const index = performance.value.findIndex((p) => p.id === parseInt(id))
    if (nota.value[id] == '') {
      nota.value[id] = null
    }
    return performance.value[index].value !== nota.value[id] && valid.value[id]
  })
})

const handleInput = (id) => {
  const inputValue = nota.value[id]

  // Si el valor está vacío o es nulo
  if (inputValue === null || inputValue === '') {
    valid.value[id] = false
  } else {
    // Validación para valores decimales entre 0 y 10
    const decimalPattern = /^(10(\.0+)?|[0-9](\.[0-9]{0,2})?)$/ // Solo acepta números entre 0 y 10, con hasta 2 decimales
    if (decimalPattern.test(inputValue)) {
      valid.value[id] = true
    } else {
      valid.value[id] = false
      // Si no es válido, eliminamos el último carácter ingresado
      nota.value[id] = inputValue.slice(0, -1)
    }
  }

  console.log(valid.value)
}

// Actualiza o envía los datos de la calificación individual
const updateScoreHandler = async (id) => {
  if (valid.value[id]) {
    loadings.value[id] = true
    await updateScore(id, nota.value[id]) // Usa la función importada
    loadings.value[id] = false
  }
  // Buscamos la calificación guardada, para actualizarla
  const index = performance.value.findIndex((p) => p.id === id)
  if (index || index == 0) {
    performance.value[index].value = nota.value[id]
    nota.value[id] = performance.value[index].value
    valid.value[id] = false
  }
  loadPerformance()
}

// Función para guardar todas las calificaciones válidas
const saveAllHandler = async () => {
  const scores = Object.keys(nota.value)
    .filter((id) => valid.value[id])
    .map((id) => ({
      id: parseInt(id),
      grade: nota.value[id]
    }))
  // buscamos todas las calificaciones que se van a guardar, para cambiar el estado de carga
  scores.forEach((score) => {
    loadings.value[score.id] = true
  })
  await saveAllScores(scores, performance, nota, valid) // Usa la función importada
  // Actualizamos el estado de carga de todas las calificaciones
  scores.forEach((score) => {
    loadings.value[score.id] = false
  })
  loadPerformance()
}

// Cargar datos y asignar valores a `nota` y `valid`
onMounted(() => {
  loadPerformance().then(() => {
    if (performance.value) {
      performance.value.forEach((item) => {
        nota.value[item.id] = item.value
        valid.value[item.id] = item.value !== null
      })
    }
  })
})
</script>

<template>
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12">
      <div class="mt-3.5">
        <div class="flex flex-col box box--stacked" id="table-performance">
          <div class="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
            <div class="relative">
              <Lucide
                icon="Search"
                class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500"
              />
              <FormInput
                v-model="searchQuery"
                type="text"
                placeholder="Buscar nombre..."
                class="pl-9 sm:w-72 rounded-[0.5rem] dark:text-slate-200 dark:placeholder:text-slate-400"
              />
            </div>
            <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
              <Menu>
                <Menu.Button
                  :as="Button"
                  variant="outline-secondary"
                  :disabled="loadingExportExcel || loadingExportPDF"
                >
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
                        <Table.Td class="text-center">{{ performance.child.name }}</Table.Td>
                        <Table.Td class="text-center">{{ performance.activity.name }}</Table.Td>
                        <Table.Td class="text-center">
                          <div v-if="performance.value == null">
                            <input
                              type="text"
                              class="w-20 rounded-lg border-gray-200 border-2 text-center"
                              @input="handleInput(performance.id)"
                              v-model="nota[performance.id]"
                            />/{{ notamax }}
                          </div>
                          <!-- ponemos un color al texto segun la nota -->
                          <div
                            v-else
                            :class="{
                              'text-red-500': performance.value < 5,
                              'text-yellow-500': performance.value >= 5 && performance.value < 7,
                              'text-green-500': performance.value >= 7
                            }"
                          >
                            {{ performance.value }}/{{ notamax }}
                          </div>
                        </Table.Td>
                        <Table.Td class="text-center">
                          <Button
                            v-if="performance.value == null"
                            variant="outline-success"
                            :class="`w-full px-10 md:w-auto font-bold ${
                              loadings[performance.id]
                                ? 'border-warning text-warning'
                                : valid[performance.id] && performance.value == null
                                  ? 'border-green text-green dark:text-slate-200'
                                  : 'border-gray-500 text-gray-500'
                            }`"
                            :disabled="
                              !valid[performance.id] ||
                              loadings[performance.id] ||
                              performance.value != null
                            "
                            @click="() => updateScoreHandler(performance.id)"
                          >
                            <Lucide
                              v-if="!loadings[performance.id] && performance.value == null"
                              icon="Check"
                              class="stroke-[1.3] w-4 h-4 mr-2"
                            />
                            <LoadingIcon
                              v-if="loadings[performance.id] && performance.value == null"
                              icon="tail-spin"
                              class="stroke-[1.3] w-4 h-4 mr-2 -ml-2"
                              color="black"
                            />

                            <span v-if="!loadings[performance.id] && performance.value == null"
                              >Calificar</span
                            >
                            <span v-else-if="loadings[performance.id] && performance.value == null"
                              >Calificando</span
                            >
                          </Button>
                          <span
                            v-else
                            class="flex flex-row items-center justify-center text-success"
                          >
                            <Lucide icon="CheckCircle" class="stroke-[1.3] w-4 h-4 mr-2" />
                            Calificado
                          </span>
                        </Table.Td>
                      </Table.Tr>
                    </template>
                  </Table.Tbody>

                  <Table.Tbody
                    v-else-if="
                      !loadingPerformance && !errorPerformance && !paginatedItems.length > 0
                    "
                  >
                    <Table.Tr>
                      <Table.Td class="text-center" colspan="4">
                        <div class="text-red-500">No se encontraron resultados</div>
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>

                  <Table.Tbody v-else-if="loadingPerformance">
                    <Table.Tr>
                      <Table.Td class="text-center" colspan="4">
                        <LoadingIcon icon="tail-spin" class="stroke-[1.3] w-4 h-4" color="black" />
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>

                  <Table.Tbody v-else-if="errorPerformance">
                    <Table.Tr>
                      <Table.Td class="text-center" colspan="4">
                        <div class="text-red-500">
                          Error al cargar los datos, intentelo mas tarde.
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </div>

              <!-- PAGINATION AND SAVE ALL BUTTON -->
              <div
                class="flex flex-col-reverse flex-wrap items-center p-5 flex-reverse gap-y-2 sm:flex-row"
              >
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
                  :class="`${
                    Object.values(loadings).some((v) => v === true) || !isSaveButtonEnabled
                      ? 'bg-white text-black'
                      : 'bg-white text-blue-600 border-blue-900 hover:bg-blue-300'
                  }
                  `"
                  :disabled="
                    (() => {
                      return Object.values(loadings).some((v) => v === true) || !isSaveButtonEnabled
                    })()
                  "
                  @click="saveAllHandler"
                >
                  <Lucide
                    v-if="
                      (() => {
                        return !Object.values(loadings).some((v) => v === true)
                      })()
                    "
                    icon="Check"
                    class="stroke-[1.3] w-4 h-4 mr-2"
                  />
                  <LoadingIcon
                    v-else
                    icon="tail-spin"
                    class="stroke-[1.3] w-4 h-4 mr-2"
                    color="black"
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
