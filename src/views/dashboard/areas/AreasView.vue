<script setup lang="ts">
import { useRouter } from "vue-router";
import Lucide from "@/components/base/Lucide";
import { Menu } from "@/components/base/Headless";
import Pagination from "@/components/base/Pagination";
import { FormSelect } from "@/components/base/Form";
import Table from "@/components/base/Table";
import Button from "@/components/base/Button";
import { useAreas } from '@/hooks/useAreas'
import { ref, computed, onMounted } from 'vue'

const { areas, loading, error, loadAreas } = useAreas()
const pageSize = ref(10) // Número de elementos por página
const currentPage = ref(1) // Página actual
const router = useRouter();

// Cargar las áreas al iniciar el componente
onMounted(() => {
  loadAreas()
})

// Función para cambiar de página
const changePage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages.value) page = totalPages.value;
    currentPage.value = page;
}

// Función para cambiar el número de elementos por página
const changePageSize = (event) => {
  const select = event.target;
  const size = parseInt(select.value, 10);
  if (!isNaN(size) && size > 0) {
    pageSize.value = size
    currentPage.value = 1 // Reiniciar la página actual al cambiar el tamaño de página
  }
}

// Calcular el índice inicial y final de los elementos a mostrar en la tabla
const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
const endIndex = computed(() => startIndex.value + pageSize.value)

// Obtener los elementos a mostrar en la tabla según la página actual y el tamaño de página
const paginatedAreas = computed(() => areas.value.slice(startIndex.value, endIndex.value))

// Calcular el número total de páginas
const totalPages = computed(() => Math.ceil(areas.value.length / pageSize.value))

</script>

<template>
  
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12">
      <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div class="text-base font-medium group-[.mode--light]:text-white">
          Areas
        </div>
        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
          <Button
            variant="primary"
            class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
            @click="() => {
              router.push({
                name: 'addArea',
              });
            }"
          >
            <Lucide icon="PenLine" class="stroke-[1.3] w-4 h-4 mr-2" /> Agregar nueva area
          </Button>
        </div>
      </div>
      <div class="mt-3.5">
        <div class="flex flex-col box box--stacked">
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
                    Estado
                  </Table.Td>
                  <Table.Td
                    class="py-4 font-medium border-t text-center bg-slate-50 border-slate-200/60 text-slate-500"
                  >
                  </Table.Td>
                </Table.Tr>
              </Table.Thead>
              
              <!-- Mostrar 'Cargando información...' cuando loading es true -->
              <Table.Tbody v-if="loading">
                <Table.Tr>
                  <Table.Td colspan="3" class="py-8 text-center text-xl font-bold text-green-500">
                    Cargando información...
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>

              <!-- Mostrar mensaje de error cuando hay error -->
              <Table.Tbody v-if="error">
                <Table.Tr>
                  <Table.Td colspan="3" class="py-8 text-center text-xl font-bold text-red-500">
                    Error al cargar la información, Inténtelo más tarde
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
      
              <!-- Mostrar la tabla de áreas cuando no está cargando y no existe ningun error -->
              <Table.Tbody v-if="!loading">
                <template v-for="area in paginatedAreas" :key="area.id">
                  <Table.Tr class="[&_td]:last:border-b-0">
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600 text-center">
                      <a href="" class="font-medium whitespace-nowrap">
                        {{ area.name }}
                      </a>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600">
                      <div
                        :class="[ 'flex items-center justify-center', { 'text-success': area.isActive }, { 'text-danger': !area.isActive } ]"
                      >
                        <Lucide
                          icon="Database"
                          class="w-3.5 h-3.5 stroke-[1.7]"
                        />
                        <div class="ml-1.5 whitespace-nowrap">
                          {{ area.isActive ? "Activo" : "Inactivo" }}
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td
                      class="relative py-4 border-dashed dark:bg-darkmode-600"
                    >
                      <div class="flex items-center justify-end">
                        <Menu class="h-5">
                          <Menu.Button class="w-5 h-5 text-black">
                            <Lucide
                              icon="MoreVertical"
                              class="w-5 h-5 stroke-black fill-black"
                            />
                          </Menu.Button>
                          <Menu.Items class="w-40">
                            <Menu.Item>
                              <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
                              Edit
                            </Menu.Item>
                            <Menu.Item class="text-danger">
                              <Lucide icon="Trash2" class="w-4 h-4 mr-2" />
                              Delete
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

