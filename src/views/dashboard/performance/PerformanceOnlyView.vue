<script setup>
import { ref, onMounted, inject } from 'vue'
import Lucide from '@/components/base/Lucide'
import Button from '@/components/base/Button'
import LoadingIcon from '@/components/base/LoadingIcon'
import ActivityGradesModal from '@/components/Dashboard/children/ActivityGradesModal.vue'
import { useRouter } from 'vue-router'
import { Baseurl } from '@/utils/global'

const { childrens, loadingChildrens, errorChildrens, loadChildrens } = inject('childrens')
const router = useRouter()

// Variables para manejar el modal de actividades y calificaciones
const ModalActivityGrades = ref(false)
const selectedActivities = ref([])

// Función para abrir el modal y cargar las actividades
const openActivityGradesModal = (child) => {
  // Simulación de la carga de actividades (se debe reemplazar con una llamada real a la API)
  selectedActivities.value = [
    { id: 1, name: 'Matemáticas', grade: 85 },
    { id: 2, name: 'Ciencias', grade: 90 },
    { id: 3, name: 'Historia', grade: 75 }
  ]
  ModalActivityGrades.value = true
}

// Función para cerrar el modal
const closeActivityGradesModal = () => {
  ModalActivityGrades.value = false
}

// Cargar los hijos al iniciar el componente
onMounted(() => {
  loadChildrens()
})
</script>

<template>
  <ActivityGradesModal
    :ModalActivityGrades="ModalActivityGrades"
    :activities="selectedActivities"
    :closeModal="closeActivityGradesModal"
  />

  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12">
      <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div class="text-base font-medium group-[.mode--light]:text-white">Mis Hijos</div>
        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
          <Button
            variant="primary"
            @click="router.push({ name: 'addChildrens' })"
            class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
          >
            <Lucide icon="PenLine" class="stroke-[1.3] w-4 h-4 mr-2" />
            Agregar hijo
          </Button>
        </div>
      </div>
      <div class="mt-3.5">
        <div class="flex flex-col">
          <div class="overflow-hidden">
            <div class="grid grid-cols-12 px-5 gap-5">
              <!-- Cuando se termina de cargar los hijos, se muestra el contenido -->
              <template v-if="!loadingChildrens && !errorChildrens">
                <template v-for="(child, index) in childrens" :key="child.id">
                  <div
                    class="col-span-12 sm:col-span-6 xl:col-span-4 px-5 py-5 flex flex-col box box--stacked rounded-lg shadow-lg bg-white dark:bg-slate-800"
                  >
                    <div class="overflow-hidden rounded-lg h-52 image-fit relative">
                      <img
                        alt="Child Image"
                        class="rounded-md w-full h-full object-cover"
                        :src="`${Baseurl}${child.photo}`"
                      />
                      <div class="absolute bottom-0 w-full p-4 bg-gradient-to-t from-slate-900/90 text-white">
                        <span class="text-lg font-semibold">{{ child.name }}</span>
                      </div>
                    </div>
                    <div class="pt-4 flex flex-col gap-3">
                      <Button
                        class="flex items-center bg-green-400 w-100"
                        variant="warning"
                        @click="() => openActivityGradesModal(child)"
                      >
                        <Lucide icon="NotebookPen" class="w-4 h-4 text-black mr-2" /> Ver Calificaciones
                      </Button>
                    </div>
                  </div>
                </template>
              </template>

              <!-- Cuando se está cargando los hijos, se muestra el icono de carga -->
              <template v-if="loadingChildrens && !errorChildrens">
                <div class="col-span-12 flex items-center justify-center">
                  <LoadingIcon icon="tail-spin" color="gray" class="font-bold w-20" />
                </div>
              </template>

              <!-- Cuando hay un error al cargar los hijos, se muestra el mensaje de error -->
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
