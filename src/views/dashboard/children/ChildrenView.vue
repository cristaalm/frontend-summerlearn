<script setup>
import { FormInput, FormSelect } from '@/components/base/Form'
import Pagination from '@/components/base/Pagination'
import { Menu } from '@/components/base/Headless'
import { usePagination, useSearch, useChildrens } from '@/hooks/childrens/'
import { onMounted, inject } from 'vue'
import Lucide from '@/components/base/Lucide'
import Table from '@/components/base/Table'
import Tippy from '@/components/base/Tippy'
import LoadingIcon from '@/components/base/LoadingIcon'
import { calculateAge } from '@/logic/'
import { useRouter } from 'vue-router'
import { Baseurl } from '@/utils/global'

const { childrens, loadingChildrens, errorChildrens, loadChildrens } = inject('childrens')
const { searchQuery, filteredChildrens } = useSearch(childrens)
const { currentPage, pageSize, totalPages, paginatedChildrens, changePage, changePageSize } =
  usePagination(filteredChildrens)
const router = useRouter()

// Cargar los niños al iniciar el componente
onMounted(() => {
  loadChildrens()
})

</script>

<template>
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12">
      <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div class="text-base font-medium group-[.mode--light]:text-white">Niños</div>
      </div>
      <div class="mt-3.5">
        <div class="flex flex-col box box--stacked">
          <div class="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
            <div>
              <div class="relative">
                <Lucide icon="Search"
                  class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500" />
                <FormInput v-model="searchQuery" type="text" placeholder="Buscar nombre del niño..."
                  class="pl-9 sm:w-72 rounded-[0.5rem] dark:text-slate-200" />
              </div>
            </div>
          </div>
          <div class="overflow-auto xl:overflow-visible">
            <Table class="border-b border-slate-200/60 dark:border-slate-700">
              <Table.Thead>
                <Table.Tr>
                  <Table.Td
                    class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200">
                    Foto
                  </Table.Td>
                  <Table.Td
                    class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200">
                    Nombre
                  </Table.Td>
                  <Table.Td
                    class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200">
                    Edad
                  </Table.Td>
                  <Table.Td
                    class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200">
                    CURP
                  </Table.Td>
                  <Table.Td
                    class="w-5 py-4 font-medium border-t bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200">
                    Padre / Madre / Tutor
                  </Table.Td>
                  <Table.Td
                    class="py-4 font-medium text-center border-t w-5 bg-slate-50 dark:bg-transparent border-slate-200/60 text-slate-500 dark:text-slate-200">
                  </Table.Td>
                </Table.Tr>
              </Table.Thead>

              <!--? Mostrar 'Cargando información...' cuando loadingChildrens es true -->
              <Table.Tbody v-if="loadingChildrens">
                <Table.Tr>
                  <Table.Td colspan="7" class="py-8 text-center text-xl font-bold text-green-500">
                    <div class="flex flex-col w-full justify-center items-center text-nowrap">
                      <LoadingIcon icon="tail-spin" class="h-8" color="black" />
                      <div class="mt-2">Cargando información...</div>
                    </div>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>

              <!--? Mostrar mensaje de errorChildrens cuando hay errorChildrens -->
              <Table.Tbody v-if="errorChildrens">
                <Table.Tr>
                  <Table.Td colspan="7" class="py-8 text-center text-xl font-bold text-red-500">
                    Error al cargar la información, Inténtelo más tarde
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>

              <!--? Mostrar mensaje de errorChildrens cuando no se encuentran usuarios -->
              <Table.Tbody v-if="!loadingChildrens && totalPages <= 0 && !errorChildrens">
                <Table.Tr>
                  <Table.Td colspan="7" class="py-8 text-center text-xl font-bold text-amber-500">
                    Ningún niño encontrado
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>

              <!--? Mostrar la tabla de áreas cuando no está cargando y no existe ningun errorChildrens -->
              <Table.Tbody v-if="!loadingChildrens && totalPages > 0">
                <template v-for="children in paginatedChildrens" :key="children.id">
                  <Table.Tr class="[&_td]:last:border-b-0">
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200">
                      <div class="flex">
                        <div class="w-9 h-9 image-fit zoom-in">
                          <Tippy as="img" alt="Tailwise - Admin Dashboard Template"
                            class="rounded-full cursor-default shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                            :src="`${Baseurl}${children.photo}`" :disable="true" :content="`Image Children`" />
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200">
                      <div class="font-medium whitespace-nowrap">
                        {{ children.name }}
                      </div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200">
                      <div class="font-medium whitespace-nowrap">
                        {{ calculateAge(children.birthdate) }}
                      </div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200">
                      <div class="whitespace-nowrap">
                        {{ children.curp }}
                      </div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 dark:text-slate-200">
                      <div class="flex items-center text-primary dark:text-slate-200">
                        {{ children.user }}
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
                            <Menu.Item class="text-danger dark:text-red-500">
                              <Lucide icon="Trash2" class="w-4 h-4 mr-2 dark:stroke-red-500" />
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
