<script setup>
import { ref } from 'vue'
import Button from '@/components/base/Button'
import Diario from '@/views/dashboard/activities/book/diario.vue'
import Lucide from '@/components/base/Lucide'

const showDiario = ref(false)

const openDiario = () => {
  showDiario.value = true
}

const closeDiario = () => {
  showDiario.value = false
}

// Datos de ejemplo para los elementos
const items = [
  {
    title: 'Título del Elemento 1',
    description: 'Descripción del Elemento 1',
    additionalInfo: 'Información Adicional 1'
  },
  {
    title: 'Título del Elemento 2',
    description: 'Descripción del Elemento 2',
    additionalInfo: 'Información Adicional 2'
  },
  {
    title: 'Título del Elemento 3',
    description: 'Descripción del Elemento 3',
    additionalInfo: 'Información Adicional 3'
  }
]
</script>
<template>
  <div class="flex flex-col gap-y-6" id="customList">
    <!-- Encabezado -->
    <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
      <div class="text-base font-medium group-[.mode--light]:text-white">Diario</div>
      <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
        <Button
          variant="primary"
          id="button-add-user"
          class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
          @click="
            () => {
              router.push({
                name: 'addUser'
              })
            }
          "
        >
          <Lucide icon="PenLine" class="stroke-[1.3] w-4 h-4 mr-2" /> Agregar nuevo diario
        </Button>
      </div>
    </div>

    <!-- Contenedor principal -->
    <div class="bg-white dark:bg-[#28334e] w-full min-h-screen rounded-xl p-6 dark:text-slate-200">
      <div class="w-full space-y-5">
        <!-- Lista de elementos -->
        <div
          v-for="(item, index) in items"
          :key="index"
          class="relative flex items-center gap-3.5 p-5 box box--stacked"
        >
          <!-- Área de información -->
          <div class="flex-grow min-w-0">
            <h3 class="text-medium text-primary truncate dark:text-slate-200">
              {{ item.title }}
            </h3>
            <p class="mt-1 leading-relaxed text-slate-500 truncate dark:text-slate-400">
              {{ item.description }}
            </p>
            <p class="mt-1 text-slate-500">
              {{ item.additionalInfo }}
            </p>
          </div>

          <!-- Botón -->
          <div class="flex-shrink-0">
            <Button
              variant="outline-primary"
              class="w-[100px] p-1.5 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-600/10"
              @click="openDiario"
            >
              Open Diario
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Diario -->
    <Diario :ModalEditUser="showDiario" :setModalEditUser="closeDiario" :infoUser="{}" />
  </div>
</template>
