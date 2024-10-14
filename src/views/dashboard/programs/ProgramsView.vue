<script setup>
import {
  useFilter,
  usePagination,
  usePrograms,
  useDialogDelete,
  useStatusProgram,
  useExportExcel,
  useExportPDF
} from '@/hooks/programs/'
import formatDate from '@/logic/formatDate'
import { FormInput, FormSelect } from '@/components/base/Form'
import { Menu, Popover, Dialog } from '@/components/base/Headless'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import LoadingIcon from '@/components/base/LoadingIcon'
import Pagination from '@/components/base/Pagination'
import Button from '@/components/base/Button'
import Lucide from '@/components/base/Lucide'
import Table from '@/components/base/Table'

const { programs, loading, error, loadPrograms } = usePrograms()
const { searchQuery, selectedStatus, filteredItems, activeFilters } = useFilter(programs)
const { currentPage, pageSize, totalPages, paginatedItems, changePage, changePageSize } =
  usePagination(filteredItems)
const { dialogStatusDelete, openDeleteModal, confirmDeleteProgram, closeDeleteProgram } =
  useDialogDelete({ programs })
const { updateStatus } = useStatusProgram()
const { loadExportExcel, loadingExportExcel } = useExportExcel()
const { loadExportPDF, loadingExportPDF } = useExportPDF()
const router = useRouter()

onMounted(() => {
  loadPrograms()
})
</script>

<template>
  <!--? ######################## DIALOG DELETE PROGRAM ######################## -->

  <!-- BEGIN: Modal Content -->
  <Dialog :open="dialogStatusDelete" @close="() => {
    dialogStatusDelete.value = false
  }">
    <Dialog.Panel>
      <div class="p-5 text-center">
        <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-danger dark:text-red-500" />
        <div class="mt-5 text-3xl text-slate-900 dark:text-slate-200">¿Está seguro?</div>
        <div class="mt-2 text-slate-500 dark:text-slate-400">
          ¿Realmente desea eliminar este registro?
          <br />
          Este proceso eliminara las actividades asociadas a este programa.
        </div>
      </div>
      <div class="px-5 pb-8 text-center space-x-8">
        <Button type="button" variant="outline-secondary" @click="closeDeleteProgram"
          class="w-24 mr-1 text-slate-900 dark:text-slate-200">
          Cancelar
        </Button>
        <Button type="button" variant="danger" class="w-24 text-slate-900 dark:text-slate-200"
          @click="confirmDeleteProgram" ref="deleteButtonRef">
          Eliminar
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: Modal Content -->

  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12">
      <!--? ######################## HEADER ######################## -->

      <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div class="text-base font-medium group-[.mode--light]:text-white">Programas</div>
        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
          <Button variant="primary"
            class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
            @click="() => {
              router.push({
                name: 'addProgram'
              })
            }
              ">
            <Lucide icon="PenLine" class="stroke-[1.3] w-4 h-4 mr-2" /> Agregar nuevo programa
          </Button>
        </div>
      </div>

      <div class="mt-3.5">
        <div class="flex flex-col box box--stacked">
          <!--? ######################## SEARCH AND FILTER ######################## -->

          <div class="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
            <div>
              <div class="relative">
                <Lucide icon="Search"
                  class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500" />
                <FormInput v-model="searchQuery" type="text" placeholder="Buscar nombre de programa..."
                  class="pl-9 sm:w-72 rounded-[0.5rem] dark:text-slate-200" />
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
              <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
                <Menu>
                  <Menu.Button :as="Button" variant="outline-secondary"
                    :class="`w-full sm:w-auto ${loadingExportExcel || loadingExportPDF ? 'text-amber-500 dark:text-yellow-400' : 'text-black dark:text-slate-200'}`"
                    :disabled="loadingExportExcel || loadingExportPDF">
                    <Lucide v-if="!loadingExportExcel && !loadingExportPDF" icon="Download"
                      class="stroke-[1.3] w-4 h-4 mr-2 dark:stroke-slate-200" />
                    <LoadingIcon v-if="loadingExportExcel || loadingExportPDF" icon="tail-spin"
                      class="stroke-[1.3] w-4 h-4 mr-2 dark:stroke-slate-200" color="black" />
                    Exportar
                    <Lucide icon="ChevronDown" class="stroke-[1.3] w-4 h-4 ml-2 dark:stroke-slate-200" />
                  </Menu.Button>
                  <Menu.Items class="w-40 dark:bg-darkmode-600">
                    <Menu.Item @click="loadExportExcel">
                      <Button
                        :class="`w-full dark:border-none ${loadingExportExcel ? 'text-amber-500 dark:text-yellow-400' : 'text-black dark:text-slate-200'}`"
                        :disabled="loadingExportExcel">
                        <Lucide v-if="!loadingExportExcel" icon="FileSpreadsheet"
                          class="stroke-[1.3] w-4 h-4 mr-2 dark:stroke-slate-200" />
                        <LoadingIcon v-if="loadingExportExcel" icon="tail-spin"
                          class="stroke-[1.3] w-4 h-4 mr-2 dark:stroke-slate-200" color="black" />
                        Excel
                      </Button>
                    </Menu.Item>
                    <Menu.Item @click="loadExportPDF">
                      <Button
                        :class="`w-full dark:border-none ${loadingExportPDF ? 'text-amber-500 dark:text-yellow-400' : 'text-black dark:text-slate-200'}`"
                        :disabled="loadingExportPDF">
                        <Lucide v-if="!loadingExportPDF" icon="File"
                          class="stroke-[1.3] w-4 h-4 mr-2 dark:stroke-slate-200" />
                        <LoadingIcon v-if="loadingExportPDF" icon="tail-spin"
                          class="stroke-[1.3] w-4 h-4 mr-2 dark:stroke-slate-200" color="black" />
                        PDF
                      </Button>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
              <Popover class="inline-block" v-slot="{ close }">
                <Popover.Button :as="Button" variant="outline-secondary" class="w-full sm:w-auto">
                  <Lucide icon="ArrowDownWideNarrow" class="stroke-[1.3] w-4 h-4 mr-2" />
                  Filtrar
                  <div
                    class="flex items-center justify-center h-5 px-1.5 ml-2 text-xs font-medium border rounded-full bg-slate-100 dark:text-black">
                    {{ activeFilters }}
                  </div>
                </Popover.Button>
                <Popover.Panel placement="bottom-end">
                  <div class="p-2 space-y-4">
                    <div>
                      <div class="text-left text-slate-500 dark:text-slate-200">Estado</div>
                      <FormSelect v-model="selectedStatus" class="flex-1 mt-2 dark:text-slate-200">
                        <option :value="null" selected>Todos</option>
                        <option :value="1">Activo</option>
                        <option :value="2">Inactivo</option>
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

          <!--? ######################## TABLE ######################## -->

          <div class="overflow-auto xl:overflow-visible">
            <Table class="border-b border-slate-200/60 dark:border-slate-700">
              <Table.Thead>
                <Table.Tr>
                  <Table.Td
                    class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200">
                    Nombre
                  </Table.Td>
                  <Table.Td
                    class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200">
                    Responsable
                  </Table.Td>
                  <Table.Td
                    class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200">
                    Escolaridad
                  </Table.Td>
                  <Table.Td
                    class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200">
                    Duración
                  </Table.Td>
                  <Table.Td
                    class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200">
                    Estado
                  </Table.Td>
                  <Table.Td
                    class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200">
                  </Table.Td>
                </Table.Tr>
              </Table.Thead>

              <!--? Mostrar 'Cargando información...' cuando loading es true -->
              <Table.Tbody v-if="loading">
                <Table.Tr>
                  <Table.Td colspan="4" class="py-8 text-center text-xl font-bold text-green-500">
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
                  <Table.Td colspan="4" class="py-8 text-center text-xl font-bold text-red-500">
                    Error al cargar la información, Inténtelo más tarde
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>

              <!--? Mostrar mensaje de error cuando no se encuentran programas -->
              <Table.Tbody v-if="!loading && totalPages <= 0 && !error">
                <Table.Tr>
                  <Table.Td colspan="4" class="py-8 text-center text-xl font-bold text-amber-500">
                    No se encontraron programas
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>

              <!--? Mostrar la tabla de áreas cuando no está cargando y no existe ningun error -->
              <Table.Tbody v-if="!loading">
                <template v-for="program in paginatedItems" :key="program.id">
                  <Table.Tr class="[&_td]:last:border-b-0">
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200 text-center">
                      <div href="" class="font-medium whitespace-nowrap">
                        {{ program.name }}
                      </div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200 text-center">
                      <div href="" class="font-medium whitespace-nowrap">
                        {{ program.user.name }}
                      </div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200 text-center">
                      <div href="" class="font-medium whitespace-nowrap">
                        {{ program.grade.description }}
                      </div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200 text-center">
                      <div href="" class="font-medium text-center whitespace-nowrap">
                        {{ formatDate(program.start) }} <span class="font-bold">-</span>
                        {{ formatDate(program.end) }}
                      </div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200">
                      <div :class="[
                        'flex items-center justify-center',
                        { 'text-success dark:text-green-400': program.status == 1 },
                        { 'text-danger dark:text-red-400': program.status !== 1 },
                        { 'text-[#FFA500] dark:text-yellow-400': program.status == 0 }
                      ]">
                        <Lucide v-if="program.status == 1 || program.status == 2" icon="Database"
                          class="w-3.5 h-3.5 stroke-[1.7] dark:stroke-current" />
                        <div class="ml-1.5 whitespace-nowrap max-h-8 flex flex-row items-center justify-center gap-2">
                          <div class="w-4 h-4" v-if="program.status == 0">
                            <LoadingIcon icon="bars" class="w-8 h-8"
                              customClass="fill-[#FFA500] dark:fill-yellow-400" />
                          </div>
                          <span v-if="program.status == 0"
                            class="text-amber-500 dark:text-yellow-400">Cambiando....</span>
                          <span v-else-if="program.status == 1" class="text-success dark:text-green-400">Activo</span>
                          <span v-else class="text-danger dark:text-red-400">Inactivo</span>
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td class="relative py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200">
                      <div class="flex items-center justify-end">
                        <Menu class="h-5">
                          <Menu.Button class="w-5 h-5 text-black dark:text-slate-200">
                            <Lucide icon="MoreVertical"
                              class="w-5 h-5 stroke-black dark:stroke-slate-200 fill-black dark:fill-slate-200" />
                          </Menu.Button>
                          <Menu.Items class="w-40 dark:bg-darkmode-600">
                            <Menu.Item class="text-warning dark:text-yellow-500">
                              <Lucide icon="CheckSquare" class="w-4 h-4 mr-2 stroke-warning dark:stroke-yellow-400" />
                              Editar
                            </Menu.Item>
                            <Menu.Item
                              :class="`${program.status !== 1 ? 'text-blue dark:text-blue-500' : 'text-[#ff6f0f] dark:text-orange-400'}`"
                              @click="() => {
                                updateStatus({ program }).then((updatedProgram) => {
                                  const index = programs.findIndex(
                                    (p) => p.id === updatedProgram.id
                                  )
                                  if (index !== -1) {
                                    programs[index] = updatedProgram
                                  }
                                })
                              }
                                ">
                              <Lucide icon="RefreshCw" class="w-4 h-4 mr-2 stroke-current dark:stroke-current" />
                              {{ program.status !== 1 ? 'Activar' : 'Desactivar' }}
                            </Menu.Item>
                            <Menu.Item class="text-danger dark:text-red-400" @click="() => {
                              openDeleteModal(program.id)
                            }
                              ">
                              <Lucide icon="CheckSquare" class="w-4 h-4 mr-2 stroke-danger dark:stroke-red-400" />
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

          <!--? ######################## PAGINATION TABLE ######################## -->

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
            <FormSelect class="sm:w-20 rounded-[0.5rem] dark:text-slate-200" v-model="pageSize"
              @change="changePageSize">
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
