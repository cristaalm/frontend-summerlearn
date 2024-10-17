<script setup>
import { useRouter } from 'vue-router'
import Lucide from '@/components/base/Lucide'
import { FormInput, FormTextarea, FormSelect } from '@/components/base/Form'
import { Menu, Popover, Dialog } from '@/components/base/Headless'
import Pagination from '@/components/base/Pagination'
import Table from '@/components/base/Table'
import LoadingIcon from '@/components/base/LoadingIcon'
import { ref, onMounted } from 'vue'
import Button from '@/components/base/Button'
import {
  useSearch,
  usePagination,
  // useActividades,
  useDialogObjective,
  useDialogDelete
} from '@/hooks/actividades/'
import { useAreasInSubs } from '@/hooks/areas/'
import { useDialogSubConfirm, useActividades } from '@/hooks/subscriptions/'
import { useObjectives } from '@/services/actividades/useObjectives'

const { actividades, loading, error, loadActividades } = useActividades()
const { searchQuery, selectedArea, filteredActividades, filtersCount } = useSearch(actividades)
const { currentPage, pageSize, totalPages, paginatedItems, changePage, changePageSize } =
  usePagination(filteredActividades)

const { areasSub, loadingSub, errorSub, loadAreasSub } = useAreasInSubs()

const { objectives, loadingObjectives, errorObjectives, loadObjectives } = useObjectives()
const { dialogStatusObjective, openObjectiveModal, closeAddObjective } = useDialogObjective({
  actividades
})

const confirmarYRecargar = async () => {
  try {
    await confirmSubscription() // Espera a que se complete la suscripción
    await loadActividades() // Carga las actividades después de la confirmación
    closeModalSubConfirm() // Cierra el modal después de recargar las actividades
  } catch (error) {
    console.error('Error al confirmar la suscripción:', error)
  }
}

const {
  dialogStatusModalSubConfirm,
  openModalSubConfirm,
  closeModalSubConfirm,
  confirmSubscription
} = useDialogSubConfirm({
  actividades
})

const id_actividad = ref(null) // Variable reactiva para guardar el ID
// Función para guardar el ID
const guardarId = (id) => {
  id_actividad.value = id
  loadObjectives(id_actividad.value)
    .then(() => {
      console.log('Objetivos cargados:', objectives.value)
    })
    .catch((error) => {
      console.error('Error al cargar objetivos:', error)
    })
}

const nombre_actividad = ref(null) // Variable reactiva para guardar el ID
// Función para guardar el ID
const guardarNombre = (nombre) => {
  nombre_actividad.value = nombre
}

onMounted(() => {
  loadActividades()
  loadAreasSub()
})
</script>

<template>
  <!-- BEGIN: Modal Content -->
  <Dialog :open="dialogStatusObjective" @close="dialogStatusObjective = false">
    <Dialog.Panel>
      <div class="p-6">
        <div class="mt-2 text-slate-500 dark:text-slate-400">
          <template v-if="loadingObjectives">
            <p class="text-success text-">Cargando objetivos...</p>
          </template>
          <template v-else-if="errorObjectives">
            <p class="text-danger">Error al cargar objetivos</p>
          </template>

          <span class="font-bold text-left text-primary text-xl mb-2 dark:text-white/90">
            Objetivos de la Actividad:
          </span>
          <template v-if="!loadingObjectives && objectives.length">
            <ul class="list-disc pl-5 text-justify dark:text-white/80">
              <template v-for="objective in objectives" :key="objective.id">
                <li class="text-base">
                  {{ objective.description }}
                </li>
              </template>
            </ul>
          </template>
          <template v-else>
            <p class="text-danger dark:text-white/80">No hay objetivos disponibles.</p>
          </template>
        </div>
      </div>
      <div class="px-5 pb-8 text-center space-x-8">
        <Button
          type="button"
          variant="outline-secondary "
          @click="closeAddObjective"
          class="w-24 mr-1 dark:border-white dark:text-white hover:bg-red/10"
        >
          Cancelar
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: Modal Content -->

  <!-- BEGIN: Modal Content -->
  <Dialog
    size="lg"
    :open="dialogStatusModalSubConfirm"
    @close="
      () => {
        dialogStatusModalSubConfirm.value = false
      }
    "
  >
    <Dialog.Panel>
      <div class="p-8 text-center">
        <Lucide
          icon="CheckCircle"
          class="w-16 h-16 mx-auto mt-3 text-success dark:text-green-700"
        />
        <div class="mt-5 text-3xl dark:text-slate-200 pb-2">
          ¿Desea suscribirse a la actividad "{{ nombre_actividad }}"?
        </div>
        <div class="mt-2 text-slate-500 dark:text-slate-400">
          Esta acción es irreversible. Por favor, confirme si desea continuar.
        </div>
      </div>
      <div class="px-5 pb-8 text-center space-x-8">
        <Button
          type="button"
          variant="outline-secondary"
          @click="closeModalSubConfirm"
          class="w-24 mr-1"
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant="success"
          class="w-24 text-white"
          @click="confirmarYRecargar"
          ref="deleteButtonRef"
        >
          Confirmar
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: Modal Content -->

  <div class="mt-3.5 px-4 py-8">
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
              placeholder="Buscar nombre de actividad..."
              class="pl-9 sm:w-72 rounded-[0.5rem] dark:text-slate-200"
            />
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
          <Popover class="inline-block" v-slot="{ close }">
            <Popover.Button :as="Button" variant="outline-primary" class="w-full sm:w-auto">
              <Lucide icon="ArrowDownWideNarrow" class="stroke-[1.3] w-4 h-4 mr-2" />
              Filtrar
              <div
                class="flex items-center justify-center h-5 px-1.5 ml-2 text-xs font-medium border rounded-full bg-slate-100 dark:text-black"
              >
                {{ filtersCount }}
              </div>
            </Popover.Button>
            <Popover.Panel placement="bottom-end">
              <div class="p-2 space-y-4">
                <div>
                  <div class="text-left text-slate-500 dark:text-slate-200">Áreas</div>
                  <FormSelect
                    v-model="selectedArea"
                    class="flex-1 mt-2 dark:text-slate-200"
                    @change="close()"
                  >
                    <!-- Maneja los estados de carga y error -->
                    <template v-if="loadingSub">
                      <option>Cargando areasSub...</option>
                    </template>

                    <template v-if="errorSub">
                      <option>Error al cargar areasSub</option>
                    </template>

                    <template v-if="!loadingSub">
                      <option :value="null">Todos</option>
                      <template v-for="area in areasSub" :key="area.id">
                        <option :value="area.name">{{ area.name }}</option>
                      </template>
                    </template>
                  </FormSelect>
                </div>
                <div class="flex items-center mt-4">
                  <Button
                    variant="secondary"
                    @click="
                      () => {
                        close()
                      }
                    "
                    class="w-32 ml-auto"
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            </Popover.Panel>
          </Popover>
        </div>
      </div>
      <div
        class="bg-white dark:bg-[#28334e] w-full min-h-screen rounded-xl flex flex-col items-center dark:text-slate-200"
      >
        <!-- Muestra el ícono de carga si la información aún se está cargando -->
        <div v-if="loading" class="py-8 text-center text-xl font-bold text-green-500">
          <LoadingIcon icon="tail-spin" class="h-4" color="black" />
          <div class="mt-2">Cargando información...</div>
        </div>

        <!-- Muestra un mensaje de error si ocurrió algún problema al cargar los datos -->
        <div v-if="error" class="py-8 text-center text-xl font-bold text-red-500">
          Error al cargar la información, inténtelo más tarde.
        </div>

        <!-- Muestra un mensaje si no se encuentran actividades -->
        <div
          v-if="!loading && totalPages <= 0 && !error"
          class="py-8 text-center text-xl font-bold text-amber-500"
        >
          No se encontraron actividades.
        </div>

        <!-- Muestra las actividades si todo carga correctamente -->
        <div v-if="!loading && totalPages > 0" class="w-full px-4 py-6">
          <div class="grid grid-cols-12 gap-y-10 gap-x-6 text-base">
            <template v-for="actividad in paginatedItems" :key="actividad.id">
              <div
                class="flex flex-col dark:bg-[#1e293b] col-span-12 p-5 md:col-span-6 xl:col-span-4 box box--stacked"
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
                    <Menu.Item
                      class="dark:text-blue-300 text-blue"
                      @click="
                        () => {
                          openObjectiveModal(actividad.id)
                          guardarId(actividad.id)
                        }
                      "
                    >
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
                        @click="
                          () => {
                            openModalSubConfirm(actividad.id)
                            guardarNombre(actividad.name)
                          }
                        "
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
</template>
