<script setup>
import { useRouter } from 'vue-router'
import Lucide from '@/components/base/Lucide'
import { Menu, Dialog } from '@/components/base/Headless'
import Pagination from '@/components/base/Pagination'
import { FormInput, FormSelect } from '@/components/base/Form'
import Table from '@/components/base/Table'
import LoadingIcon from '@/components/base/LoadingIcon'
import Button from '@/components/base/Button'
// import { useFilter, usePagination, useAreas } from '@/hooks/areas/' // error areglado ><
import { onMounted } from 'vue'
import { useFilter, useAreas, usePagination, useDialogDelete, useToast } from '@/hooks/areas/'
import ToastNotification from '@/components/ToastNotification/' // Asegúrate de usar el nuevo nombre

const { areas, loading, error, loadAreas } = useAreas()
const { searchQuery, filteredItems } = useFilter(areas)
const { currentPage, pageSize, totalPages, paginatedItems, changePage, changePageSize } =
  usePagination(filteredItems)
const router = useRouter()

const { toastMessages, showToast } = useToast()
const { dialogStatusDelete, openDeleteModal, confirmDeleteArea, closeDeleteArea } = useDialogDelete(
  { showToast, areas }
)

onMounted(() => {
  loadAreas()
})
</script>

<template>
  <div>
    <ToastNotification
      v-for="(message, index) in toastMessages"
      :key="index"
      :message="message"
      :index="index"
    >
    </ToastNotification>
  </div>

  <!-- BEGIN: Modal Content -->
  <Dialog
    :open="dialogStatusDelete"
    @close="
      () => {
        dialogStatusDelete.value = false
      }
    "
  >
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
        <Button
          type="button"
          variant="outline-secondary"
          @click="closeDeleteArea"
          class="w-24 mr-1"
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant="danger"
          class="w-24"
          @click="confirmDeleteArea"
          ref="deleteButtonRef"
        >
          Eliminar
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: Modal Content -->
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12">
      <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div class="text-base font-medium group-[.mode--light]:text-white">Áreas</div>
        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
          <Button
            variant="primary"
            class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
            @click="
              () => {
                router.push({
                  name: 'addArea'
                })
              }
            "
          >
            <Lucide icon="PenLine" class="stroke-[1.3] w-4 h-4 mr-2" /> Agregar nueva área
          </Button>
        </div>
      </div>
      <div class="mt-3.5">
        <div class="flex flex-col box box--stacked">
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
                  placeholder="Buscar nombre de área..."
                  class="pl-9 sm:w-72 rounded-[0.5rem]"
                />
              </div>
            </div>
          </div>
          <div class="overflow-auto xl:overflow-visible">
            <Table class="border-b border-slate-200/60">
              <Table.Thead>
                <Table.Tr>
                  <Table.Td
                    class="py-4 font-medium border-t text-center bg-slate-50 border-slate-200/60 text-slate-500"
                  >
                    Nombre
                  </Table.Td>
                  <Table.Td
                    class="py-4 font-medium border-t text-center bg-slate-50 border-slate-200/60 text-slate-500"
                  >
                    Responsable
                  </Table.Td>
                  <Table.Td
                    class="py-4 font-medium border-t text-center bg-slate-50 border-slate-200/60 text-slate-500"
                  >
                  </Table.Td>
                </Table.Tr>
              </Table.Thead>

              <!--? Mostrar 'Cargando información...' cuando loading es true -->
              <Table.Tbody v-if="loading">
                <Table.Tr>
                  <Table.Td colspan="7" class="py-8 text-center text-xl font-bold text-green-500">
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
                  <Table.Td colspan="3" class="py-8 text-center text-xl font-bold text-red-500">
                    Error al cargar la información, inténtelo más tarde
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>

              <!--? Mostrar mensaje de error cuando no se encuentran usuarios -->
              <Table.Tbody v-if="!loading && totalPages <= 0 && !error">
                <Table.Tr>
                  <Table.Td colspan="3" class="py-8 text-center text-xl font-bold text-amber-500">
                    No se encontraron áreas
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>

              <!--? Mostrar la tabla de áreas cuando no está cargando y no existe ningun error -->
              <Table.Tbody v-if="!loading">
                <template v-for="area in paginatedItems" :key="area.id">
                  <Table.Tr class="[&_td]:last:border-b-0">
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 text-center">
                      <div href="" class="font-medium whitespace-nowrap">
                        {{ area.name }}
                      </div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 text-center">
                      <div href="" class="font-medium whitespace-nowrap">
                        {{ area.user.name }}
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
                              <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
                              Editar
                            </Menu.Item>
                            <Menu.Item
                              class="text-danger"
                              @click="
                                () => {
                                  openDeleteModal(area.id)
                                }
                              "
                            >
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
              class="sm:w-20 rounded-[0.5rem]"
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
