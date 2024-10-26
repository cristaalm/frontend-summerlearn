<script setup>
import Lucide from '@/components/base/Lucide'
import TinySlider from '@/components/base/TinySlider'
import ReportBarChart3 from '@/components/ReportBarChart3'
import Button from '@/components/base/Button'
import { Menu } from '@/components/base/Headless'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  useDonations,
  useDonationSearch,
  usePagination,
  useWeeklyDonations,
  useExportExcel,
  useExportPDF
} from '@/hooks/donations/'
import LoadingIcon from '@/components/base/LoadingIcon'
import Pagination from '@/components/base/Pagination'
import { FormInput, FormSelect } from '@/components/base/Form'
import Table from '@/components/base/Table'
import getIdByToken from '@/logic/getIdByToken'


const router = useRouter()
const { barDonations, donations, loading, loadDonations, errorDonations } = useDonations()
const { searchQuery, filteredItems } = useDonationSearch(donations)
const { currentPage, pageSize, totalPages, paginatedItems, changePage, changePageSize } =
  usePagination(filteredItems)
const { donationsWeek, loadingWeek, loadDonationsWeek, errorWeek, totalDonationsWeek } =
  useWeeklyDonations()
const { loadExportExcel, loadingExportExcel } = useExportExcel()
const { loadExportPDF, loadingExportPDF } = useExportPDF()

function formatDateToDDMMYYYY(dateString) {
  if (!dateString) return '' // Verifica si dateString es undefined, null o vacío.
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

onMounted(() => {
  loadDonations()
  loadDonationsWeek()
})

const {  rol: role } = getIdByToken(localStorage.getItem('access_token'))
console.log(role)
</script>

<template>
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12">
      <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div class="text-base font-medium group-[.mode--light]:text-white">Donaciones</div>

        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
          <Button variant="primary" @click="() => router.push({ name: 'addDonation' })"
            class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent">
            <Lucide icon="PenLine" class="stroke-[1.3] w-4 h-4 mr-2" />
            Agregar nueva donación
          </Button>
        </div>
      </div>
      <div class="flex flex-col gap-8 mt-3.5">
        <!--? contenedor de cards -->

        <div class="grid grid-cols-12 gap-5 mt-3.5">
          <!--? Card -->

          <div class="col-span-12 p-1 md:col-span-6 2xl:col-span-3 box box--stacked">
            <div
              class="-mx-1 overflow-hidden h-[244px] [&_.tns-outer_.tns-nav]:bottom-auto [&_.tns-outer_.tns-nav]:w-auto [&_.tns-outer_.tns-nav]:ml-5 [&_.tns-outer_.tns-nav]:mt-5 [&_.tns-outer_.tns-nav_button]:w-2 [&_.tns-outer_.tns-nav_button]:h-2 [&_.tns-outer_.tns-nav_button.tns-nav-active]:w-5 [&_.tns-outer_.tns-nav_button]:mx-0.5 [&_.tns-outer_.tns-nav_button]:bg-black/40 [&_.tns-outer_.tns-nav_button.tns-nav-active]:bg-black/70">
              <TinySlider :options="{ mode: 'gallery', nav: true }">
                <div class="px-1">
                  <div
                    class="overflow-hidden relative flex flex-col w-full h-full p-5 rounded-[0.5rem] bg-gradient-to-b from-theme-2/90 to-theme-1/[0.85]">
                    <Lucide icon="Medal"
                      class="absolute top-0 right-0 w-36 h-36 -mt-5 -mr-5 text-white/20 fill-white/[0.03] transform rotate-[-10deg] stroke-[0.3]" />
                    <div class="mt-12 mb-9">
                      <div class="text-2xl font-medium leading-snug text-black dark:text-slate-200">
                        Estadísticas de
                        <br />
                        donaciones
                      </div>
                      <div class="mt-1.5 text-lg text-black dark:text-slate-200/70">
                        Aumente su rendimiento
                      </div>
                    </div>
                    <a class="flex items-center font-medium text-black dark:text-slate-200" href="">
                      Actualizar ahora
                      <Lucide icon="MoveRight" class="w-4 h-4 ml-1.5" />
                    </a>
                  </div>
                </div>
              </TinySlider>
            </div>
          </div>

          <!--? Card -->

          <div class="flex flex-col col-span-12 p-5 md:col-span-6 2xl:col-span-3 box box--stacked">
            <div class="pb-5 mb-5 border-b border-dashed border-slate-300/70">
              <div class="text-base text-slate-500  dark:text-slate-200" v-if="!loading">Donación semanal</div>
              <div class="flex items-center mt-1">
                <div class="flex items-center text-xl font-medium dark:text-slate-400">
                  <span class="mr-px">$</span>{{ totalDonationsWeek }}
                  <span class="ml-1.5 text-sm">MXN</span>
                </div>
              </div>
            </div>
            <ReportBarChart3 class="relative z-10 -ml-1" :height="80" />

            <span class="flex items-center mt-6 font-medium text-primary dark:text-slate-200">Donaciones diarias</span>
          </div>
        </div>

        <!--? contenedor de las estadisticas de usuarios -->
      <div v-if="role == 1">
        <div v-if="!errorDonations" class="flex flex-col p-5 box box--stacked">
          <div class="grid grid-cols-4 gap-5">
            <div
              class="col-span-4 md:col-span-2 xl:col-span-1 p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm">
              <div class="text-base text-slate-500  dark:text-slate-200" v-if="!loading">Cantidad de donaciones:</div>
              <div class="mt-1.5 text-2xl font-medium dark:text-slate-200">
                <div v-if="loading" class="w-full h-4 mt-4">
                  <LoadingIcon icon="three-dots" color="gray" />
                </div>
                {{ !loading ? `${barDonations.totalDonated}` : '' }}
              </div>
              <div class="absolute inset-y-0 right-0 flex flex-col justify-center mr-5"></div>
            </div>
            <div
              class="col-span-4 md:col-span-2 xl:col-span-1 p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm">
              <div class="text-base text-slate-500  dark:text-slate-200" v-if="!loading">Dinero total donado:</div>
              <div class="mt-1.5 text-2xl font-medium dark:text-slate-200">
                <div v-if="loading" class="w-full h-4 mt-4">
                  <LoadingIcon icon="three-dots" color="gray" />
                </div>
                {{
                  !loading
                    ? `${new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN'
                    }).format(barDonations.totalDonations)}`
                    : ''
                }}
              </div>
              <div class="absolute inset-y-0 right-0 flex flex-col justify-center mr-5"></div>
            </div>
            <div
              class="col-span-4 md:col-span-2 xl:col-span-1 p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm">
              <div class="text-base text-slate-500  dark:text-slate-200" v-if="!loading">Última cantidad donada:</div>
              <div class="mt-1.5 text-2xl font-medium dark:text-slate-200">
                <div v-if="loading" class="w-full h-4 mt-4">
                  <LoadingIcon icon="three-dots" color="gray" />
                </div>
                {{
                  !loading
                    ? `${new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN'
                    }).format(barDonations.lastDonationAmount)}`
                    : ''
                }}
              </div>
              <div class="absolute inset-y-0 right-0 flex flex-col justify-center mr-5"></div>
            </div>
            <div
              class="col-span-4 md:col-span-2 xl:col-span-1 p-5 border border-dashed rounded-[0.6rem] border-slate-300/80 box shadow-sm">
              <div class="text-base text-slate-500  dark:text-slate-200" v-if="!loading">Última fecha de donación:</div>
              <div class="mt-1.5 text-2xl font-medium dark:text-slate-200">
                <div v-if="loading" class="w-full h-4 mt-4">
                  <LoadingIcon icon="three-dots" color="gray" />
                </div>
                <div v-if="!loading && barDonations.lastDonationDate">
                  {{ formatDateToDDMMYYYY(barDonations.lastDonationDate) }}
                </div>
              </div>
              <div class="absolute inset-y-0 right-0 flex flex-col justify-center mr-5"></div>
            </div>
          </div>
        </div>



        <div v-if="errorDonations" class="flex flex-col p-5 box box--stacked">
          <div class="flex flex-row w-full">
            <div class="text-center text-3xl w-full text-red-500">A ocurrido un error...</div>
          </div>
        </div>
      </div>
    </div>

    <div></div>  

      <div class="grid grid-cols-12 gap-y-10 gap-x-6">
        <div class="col-span-12">
          <div class="mt-3.5">
            <div class="flex flex-col box box--stacked">
              <div class="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
                <div>
                  <div class="relative">
                    <Lucide icon="Search"
                      class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500" />
                    <FormInput v-model="searchQuery" type="text" placeholder="Buscar nombre de donante..."
                      class="pl-9 sm:w-64 rounded-[0.5rem]" />
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
                  <Menu>
                    <Menu.Button :as="Button" variant="outline-secondary"
                      :class="`w-full sm:w-auto ${loadingExportExcel || loadingExportPDF ? 'text-amber-500 dark:text-yellow-500' : ' text-black dark:text-slate-200'}`"
                      :disabled="loadingExportExcel || loadingExportPDF">
                      <Lucide v-if="!loadingExportExcel && !loadingExportPDF" icon="Download"
                        class="stroke-[1.3] w-4 h-4 mr-2 text-black dark:text-slate-200" />
                      <LoadingIcon v-if="loadingExportExcel || loadingExportPDF" icon="tail-spin"
                        class="stroke-[1.3] w-4 h-4 mr-2 text-black dark:text-slate-200" color="black" />
                      Exportar
                      <Lucide icon="ChevronDown" class="stroke-[1.3] w-4 h-4 ml-2 text-black dark:text-slate-200" />
                    </Menu.Button>
                    <Menu.Items class="w-40">
                      <Menu.Item @click="loadExportExcel">
                        <Button
                          :class="`w-full dark:border-none ${loadingExportExcel ? 'text-amber-500 dark:text-yellow-500' : ' text-black dark:text-slate-200'}`"
                          :disabled="loadingExportExcel">
                          <Lucide v-if="!loadingExportExcel" icon="FileSpreadsheet"
                            class="stroke-[1.3] w-4 h-4 mr-2 text-black dark:text-slate-200" />
                          <LoadingIcon v-if="loadingExportExcel" icon="tail-spin"
                            class="stroke-[1.3] w-4 h-4 mr-2 text-black dark:text-slate-200" color="black" />
                          Excel
                        </Button>
                      </Menu.Item>
                      <Menu.Item @click="loadExportPDF">
                        <Button
                          :class="`w-full dark:border-none ${loadingExportPDF ? 'text-amber-500 dark:text-yellow-500' : ' text-black dark:text-slate-200'}`"
                          :disabled="loadingExportPDF">
                          <Lucide v-if="!loadingExportPDF" icon="File"
                            class="stroke-[1.3] w-4 h-4 mr-2 text-black dark:text-slate-200" />
                          <LoadingIcon v-if="loadingExportPDF" icon="tail-spin"
                            class="stroke-[1.3] w-4 h-4 mr-2 text-black dark:text-slate-200" color="black" />
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
                        class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200">
                        Donante
                      </Table.Td>
                      <Table.Td
                        class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200">
                        Monto
                      </Table.Td>
                      <Table.Td
                        class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200">
                        Concepto
                      </Table.Td>
                      <Table.Td
                        class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200">
                        Fecha
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
                  <Table.Tbody v-if="errorDonations">
                    <Table.Tr>
                      <Table.Td colspan="4" class="py-8 text-center text-xl font-bold text-red-500">
                        Error al cargar la información, Inténtelo más tarde
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>

                  <!--? Mostrar mensaje de error cuando no se encuentran usuarios -->
                  <Table.Tbody v-if="!loading && totalPages <= 0 && !errorDonations">
                    <Table.Tr>
                      <Table.Td colspan="4" class="py-8 text-center text-xl font-bold text-amber-500">
                        No se encontraron donaciones
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>

                  <Table.Tbody v-if="!loading && !errorDonations">
                    <Table.Tr class="[&_td]:last:border-b-0" v-for="(donations, key) in paginatedItems" :key="key">
                      <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200">
                        {{ donations.user.name }}
                      </Table.Td>
                      <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200">
                        {{
                          new Intl.NumberFormat('es-MX', {
                            style: 'currency',
                            currency: 'MXN'
                          }).format(donations.quanty)
                        }}
                      </Table.Td>
                      <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200">
                        {{ donations.concept }}
                      </Table.Td>
                      <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200">
                        {{ formatDateToDDMMYYYY(donations.date) }}
                      </Table.Td>
                    </Table.Tr>
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
    </div>
  </div>
</template>
