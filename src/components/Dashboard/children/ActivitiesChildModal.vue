<script setup>
import { Dialog } from '@/components/base/Headless'
import LoadingIcon from '@/components/base/LoadingIcon'
import Button from '@/components/base/Button'
import Lucide from '@/components/base/Lucide'
import { onMounted, inject } from 'vue'
import { useDialogSubConfirm } from '@/hooks/subscriptions/'

// import { useActivities } from '@/hooks/childrens/deleteChild/useDeleteChild'
import { useSearch, usePagination } from '@/hooks/actividades/'
// obtenemos las props del componente padre
const props = defineProps({
  ModalActivitiesChild: Boolean,
  setModalActivitiesChild: Function,
  infoChild: Object
})

const {
  actividadesSubscribed,
  loadingActividadesSubscribed,
  errorActividadesSubscribed,
  loadActividadesSubscribed
} = inject('actividadesSubscribed')

const { searchQuery, selectedArea, filteredActividades, filtersCount } =
  useSearch(actividadesSubscribed)

const { currentPage, pageSize, totalPages, paginatedItems, changePage, changePageSize } =
  usePagination(filteredActividades)

const {
  dialogStatusModalSubConfirm,
  openModalSubConfirm,
  closeModalSubConfirm,
  confirmSubscription
} = useDialogSubConfirm({
  actividades: actividadesSubscribed
})
// const { activities } = inject('activities')

// const { deleteChild, loadingDeleteChild } = useDeleteChild()

// const handleDeleteArea = () => {
//   deleteChild({
//     child: props.infoChild,
//     children: childrens,
//     setModalDeleteChild: props.setModalDeleteChild
//   })
// }
onMounted(() => {
  loadActividadesSubscribed()
})
</script>

<template>
  <!-- BEGIN: Modal Content -->
  <Dialog
    size="xl"
    :open="ModalActivitiesChild"
    @close="
      () => {
        setModalActivitiesChild({ open: false })
      }
    "
  >
    <Dialog.Panel class="w-full max-w-full">
      <div class="px-10 py-5 w-full dark:border-slate-600 border-slate-300 border-b">
        <div class="flex justify-between space-x-4">
          <h2 class="text-2xl font-bold text-black dark:text-slate-200">Actividades</h2>
          <div class="flex flex-row gap-5">
            <Lucide
              icon="XCircle"
              @click="
                () => {
                  setModalActivitiesChild({ open: false })
                }
              "
              class="w-10 h-full mx-auto text-danger cursor-pointer dark:text-red-500"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div
          class="bg-white dark:bg-[#28334e] w-full min-h-screen rounded-xl flex flex-col items-center dark:text-slate-200 mb-2"
        >
          <!-- Muestra el ícono de carga si la información aún se está cargando -->
          <div
            v-if="loadingActividadesSubscribed"
            class="py-8 text-center text-xl font-bold text-green-500"
          >
            <LoadingIcon icon="tail-spin" class="h-4" color="black" />
            <div class="mt-2">Cargando información...</div>
          </div>

          <!-- Muestra un mensaje de error si ocurrió algún problema al cargar los datos -->
          <div
            v-if="errorActividadesSubscribed"
            class="py-8 text-center text-xl font-bold text-red-500"
          >
            Error al cargar la información, inténtelo más tarde.
          </div>

          <!-- Muestra un mensaje si no se encuentran actividades -->
          <div
            v-if="!loadingActividadesSubscribed && totalPages <= 0 && !errorActividadesSubscribed"
            class="py-8 text-center text-xl font-bold text-amber-500"
          >
            No se encontraron actividades.
          </div>

          <!-- Muestra las actividades si todo carga correctamente -->
          <div v-if="!loadingActividadesSubscribed && totalPages > 0" class="w-full px-4 py-6">
            <div class="text-base">
              <template v-for="actividad in paginatedItems" :key="actividad.id">
                <div
                  class="flex flex-col dark:bg-[#1e293b] col-span-12 p-5 md:col-span-6 xl:col-span-4 box box--stacked mb-4"
                >
                  <span
                    class="pr-3 p-1 mr-2 font-medium text-primary text-[0.94rem] dark:text-white"
                    href="#"
                  >
                    {{ actividad.name }}
                  </span>
                  <div class="mt-1 mb-5 leading-relaxed text-justify p-1">
                    {{ actividad.description }}
                  </div>
                  <Menu class="absolute top-0 right-0 mt-5 mr-5">
                    <Menu.Button class="w-5 h-5 text-slate-500">
                      <Lucide
                        icon="MoreVertical"
                        class="w-5 h-5 stroke-slate-400/70 fill-slate-400/70"
                      />
                    </Menu.Button>
                    <Menu.Items class="w-40">
                      <Menu.Item class="dark:text-blue-300 text-blue">
                        <Lucide icon="CheckCircle" class="w-4 h-4 mr-2 stroke-[1.3]" />
                        Ver objetivos
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                  <div
                    class="flex flex-col gap-3 pt-5 mt-auto border-t border-dashed border-slate-300/70"
                  >
                    <div class="flex items-center">
                      <div class="mr-4">Programa:</div>
                      <div class="ml-auto">
                        <div class="flex items-center text-xs rounded-md px-1.5">
                          <span class="mt-px dark:text-slate-200 text-sm text-warning text-right">
                            <span
                              class="p-1 tracking-wide rounded leading-6 text-warning bg-yellow-50 dark:bg-yellow-500/20 dark:text-white border-warning/5"
                              >{{ actividad.program_name }}</span
                            >
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <div class="mr-4">Área:</div>
                      <div class="ml-auto">
                        <div class="flex items-center text-xs rounded-md px-1.5 py-px">
                          <span class="mt-px dark:text-slate-200 text-sm"
                            ><span
                              class="text-info p-1 tracking-wide rounded leading-6 border-success/5 bg-blue-50 dark:bg-blue-500/20 dark:text-white"
                              >{{ actividad.area_name }}</span
                            ></span
                          >
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <div>Horario y días:</div>
                      <div class="ml-auto">
                        <a
                          href="#"
                          class="text-sm whitespace-nowrap underline decoration-dotted decoration-slate-500/30 underline-offset-[3px] truncate w-40 md:w-52 block text-right"
                        >
                          Ver horario
                        </a>
                      </div>
                    </div>
                    <div
                      class="dark:text-white flex items-center justify-between pt-4 border-t border-slate-200/80"
                    >
                      <div class="text-xs">
                        <div v-if="!actividad.sus" class="pr-2 text-sm">
                          ¡Haz clic aquí para suscribirte y no te lo pierdas!
                        </div>
                        <div v-else class="pr-2 text-sm">¡Ya estás suscrito! Te esperamos.</div>
                      </div>
                      <div v-if="!actividad.sus">
                        <Button
                          variant="outline-primary"
                          class="px-4 ml-auto border-primary/50 flex items-center dark:border-white dark:text-white"
                        >
                          <Lucide icon="UserPlus" class="stroke-[1.3] w-4 h-4 mr-2" />
                          Suscribirme
                        </Button>
                      </div>
                      <div v-else>
                        <Button
                          class="px-4 ml-auto bg-primary text-white flex items-center dark:bg-blue-700/20 dark:text-white"
                          disabled
                        >
                          <Lucide icon="UserCheck" class="stroke-[1.3] w-4 h-4 mr-2" />
                          Suscrito
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <!-- <div
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
        </div> -->
      </div>
    </Dialog.Panel>
    <!-- <Dialog.Panel>
      <div class="p-5 text-center">
        <div class="w-16 h-16 mx-auto mt-3">
          <Lucide
            v-if="!loadingDeleteChild"
            icon="XCircle"
            class="w-full h-full text-danger dark:text-red-500"
          />
          <LoadingIcon v-else icon="tail-spin" color="black" />
        </div>
        <div class="mt-5 text-3xl dark:text-slate-200">¿Está seguro?</div>
        <div class="mt-2 text-slate-500 dark:text-slate-400">
          ¿Realmente desea eliminar este registro?
          <br />
          Este proceso no puede deshacerse.
        </div>
      </div>
      <div class="px-5 pb-8 text-center space-x-8">
        <Button
          type="button"
          variant="outline-secondary"
          @click="setModalDeleteChild({ open: false })"
          class="w-24 mr-1 dark:text-slate-200"
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant="danger"
          class="w-24 dark:text-slate-200"
          @click="handleDeleteArea"
          ref="deleteButtonRef"
        >
          Eliminar
        </Button>
      </div>
    </Dialog.Panel> -->
  </Dialog>
  <!-- END: Modal Content -->
</template>
