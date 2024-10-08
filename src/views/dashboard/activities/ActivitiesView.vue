<script setup>
import { useRouter } from 'vue-router'
import Lucide from '@/components/base/Lucide'
import { FormInput, FormTextarea, FormSelect } from '@/components/base/Form'
import { Menu, Popover, Dialog } from '@/components/base/Headless'
import Pagination from '@/components/base/Pagination'
import Table from '@/components/base/Table'
import LoadingIcon from '@/components/base/LoadingIcon'
import Button from '@/components/base/Button'
import {
  useFilter,
  // useFilterObjective,
  usePagination,
  usePaginationObjective,
  useActividades,
  useDialogDelete,
  useDialogDeleteObjective,
  useDialogObjective,
  useExportExcel,
  useExportPDF
} from '@/hooks/actividades/'
import { useObjectives } from '@/services/actividades/useObjectives'
import { ref, onMounted } from 'vue'
// useSetActividades, useSetObjectives
import { useSetObjectives } from '@/hooks/actividades/addActividades'
import { ToastNotification, useToast } from '@/components/ToastNotification/'
import { useValidationAddObjective } from '@/hooks/actividades/addActividades/useValidationAddObjective'
const { setObjectiveLoading, setObjectiveError, addObjective } = useSetObjectives()
const { actividades, loading, error, loadActividades } = useActividades()
const { objectives, loadingObjectives, errorObjectives, loadObjectives } = useObjectives()
const { searchQuery, selectedStatus, filteredItems, activeFilters } = useFilter(actividades)
// const {
//   searchQueryObjective,
//   selectedStatusObjective,
//   filteredItemsObjective,
//   activeFiltersObjective
// } = useFilterObjective(objectives)
const { currentPage, pageSize, totalPages, paginatedItems, changePage, changePageSize } =
  usePagination(filteredItems)

const { toastMessages, showToast } = useToast()
const { dialogStatusDelete, openDeleteModal, confirmDeleteActividad, closeDeleteActividad } =
  useDialogDelete({ showToast, actividades })
const {
  dialogStatusDeleteObjective,
  openDeleteModalObjective,
  confirmDeleteObjective,
  closeDeleteObjective
} = useDialogDeleteObjective({ showToast, objectives })
const {
  dialogStatusObjective,
  dialogStatusObjectiveAdd,
  openObjectiveModal,
  openObjectiveModalAdd,
  // confirmAddObjective,
  closeAddObjective,
  closeAddObjectiveCreate
} = useDialogObjective({ showToast, objectives })
const { status, description, valid, validate } = useValidationAddObjective()
const { loadExportExcel, loadingExportExcel } = useExportExcel({ showToast })
const { loadExportPDF, loadingExportPDF } = useExportPDF({ showToast })
const router = useRouter()
const id_actividad = ref(null) // Variable reactiva para guardar el ID

const handleObjective = async () => {
  if (valid.value) {
    const objective = {
      description: description.value,
      id: id_actividad.value // Usa el valor reactivo
    }
    await addObjective({ objective })
  }
  description.value = ''
  closeAddObjectiveCreate()
  loadObjectives(id_actividad.value)
}

// Función para guardar el ID
const guardarId = (id) => {
  id_actividad.value = id // Guarda el ID en la variable reactiva
  loadObjectives(id_actividad.value) // Pasa el valor del ID de la actividad
}

onMounted(() => {
  loadActividades()
})
</script>

<template>
  <div>
    <ToastNotification v-for="(message, index) in toastMessages" :key="index" :message="message" :index="index">
    </ToastNotification>
  </div>

  <!-- BEGIN: Modal Content -->
  <Dialog :open="dialogStatusDelete" @close="() => {
    dialogStatusDelete.value = false
  }
    ">
    <Dialog.Panel>
      <div class="p-5 text-center">
        <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-danger" />
        <div class="mt-5 text-3xl">¿Está seguro?</div>
        <div class="mt-2 text-slate-500">
          ¿Realmente desea eliminar este registro?
          <br />
          Este proceso no puede deshacerse.
        </div>
      </div>
      <div class="px-5 pb-8 text-center space-x-8">
        <Button type="button" variant="outline-secondary" @click="closeDeleteActividad" class="w-24 mr-1">
          Cancelar
        </Button>
        <Button type="button" variant="danger" class="w-24" @click="confirmDeleteActividad" ref="deleteButtonRef">
          Eliminar
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: Modal Content -->

  <!-- BEGIN: Modal Content Objective-->
  <Dialog :open="dialogStatusDeleteObjective" @close="() => {
    dialogStatusDeleteObjective.value = false
  }
    ">
    <Dialog.Panel>
      <div class="p-5 text-center">
        <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-danger" />
        <div class="mt-5 text-3xl">¿Está seguro?</div>
        <div class="mt-2 text-slate-500">
          ¿Realmente desea eliminar este objetivo?
          <br />
          Este proceso no puede deshacerse.
        </div>
      </div>
      <div class="px-5 pb-8 text-center space-x-8">
        <Button type="button" variant="outline-secondary" @click="closeDeleteObjective" class="w-24 mr-1">
          Cancelar
        </Button>
        <Button type="button" variant="danger" class="w-24" @click="confirmDeleteObjective" ref="deleteButtonRef">
          Eliminar
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: Modal Content Objective-->

  <!-- BEGIN: Super Large Modal Content dialogStatusObjective -->
  <Dialog size="xl" :open="dialogStatusObjective" @close="dialogStatusObjective.value = false">
    <Dialog.Panel class="w-full max-w-full">
      <div class="p-5 text-right">
        <div class="flex justify-end items-center space-x-4">
          <Button variant="primary"
            class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
            @click="() => {
              openObjectiveModalAdd(id_actividad)
            }
              ">
            <Lucide icon="PenLine" class="stroke-[1.3] w-4 h-4 mr-2" />
            Agregar objetivo
          </Button>
          <Lucide icon="XCircle" class="w-10 h-full mx-auto text-danger cursor-pointer" @click="closeAddObjective" />
        </div>
      </div>
      <!-- <div class="bold p-2">{{ id_actividad }}</div> -->
      <div class="px-5 pb-8 text-center">
        <div class="overflow-x-auto">
          <Table class="w-full border-b border-slate-200/60">
            <Table.Thead>
              <Table.Tr>
                <Table.Td class="py-4 font-medium border-t text-center bg-slate-50 border-slate-200/60 text-slate-500">
                  Objetivo
                </Table.Td>
                <Table.Td class="py-4 font-medium border-t text-center bg-slate-50 border-slate-200/60 text-slate-500">
                </Table.Td>
              </Table.Tr>
            </Table.Thead>

            <!-- loadingObjectives state -->
            <Table.Tbody v-if="loadingObjectives">
              <Table.Tr>
                <Table.Td colspan="2" class="py-8 text-center text-xl font-bold text-green-500">
                  <div class="flex flex-col justify-center items-center">
                    <LoadingIcon icon="tail-spin" class="h-8" color="black" />
                    <div class="mt-2">Cargando información...</div>
                  </div>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>

            <!-- errorObjectives state -->
            <Table.Tbody v-if="errorObjectives">
              <Table.Tr>
                <Table.Td colspan="2" class="py-8 text-center text-xl font-bold text-red-500">
                  Error al cargar la información, inténtelo más tarde
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>

            <!-- No results state -->
            <Table.Tbody v-if="!loadingObjectives && totalPages <= 0 && !errorObjectives">
              <Table.Tr>
                <Table.Td colspan="2" class="py-8 text-center text-xl font-bold text-amber-500">
                  No se encontraron objectives
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>

            <!-- Data table -->
            <Table.Tbody v-if="!loadingObjectives && paginatedItems.length > 0">
              <template v-for="objective in objectives" :key="objective.id">
                <Table.Tr class="[&_td]:last:border-b-0">
                  <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 text-center">
                    <div class="font-medium whitespace-nowrap">
                      {{ objective.description }}
                    </div>
                  </Table.Td>

                  <Table.Td class="relative py-4 border-dashed dark:bg-darkmode-600">
                    <div class="flex items-center justify-end">
                      <Menu class="h-5">
                        <Menu.Button class="w-5 h-5 text-black">
                          <Lucide icon="MoreVertical" class="w-5 h-5 stroke-black fill-black" />
                        </Menu.Button>

                        <Menu.Items class="w-40">
                          <Menu.Item class="text-warning">
                            <!-- <Menu.Item class="text-warning" @click="editActividad(objectives.id)"> -->
                            <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
                            Editar
                          </Menu.Item>

                          <!-- <Menu.Item class="text-danger"> -->
                          <Menu.Item class="text-danger" @click="openDeleteModalObjective(objective.id)">
                            <Lucide icon="Trash" class="w-4 h-4 mr-2" />
                            Eliminar
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    </div>
                  </Table.Td>
                </Table.Tr>
              </template>
            </Table.Tbody>
          </Table>
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: Modal Content -->

  <!-- BEGIN: Super Large Modal Content dialogStatusObjectiveAdd -->
  <Dialog size="xl" :open="dialogStatusObjectiveAdd" @close="dialogStatusObjectiveAdd.value = false">
    <Dialog.Panel class="w-full max-w-full">
      <div class="p-5">
        <div class="flex justify-end">
          <Lucide icon="XCircle" class="w-10 h-10 text-danger cursor-pointer" @click="closeAddObjectiveCreate" />
        </div>
      </div>

      <div class="px-5 pb-8 text-center">
        <div class="overflow-x-auto">
          <!--? Inicio de Alerta de Error -->
          <Alert variant="outline-danger" v-if="setObjectiveError"
            class="flex items-center px-4 py-3 my-7 bg-danger/5 border-danger/20 rounded-[0.6rem] leading-[1.7]"
            v-slot="{ dismiss }">
            <div class="">
              <Lucide icon="AlertTriangle" class="stroke-[0.8] stroke-danger w-7 h-7 mr-2 fill-danger/10" />
            </div>
            <div class="ml-1 mr-8">
              <span class="text-danger">{{ setObjectiveError }}</span>
            </div>
            <Alert.DismissButton type="button" class="btn-close text-danger" @click="dismiss" aria-label="Cerrar">
              <Lucide icon="X" class="w-5 h-5" />
            </Alert.DismissButton>
          </Alert>
          <!--? Fin de Alerta de Error -->
          <div class="flex-col block xl:items-center sm:flex xl:flex-row">
            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium">Objetivo</div>
                  <div class="ml-2.5 px-2 py-0.5 bg-slate-100 text-xs rounded-md border border-slate-200">
                    Requerido
                  </div>
                </div>
                <div class="mt-1.5 xl:mt-3 text-xs text-slate-500/80">
                  Por favor, ingrese la descripción del objetivo.
                </div>
              </div>
            </label>
            <div class="flex-1 w-full mt-3 xl:mt-1 mr-1 mb-6">
              <!-- <div class="flex w-full xl:mt-1 mr-1 mb-1"> -->
              <FormTextarea style="resize: none; height: 8.6rem"
                placeholder="Escriba aquí la descripción de su objetivo..." v-model="description"
                @input="(e) => validate(e, 'description')" />
              <div class="amt-1 text-xs text-red-500 h-4 text-left">
                {{ status.description.message }}
              </div>
            </div>
          </div>
          <!-- Submit Button -->
          <div class="flex py-5 border-t md:justify-end px-7 border-slate-200/80">
            <Button
              :class="`w-full px-10 md:w-auto font-bold ${setObjectiveLoading || !valid ? 'border-gray-500 text-gray-500' : 'border-green text-green'}`"
              @click="handleObjective" :disabled="!valid || setObjectiveLoading">
              <LoadingIcon v-if="setObjectiveLoading" icon="tail-spin" class="stroke-[1.3] w-4 h-4 mr-2 -ml-2"
                color="black" />

              <Lucide v-if="!setObjectiveLoading" icon="Check" class="stroke-[1.3] w-4 h-4 mr-2" />
              {{ setObjectiveLoading ? 'Registrando...' : 'Registrar' }}
            </Button>
          </div>
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: Modal Content -->

  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12">
      <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div class="text-base font-medium group-[.mode--light]:text-white">Actividades</div>
        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
          <Button variant="primary"
            class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
            @click="() => {
              router.push({
                name: 'addActividades'
              })
            }
              ">
            <Lucide icon="PenLine" class="stroke-[1.3] w-4 h-4 mr-2" /> Agregar nueva actividad
          </Button>
        </div>
      </div>
      <div class="mt-3.5">
        <div class="flex flex-col box box--stacked">
          <div class="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
            <div>
              <div class="relative">
                <Lucide icon="Search"
                  class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500" />
                <FormInput v-model="searchQuery" type="text" placeholder="Buscar nombre de actividad..."
                  class="pl-9 sm:w-72 rounded-[0.5rem]" />
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
              <Menu>
                <Menu.Button :as="Button" variant="outline-secondary"
                  :class="`w-full sm:w-auto ${loadingExportExcel || loadingExportPDF ? 'text-amber-500' : ' text-black'}`"
                  :disabled="loadingExportExcel || loadingExportPDF">
                  <Lucide v-if="!loadingExportExcel && !loadingExportPDF" icon="Download"
                    class="stroke-[1.3] w-4 h-4 mr-2" />
                  <LoadingIcon v-if="loadingExportExcel || loadingExportPDF" icon="tail-spin"
                    class="stroke-[1.3] w-4 h-4 mr-2" color="black" />
                  Exportar
                  <Lucide icon="ChevronDown" class="stroke-[1.3] w-4 h-4 ml-2" />
                </Menu.Button>
                <Menu.Items class="w-40">
                  <Menu.Item>
                    <Button @click="loadExportExcel"
                      :class="`w-full ${loadingExportExcel ? 'text-amber-500' : ' text-black'}`"
                      :disabled="loadingExportExcel">
                      <Lucide v-if="!loadingExportExcel" icon="FileSpreadsheet" class="stroke-[1.3] w-4 h-4 mr-2" />
                      <LoadingIcon v-if="loadingExportExcel" icon="tail-spin" class="stroke-[1.3] w-4 h-4 mr-2"
                        color="black" />
                      Excel
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button @click="loadExportPDF"
                      :class="`w-full ${loadingExportPDF ? 'text-amber-500' : ' text-black'}`"
                      :disabled="loadingExportPDF">
                      <Lucide v-if="!loadingExportPDF" icon="File" class="stroke-[1.3] w-4 h-4 mr-2" />
                      <LoadingIcon v-if="loadingExportPDF" icon="tail-spin" class="stroke-[1.3] w-4 h-4 mr-2"
                        color="black" />
                      PDF
                    </Button>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
              <Popover class="inline-block" v-slot="{ close }">
                <Popover.Button :as="Button" variant="outline-secondary" class="w-full sm:w-auto">
                  <Lucide icon="ArrowDownWideNarrow" class="stroke-[1.3] w-4 h-4 mr-2" />
                  Filtrar
                  <div
                    class="flex items-center justify-center h-5 px-1.5 ml-2 text-xs font-medium border rounded-full bg-slate-100">
                    {{ activeFilters }}
                  </div>
                </Popover.Button>
                <Popover.Panel placement="bottom-end">
                  <div class="p-2 space-y-4">
                    <div>
                      <div class="text-left text-slate-500">Estado</div>
                      <FormSelect v-model="selectedStatus" class="flex-1 mt-2">
                        <option :value="null" selected>Todos</option>
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                      </FormSelect>
                    </div>
                    <div class="flex items-center mt-4">
                      <Button variant="secondary" @click="() => {
                        close()
                      }
                        " class="w-32 ml-auto">
                        Cerrar
                      </Button>
                    </div>
                  </div>
                </Popover.Panel>
              </Popover>
            </div>
          </div>
          <div class="overflow-auto xl:overflow-visible">
            <Table class="border-b border-slate-200/60">
              <Table.Thead>
                <Table.Tr>
                  <Table.Td
                    class="py-4 font-medium border-t text-center bg-slate-50 border-slate-200/60 text-slate-500 whitespace-normal w-96">
                    Nombre
                  </Table.Td>
                  <Table.Td
                    class="py-4 font-medium border-t text-center bg-slate-50 border-slate-200/60 text-slate-500 whitespace-normal">
                    Fecha
                  </Table.Td>
                  <Table.Td
                    class="py-4 font-medium border-t text-center bg-slate-50 border-slate-200/60 text-slate-500 whitespace-normal">
                    Programa
                  </Table.Td>
                  <Table.Td
                    class="py-4 font-medium border-t text-center bg-slate-50 border-slate-200/60 text-slate-500 whitespace-normal">
                    Área
                  </Table.Td>
                  <Table.Td
                    class="py-4 font-medium border-t text-center bg-slate-50 border-slate-200/60 text-slate-500 whitespace-normal">
                    # Voluntario
                  </Table.Td>
                  <Table.Td
                    class="py-4 font-medium border-t text-center bg-slate-50 border-slate-200/60 text-slate-500 whitespace-normal">
                    # Beneficiario
                  </Table.Td>
                  <Table.Td
                    class="py-4 font-medium border-t text-center bg-slate-50 border-slate-200/60 text-slate-500 whitespace-normal">
                  </Table.Td>
                </Table.Tr>
              </Table.Thead>

              <!--? loading es true -->
              <Table.Tbody v-if="loading">
                <Table.Tr>
                  <Table.Td colspan="6" class="py-8 text-center text-xl font-bold text-green-500">
                    <div class="flex flex-col w-full justify-center items-center text-nowrap">
                      <LoadingIcon icon="tail-spin" class="h-8" color="black" />
                      <div class="mt-2">Cargando información...</div>
                    </div>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>

              <!--? Mostrar mensaje de error cuando hay error -->
              <Table.Tbody v-if="error">
                <Table.Tr>
                  <Table.Td colspan="6" class="py-8 text-center text-xl font-bold text-red-500">
                    Error al cargar la información, Inténtelo más tarde
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>

              <!--? Mensaje de error -->
              <Table.Tbody v-if="!loading && totalPages <= 0 && !error">
                <Table.Tr>
                  <Table.Td colspan="6" class="py-8 text-center text-xl font-bold text-amber-500">
                    No se encontraron actividades
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>

              <!--? Mostrar la tabla de áreas cuando no está cargando y no existe ningun error -->
              <Table.Tbody v-if="!loading">
                <template v-for="actividades in paginatedItems" :key="actividades.id">
                  <Table.Tr class="[&_td]:last:border-b-0">
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 text-center">
                      <div class="font-medium">
                        {{ actividades.name }}
                      </div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 text-center">
                      <div href="" class="font-medium whitespace-normal">
                        {{ actividades.date }}
                      </div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 text-center">
                      <div href="" class="font-medium whitespace-normal">
                        {{ actividades.program_name }}
                      </div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 text-center">
                      <div href="" class="font-medium whitespace-normal">
                        {{ actividades.area_name }}
                      </div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600">
                      <div href="" class="font-medium whitespace-nowrap text-center">0</div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600">
                      <div href="" class="font-medium whitespace-nowrap text-center">0</div>
                    </Table.Td>
                    <Table.Td class="relative py-4 border-dashed dark:bg-darkmode-600">
                      <div class="flex items-center justify-end">
                        <Menu class="h-5">
                          <Menu.Button class="w-5 h-5 text-black">
                            <Lucide icon="MoreVertical" class="w-5 h-5 stroke-black fill-black" />
                          </Menu.Button>
                          <Menu.Items class="w-40">
                            <Menu.Item class="text-warning">
                              <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
                              Editar
                            </Menu.Item>
                            <Menu.Item class="text-green">
                              <Lucide icon="CircleCheckBig" class="w-4 h-4 mr-2" />
                              Agregar horario
                            </Menu.Item>
                            <Menu.Item class="text-blue" @click="() => {
                              openObjectiveModal(actividades.id)
                              guardarId(actividades.id)
                            }
                              ">
                              <Lucide icon="CircleCheckBig" class="w-4 h-4 mr-2" />
                              Agregar objetivos
                            </Menu.Item>
                            <Menu.Item class="text-danger" @click="() => {
                              openDeleteModal(actividades.id)
                            }
                              ">
                              <Lucide icon="Trash" class="w-4 h-4 mr-2" />
                              Eliminar
                            </Menu.Item>
                          </Menu.Items>
                        </Menu>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                </template>
              </Table.Tbody>
            </Table>
          </div>

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
              <Pagination.Link @click="changePage(totalPages)">
                <Lucide icon="ChevronsRight" class="w-4 h-4" />
              </Pagination.Link>
            </Pagination>
            <FormSelect class="sm:w-20 rounded-[0.5rem]" v-model="pageSize" @change="changePageSize">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </FormSelect>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
