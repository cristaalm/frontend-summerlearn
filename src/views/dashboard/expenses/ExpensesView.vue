<script setup>
import Lucide from '@/components/base/Lucide'
import { Menu } from '@/components/base/Headless'
import Pagination from '@/components/base/Pagination'
import LoadingIcon from '@/components/base/LoadingIcon'
import { FormInput, FormSelect } from '@/components/base/Form'
import Button from '@/components/base/Button'
import Table from '@/components/base/Table'
import { onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { usePagination, useBillSearch, useExportExcel, useExportPDF } from '@/hooks/bills'

const router = useRouter()
const { bills, loadingBills, loadBills, errorBills } = inject('bills')
const { searchQuery, filteredBills } = useBillSearch(bills)
const { currentPage, pageSize, totalPages, paginatedItems, changePage, changePageSize } =
  usePagination(filteredBills)
const { loadExportExcel, loadingExportExcel } = useExportExcel()
const { loadExportPDF, loadingExportPDF } = useExportPDF()

function formatDateToDDMMYYYY(dateString) {
  if (!dateString) return '' // Verifica si dateString es undefined, null o vacío.
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

onMounted(() => {
  loadBills()
})
</script>

<template>
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12">
      <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div class="text-base font-medium group-[.mode--light]:text-white">Gastos</div>
        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
          <Button
            variant="primary"
            @click="router.push({ name: 'addExpense' })"
            id="button-add-expense"
            class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
          >
            <Lucide icon="PenLine" class="stroke-[1.3] w-4 h-4 mr-2" /> Agregar nuevo gasto
          </Button>
        </div>
      </div>

      <div class="mt-3.5">
        <div class="flex flex-col box box--stacked" id="table-expenses">
          <div class="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
            <div>
              <div class="relative">
                <Lucide
                  icon="Search"
                  class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500"
                />
                <FormInput
                  v-model="searchQuery"
                  type="text"
                  placeholder="Buscar gasto..."
                  class="pl-9 sm:w-64 rounded-[0.5rem] dark:text-slate-200 dark:placeholder:text-slate-400"
                />
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
              <Menu>
                <Menu.Button
                  :as="Button"
                  variant="outline-secondary"
                  :class="`w-full sm:w-auto ${loadingExportExcel || loadingExportPDF ? 'text-amber-500 dark:text-yellow-500' : 'text-black dark:text-slate-200'}`"
                  :disabled="loadingExportExcel || loadingExportPDF"
                >
                  <Lucide
                    v-if="!loadingExportExcel && !loadingExportPDF"
                    icon="Download"
                    class="stroke-[1.3] w-4 h-4 mr-2 dark:stroke-slate-200"
                  />
                  <LoadingIcon
                    v-if="loadingExportExcel || loadingExportPDF"
                    icon="tail-spin"
                    class="stroke-[1.3] w-4 h-4 mr-2 dark:stroke-slate-200"
                    color="black"
                  />
                  Exportar
                  <Lucide
                    icon="ChevronDown"
                    class="stroke-[1.3] w-4 h-4 ml-2 dark:stroke-slate-200"
                  />
                </Menu.Button>
                <Menu.Items class="w-40 dark:bg-darkmode-600">
                  <Menu.Item>
                    <Button
                      @click="loadExportExcel"
                      :class="`w-full dark:border-none ${loadingExportExcel ? 'text-amber-500 dark:text-yellow-500' : 'text-black dark:text-slate-200'}`"
                      :disabled="loadingExportExcel"
                    >
                      <Lucide
                        v-if="!loadingExportExcel"
                        icon="FileSpreadsheet"
                        class="stroke-[1.3] w-4 h-4 mr-2 dark:stroke-slate-200"
                      />
                      <LoadingIcon
                        v-if="loadingExportExcel"
                        icon="tail-spin"
                        class="stroke-[1.3] w-4 h-4 mr-2 dark:stroke-slate-200"
                        color="black"
                      />
                      Excel
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button
                      @click="loadExportPDF"
                      :class="`w-full dark:border-none ${loadingExportPDF ? 'text-amber-500 dark:text-yellow-500' : 'text-black dark:text-slate-200'}`"
                      :disabled="loadingExportPDF"
                    >
                      <Lucide
                        v-if="!loadingExportPDF"
                        icon="File"
                        class="stroke-[1.3] w-4 h-4 mr-2 dark:stroke-slate-200"
                      />
                      <LoadingIcon
                        v-if="loadingExportPDF"
                        icon="tail-spin"
                        class="stroke-[1.3] w-4 h-4 mr-2 dark:stroke-slate-200"
                        color="black"
                      />
                      PDF
                    </Button>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
          <div class="overflow-auto xl:overflow-visible">
            <Table class="border-b border-slate-200/60 dark:border-slate-700">
              <Table.Thead>
                <Table.Tr>
                  <Table.Td
                    class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200"
                  >
                    Encargado del gasto
                  </Table.Td>
                  <Table.Td
                    class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200"
                  >
                    Monto
                  </Table.Td>
                  <Table.Td
                    class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200"
                  >
                    Concepto
                  </Table.Td>
                  <Table.Td
                    class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200"
                  >
                    Fecha
                  </Table.Td>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody v-if="loadingBills">
                <Table.Tr class="[&_td]:last:border-b-0">
                  <Table.Td colspan="4" class="py-8 text-center text-xl font-bold text-green-500">
                    <div class="flex flex-col w-full justify-center items-center text-nowrap">
                      <LoadingIcon icon="tail-spin" class="h-8" color="black" />
                      <div class="mt-2">Cargando información...</div>
                    </div>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>

              <!--? Mostrar mensaje de error cuando hay error -->
              <Table.Tbody v-if="errorBills">
                <Table.Tr>
                  <Table.Td colspan="4" class="py-8 text-center text-xl font-bold text-red-500">
                    Error al cargar la información, Inténtelo más tarde
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>

              <!--? Mostrar mensaje de error cuando no se encuentran usuarios -->
              <Table.Tbody v-if="!loadingBills && totalPages <= 0 && !errorBills">
                <Table.Tr>
                  <Table.Td colspan="4" class="py-8 text-center text-xl font-bold text-amber-500">
                    No se encontraron gasto
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>

              <Table.Tbody v-if="!loadingBills">
                <template v-for="(bill, key) in paginatedItems" :key="key">
                  <Table.Tr class="[&_td]:last:border-b-0">
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200">
                      {{ bill.donation.name }}
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200">
                      {{
                        new Intl.NumberFormat('es-MX', {
                          style: 'currency',
                          currency: 'MXN'
                        }).format(bill.amount)
                      }}
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200">
                      {{ bill.concept }}
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200">
                      {{ formatDateToDDMMYYYY(bill.date) }}
                    </Table.Td>
                  </Table.Tr>
                </template>
              </Table.Tbody>
            </Table>
          </div>
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
              <Pagination.Link @click="changePage(totalPages)">
                <Lucide icon="ChevronsRight" class="w-4 h-4" />
              </Pagination.Link>
            </Pagination>
            <FormSelect
              class="sm:w-20 rounded-[0.5rem] dark:text-slate-200"
              v-model="pageSize"
              @change="changePageSize"
            >
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
