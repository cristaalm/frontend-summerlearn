<script setup>
import { FormInput, FormSelect } from '@/components/base/Form'
import { Dialog } from '@/components/base/Headless'
import { useProgramEdit } from '@/hooks/programs/editProgram/useProgramEdit'
import formatDate from '@/logic/formatDate'
import Litepicker from '@/components/base/Litepicker'
import LoadingIcon from '@/components/base/LoadingIcon'
import Button from '@/components/base/Button'
import Lucide from '@/components/base/Lucide'
import { ref, inject, watch, onUnmounted } from 'vue'

// obtenemos las props del componente padre
const props = defineProps({
  ModalEditProgram: Boolean,
  setModalEditProgram: Function,
  infoProgram: Object
})

const { users, loadingResponsable, errorResponsable } = inject('usersPrograms')
const { areas, loadingAreas, errorAreas } = inject('areasPrograms')
const { grades, loadingGrades, errorGrades } = inject('gradesPrograms')
const newPogram = ref(null)
const { updateProgram, loadingEditProgram } = useProgramEdit()

const selectedUser = ref(null)
const selectedArea = ref(null)
const selectedGrade = ref(null)
const durationProgram = ref('')
const nameProgram = ref('')
const valid = ref(false)

//debug de los campos
watch(
  [
    () => nameProgram.value,
    () => selectedUser.value,
    () => selectedArea.value,
    () => selectedGrade.value,
    () => durationProgram.value
  ],
  (newVal) => {
    // validamos el nombre del programa que cumpla con el siguiente regex /^[0-9a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,!?;:-]+$/
    if (!/^[0-9a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,!?;:-]+$/.test(nameProgram.value)) {
      valid.value = false
      return
    }
    // validamos si los campos son diferentes a los originales
    if (
      newVal[0] !== props.infoProgram.name ||
      newVal[1] !== props.infoProgram.user.id ||
      selectedArea.value !== props.infoProgram.area.id ||
      selectedGrade.value !== props.infoProgram.grade.id ||
      durationProgram.value !==
        `${formatDate(props.infoProgram.start)} - ${formatDate(props.infoProgram.end)}`
    ) {
      valid.value = true
    } else {
      valid.value = false
    }
    newPogram.value = {
      name: nameProgram.value,
      user: selectedUser.value,
      area: selectedArea.value,
      grade: selectedGrade.value,
      duration: durationProgram.value
    }
  }
)

watch(
  () => props.infoProgram,
  (newVal) => {
    if (newVal) {
      nameProgram.value = newVal.name
      selectedUser.value = newVal.user.id
      selectedArea.value = newVal.area.id
      selectedGrade.value = newVal.grade.id
      durationProgram.value = `${formatDate(newVal.start)} - ${formatDate(newVal.end)}`
    }
  }
)

const handleUpdateProgram = () => {
  updateProgram({
    program: props.infoProgram,
    newProgram: newPogram,
    setModalEditProgram: props.setModalEditProgram
  })
}
</script>

<template>
  <!-- BEGIN: Large Modal Content -->
  <Dialog
    size="xl"
    :open="ModalEditProgram"
    @close="
      () => {
        if (loadingEditProgram) return
        setModalEditProgram({ open: false })
      }
    "
  >
    <Dialog.Panel class="text-center flex flex-col">
      <div
        class="flex flex-row px-10 py-5 justify-between items-center w-full dark:border-slate-600 border-slate-300 border-b"
      >
        <h2 class="text-2xl font-bold text-black dark:text-slate-200">Editar Programa</h2>
        <Lucide
          icon="XCircle"
          class="w-10 h-full text-danger cursor-pointer dark:text-red-500"
          @click="
            () => {
              if (loadingEditProgram) return
              setModalEditProgram({ open: false })
            }
          "
        />
      </div>

      <div class="flex flex-col">
        <div
          class="dark:border-slate-600 border-slate-300 border-b max-h-[70vh] overflow-y-auto scrollbar-custom"
        >
          <!-- ? ######################## Nombre del programa ######################## ? -->

          <div
            class="flex-col block py-5 my-5 sm:flex mx-5 px-5 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700"
          >
            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium text-black dark:text-slate-200">Nombre del programa</div>
                </div>
                <div
                  class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400"
                >
                  Por favor, ingrese el nombre del programa.
                </div>
              </div>
            </label>
            <div class="flex-1 w-full mt-3">
              <FormInput
                v-model="nameProgram"
                class="flex-1 mt-2 dark:text-slate-200"
                @keydown.enter.prevent="
                  () => {
                    if (valid && !loadingEditProgram) handleUpdateProgram()
                  }
                "
              />
            </div>
          </div>

          <!-- ? ######################## Responsable del programa ######################## ? -->

          <div
            class="py-5 my-5 flex flex-row justify-between mx-5 px-5 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700"
          >
            <label class="mb-0 text-right mr-14 w-2/4">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium text-black dark:text-slate-200">
                    Responsable del programa
                  </div>
                </div>
                <div
                  class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400"
                >
                  Por favor, seleccione el responsable.
                </div>
              </div>
            </label>
            <div class="w-2/6 mt-3 xl:mt-0">
              <FormSelect
                v-model="selectedUser"
                class="flex-1 mt-2 dark:text-slate-200"
                @keydown.enter.prevent="
                  () => {
                    if (valid && !loadingEditProgram) handleUpdateProgram()
                  }
                "
              >
                <template v-if="loadingResponsable">
                  <option :value="infoProgram.user.id">Cargando responsables...</option>
                </template>

                <template v-if="errorResponsable">
                  <option :value="infoProgram.user.id">Error al cargar los responsables</option>
                </template>

                <template v-if="!loadingResponsable">
                  <template v-for="user in users" :key="user.id">
                    <option :value="user.id">{{ user.name }}</option>
                  </template>
                </template>
              </FormSelect>
            </div>
          </div>

          <!-- ? ######################## Escolaridad del programa ######################## ? -->

          <div
            class="py-5 my-5 flex flex-row justify-between mx-5 px-5 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700"
          >
            <label class="mb-0 text-right mr-14 w-2/4">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium text-black dark:text-slate-200">
                    Escolaridad del programa
                  </div>
                </div>
                <div
                  class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400"
                >
                  Por favor, seleccione la escolaridad.
                </div>
              </div>
            </label>
            <div class="w-2/6 mt-3 xl:mt-0">
              <FormSelect
                v-model="selectedGrade"
                class="flex-1 mt-2 dark:text-slate-200"
                @keydown.enter.prevent="
                  () => {
                    if (valid && !loadingEditProgram) handleUpdateProgram()
                  }
                "
              >
                <template v-if="loadingGrades">
                  <option :value="infoProgram.grade.id">Cargando escolaridades...</option>
                </template>

                <template v-if="errorGrades">
                  <option :value="infoProgram.grade.id">Error al cargar las escolaridades</option>
                </template>

                <template v-if="!loadingGrades">
                  <template v-for="grade in grades" :key="grade.id">
                    <option :value="grade.id">{{ grade.description }}</option>
                  </template>
                </template>
              </FormSelect>
            </div>
          </div>

          <!-- ? ######################## Área del programa ######################## ? -->

          <div
            class="py-5 my-5 flex flex-row justify-between mx-5 px-5 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700"
          >
            <label class="mb-0 text-right mr-14 w-2/4">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium text-black dark:text-slate-200">Área del programa</div>
                </div>
                <div
                  class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400"
                >
                  Por favor, seleccione el área del programa.
                </div>
              </div>
            </label>
            <div class="w-2/6 mt-3 xl:mt-0">
              <FormSelect
                v-model="selectedArea"
                class="flex-1 mt-2 dark:text-slate-200"
                @keydown.enter.prevent="
                  () => {
                    if (valid && !loadingEditProgram) handleUpdateProgram()
                  }
                "
              >
                <template v-if="loadingAreas">
                  <option :value="infoProgram.area.id">Cargando Áreas...</option>
                </template>

                <template v-if="errorAreas">
                  <option :value="infoProgram.area.id">Error al cargar las Áreas</option>
                </template>

                <template v-if="!loadingAreas">
                  <template v-for="area in areas" :key="area.id">
                    <option :value="area.id">{{ area.name }}</option>
                  </template>
                </template>
              </FormSelect>
            </div>
          </div>

          <!-- ? ######################## Duración del programa ######################## ? -->

          <div
            class="py-5 my-5 flex flex-row justify-between mx-5 px-5 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700"
          >
            <label class="mb-0 text-right mr-14 w-2/4">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium text-black dark:text-slate-200">
                    Duración del programa
                  </div>
                </div>
                <div
                  class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400"
                >
                  Por favor, seleccione la duración del programa.
                </div>
              </div>
            </label>
            <div class="w-2/6 mt-3 xl:mt-0">
              <Litepicker
                v-model="durationProgram"
                :options="{
                  autoApply: false,
                  singleMode: false,
                  numberOfColumns: 2,
                  numberOfMonths: 2,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: new Date().getFullYear(),
                    maxYear: new Date().getFullYear() + 1,
                    months: true,
                    years: true
                  },
                  format: 'DD/MM/YYYY'
                }"
                class="block w-full mx-auto dark:!text-slate-200 dark:read-only:!bg-slate-800 dark:placeholder:!text-slate-400 text-center !cursor-pointer"
                readonly
              />
            </div>
          </div>
        </div>
        <div class="flex py-5 md:justify-end px-7">
          <Button
            variant="outline-success"
            class="w-full px-10 md:w-auto dark:text-slate-200"
            @click="handleUpdateProgram"
            :disabled="loadingEditProgram || !valid"
          >
            <Lucide
              v-if="!loadingEditProgram"
              icon="Save"
              class="stroke-[1.3] w-4 h-4 mr-2 -ml-2 text-success dark:text-slate-200"
            />
            <LoadingIcon
              v-if="loadingEditProgram"
              icon="tail-spin"
              class="stroke-[1.3] w-4 h-4 mr-2 -ml-2"
              color="black"
            />
            {{ loadingEditProgram ? 'Guardando cambios...' : 'Guardar cambios' }}
          </Button>
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: Large Modal Content -->
</template>
