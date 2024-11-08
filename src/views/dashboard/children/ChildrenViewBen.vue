<script setup>
import { FormInput, FormSelect } from '@/components/base/Form'
import Pagination from '@/components/base/Pagination'
import { Menu } from '@/components/base/Headless'
import { usePagination, useSearch, useChildrens } from '@/hooks/childrens/'
import { onMounted, inject } from 'vue'
import Lucide from '@/components/base/Lucide'
import Button from '@/components/base/Button'
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
        <div class="text-base font-medium group-[.mode--light]:text-white" @click="() => {
          errorChildrens = true
        }">
          Hijos
        </div>
        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
          <Button variant="primary" @click="router.push({ name: 'addChildrens' })" class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200
            group-[.mode--light]:!border-transparent">
            <Lucide icon="PenLine" class="stroke-[1.3] w-4 h-4 mr-2" />
            Agregar hijo
          </Button>
        </div>
      </div>
      <div class="mt-3.5">
        <div class="flex flex-col">
          <div class="overflow-hidden">
            <div class="grid grid-cols-12 px-5 gap-5">

              <!-- ? Cuando se termina de cargar los hijos, se muestra el contenido -->
              <template v-if="!loadingChildrens && !errorChildrens" v-for="(child, index) in childrens" :key="child.id">
                <div class="col-span-12 sm:col-span-6 xl:col-span-4 px-5 py-5 flex flex-col box box--stacked">
                  <div
                    class="overflow-hidden rounded-lg h-52 image-fit before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-slate-900/90 before:to-black/20">
                    <img alt="Tailwise - Admin Dashboard Template" class="rounded-md select-none"
                      :src="`${Baseurl}${child.photo}`" />
                    <div class="absolute bottom-0 z-10 w-full px-5 pb-6 text-white">
                      <span class="block text-lg font-medium truncate">
                        {{ child.name }}
                      </span>
                      <span class="mt-3 text-xs text-white/80">
                        {{ child.curp }}
                      </span>
                    </div>
                  </div>
                  <div class="pt-5">
                    <div class="flex flex-col gap-3.5 mb-5 pb-5 mt-auto border-b border-dashed border-slate-300/70">
                      <div class="flex items-center">
                        <div class="text-slate-500 dark:text-slate-200">Fecha de nacimineto:</div>
                        <div class="ml-auto">
                          <div
                            class="flex items-center text-xs font-medium rounded-md text-success dark:text-slate-400 bg-success/10 border border-success/10 px-1.5 py-px">
                            <span class="-mt-px">
                              {{ child.birthdate }}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center">
                        <div class="text-slate-500 dark:text-slate-200">Edad:</div>
                        <div class="ml-auto">
                          <div
                            class="flex items-center text-xs font-medium rounded-md text-success dark:text-slate-400 bg-success/10 border border-success/10 px-1.5 py-px">
                            <span class="-mt-px">
                              {{ calculateAge(child.birthdate) }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center justify-end">
                      <Button class="flex items-center mr-3" variant="success">
                        <Lucide icon="CheckSquare" class="w-4 h-4 stroke-[1.3] text-white" />
                      </Button>
                      <Button class="flex items-center text-danger" variant="danger">
                        <Lucide icon="Trash2" class="w-4 h-4 stroke-[1.3] text-white" />
                      </Button>
                    </div>
                  </div>
                </div>
              </template>

              <!-- ? Cuando se está cargando los hijos, se muestra el icono de carga -->
              <template v-if="loadingChildrens && !errorChildrens">
                <div class="col-span-12 flex items-center justify-center">
                  <LoadingIcon icon="tail-spin" color="gray" class="font-bold w-20" />
                </div>
              </template>

              <!-- ? Cuando hay un error al cargar los hijos, se muestra el mensaje de error -->
              <template v-if="errorChildrens">
                <div class="col-span-12 flex items-center justify-center">
                  <div class="text-danger dark:text-red-500">
                    Ocurre un error al cargar los hijos
                  </div>
                </div>
              </template>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
