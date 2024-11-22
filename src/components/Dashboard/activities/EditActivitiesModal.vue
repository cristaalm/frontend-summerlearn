<script setup>
import { FormInput, FormTextarea, FormSelect } from '@/components/base/Form'
import { Dialog } from '@/components/base/Headless'
import { useActivity } from '@/hooks/actividades/editActivity/useActivity'
import { useValidationEditActividades } from '@/hooks/actividades/editActivity/useValidationEditActividades'
import LoadingIcon from '@/components/base/LoadingIcon'
import Button from '@/components/base/Button'
import Lucide from '@/components/base/Lucide'
import Litepicker from '@/components/base/Litepicker'
import { ref, inject, watch, onUnmounted, computed, onMounted } from 'vue'

// obtenemos las props del componente padre
const props = defineProps({
  ModalEditActivity: Boolean,
  setModalEditActivity: Function,
  infoActivity: Object
})
const { status, name, description, responsible, program, date, valid, validate } = useValidationEditActividades()
const { users, loadingResponsable, errorResponsable, loadUsers } = inject('users')
const { programs, loadingPrograms, errorPrograms, loadPrograms } = inject('programs')
const { updateActivity, loadingEditActivity } = useActivity()
const filterUsers = computed(() => users.value.filter((user) => user.rol === 4))
const programSelect = computed(() => programs.value.find((programList) => programList.id == program.value))
const newActivity = ref(null)
const isChange = ref(false)

watch(
  () => props.infoActivity,
  (newVal) => {
    if (newVal) {
      // validamos despues de asignar los valores
      name.value = newVal.name
      validate({ target: { name: 'name', value: newVal.name } }, 'name')

      responsible.value = newVal.activities_user
      validate({ target: { name: 'responsible', value: newVal.activities_user } }, 'responsible')

      description.value = newVal.description
      validate({ target: { name: 'description', value: newVal.description } }, 'description')

      program.value = newVal.program_id
      validate({ target: { name: 'program', value: newVal.program_id } }, 'program')

      date.value = newVal.date.split('-').reverse().join('/')
    }
  }
)

watch([name, description, responsible, program, date], () => {

  // validamos si hay cambios
  if (
    name.value !== props.infoActivity.name ||
    description.value !== props.infoActivity.description ||
    responsible.value !== props.infoActivity.activities_user ||
    program.value !== props.infoActivity.program_id ||
    date.value !== props.infoActivity.date.split('-').reverse().join('/')
  ) {
    isChange.value = true
  } else {
    isChange.value = false
  }

  newActivity.value = {
    name: name.value,
    description: description.value,
    responsible: responsible.value,
    program: program.value,
    date: date.value.split('/').reverse().join('-')
  }
})

const handleUpdateActivity = () => {
  updateActivity({
    activity: props.infoActivity,
    newActivity: newActivity,
    setModalEditActivity: props.setModalEditActivity
  })
}

onMounted(async () => {
  loadUsers()
})
</script>

<template>
  <!-- BEGIN: Large Modal Content -->
  <Dialog size="xl" :open="ModalEditActivity" @close="() => {
    if (loadingEditActivity) return
    setModalEditActivity({ open: false })
  }
    ">
    <Dialog.Panel class="text-center flex flex-col">
      <div
        class="flex flex-row px-10 py-5 justify-between items-center w-full dark:border-slate-600 border-slate-300 border-b">
        <h2 class="text-2xl font-bold text-black dark:text-slate-200">Editar Actividad</h2>
        <Lucide icon="XCircle" class="w-10 h-full text-danger cursor-pointer dark:text-red-500" @click="() => {
          if (loadingEditActivity) return
          setModalEditActivity({ open: false })
        }
          " />
      </div>

      <div class="flex flex-col">
        <div class="dark:border-slate-600 border-slate-300 border-b max-h-[70vh] overflow-y-auto scrollbar-custom">
          <div
            class="flex-col block py-5 my-5 sm:flex mx-5 px-5 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700">
            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium text-black dark:text-slate-200">Nombre de actividad</div>
                </div>
                <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                  Por favor, ingrese el nombre de la actividad.
                </div>
              </div>
            </label>
            <div class="flex-1 w-full mt-3">
              <FormInput v-model="name" class="flex-1 mt-2 dark:text-slate-200" @keydown.enter.prevent="() => {
                if (valid && !loadingEditActivity && isChange) handleUpdateActivity()
              }
                " @input="(e) => validate(e, 'name')" />
            </div>
          </div>

          <!-- Description -->
          <div
            class="flex-col block py-5 my-5 sm:flex mx-5 px-5 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700">
            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium dark:text-slate-200">Descripción</div>
                  <div
                    class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500">
                    Requerido
                  </div>
                </div>
                <div class="mt-1.5 xl:mt-3 text-xs text-slate-500/80 dark:text-slate-400">
                  Por favor, ingrese su descripción.
                </div>
              </div>
            </label>
            <div class="flex-1 w-full mt-3 xl:mt-0">
              <FormTextarea style="resize: none; height: 8.6rem" @keydown.enter.prevent="() => {
                if (valid && !loadingEditActivity && isChange) handleUpdateActivity()
              }
                " @input="(e) => validate(e, 'description')"
                class="dark:text-slate-200 dark:placeholder:!text-slate-400" v-model="description" />
            </div>
          </div>

          <!-- Programa -->
          <div
            class="flex-col block py-5 my-5 sm:flex mx-5 px-5 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700">
            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium dark:text-slate-200">Programa</div>
                  <div
                    class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500">
                    Requerido
                  </div>
                </div>
                <div class="mt-1.5 xl:mt-3 text-xs text-slate-500/80 dark:text-slate-400">
                  Por favor, seleccione el programa relacionado.
                </div>
              </div>
            </label>
            <div class="flex-1 w-full mt-3 xl:mt-0">
              <FormSelect v-model="program" @input="(e) => validate(e, 'program')" @keydown.enter.prevent="() => {
                if (valid && !setActividadesLoading) handleRegister()
              }
                " class="dark:text-slate-200 dark:placeholder:!text-slate-400">
                <template v-if="loadingPrograms">
                  <option value="" disabled selected>Cargando...</option>
                </template>

                <template v-else-if="errorPrograms">
                  <option value="" disabled selected>Error al cargar los programas</option>
                </template>

                <template v-else>
                  <template v-for="program in programs" :key="program.id">
                    <option :value="program.id">
                      {{ program.name }} - ({{ program.start.split('-').reverse().join('/') }} -
                      {{ program.end.split('-').reverse().join('/') }})
                    </option>
                  </template>
                </template>
              </FormSelect>
              <div class="mt-1 text-xs text-red-500 h-4" v-if="status.program.message">
                {{ status.program.message }}
              </div>
            </div>
          </div>

          <!-- Date -->
          <div
            class="flex-col block py-5 my-5 sm:flex mx-5 px-5 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700">
            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium dark:text-slate-200">Fecha de actividad</div>
                  <div
                    class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500">
                    Requerido
                  </div>
                </div>
                <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                  Por favor, ingrese la fecha de la actividad.
                </div>
              </div>
            </label>
            <div class="flex-1 w-full mt-3 xl:mt-0">
              <Litepicker v-model="date" name="birthdate"
                class="cursor-[pointer!important] dark:!text-slate-200 dark:placeholder:!text-slate-400" readonly
                :options="{
                  autoApply: false,
                  dropdowns: {
                    minYear: new Date().getFullYear() - 1,
                    maxYear: new Date().getFullYear() + 1,
                    months: true,
                    years: true
                  },
                  format: 'DD/MM/YYYY'
                }" placeholder="DD/MM/YYYY" />

              <div class="text-red-500 mt-2 dark:text-red-400" v-if="status.date.message">
                {{ status.date.message }}
              </div>
              <div class="mt-1 text-xs text-green-500 h-4" v-if="program">
                {{ programSelect.start.split('-').reverse().join('/') }}
                <span class="mx-1">-</span>
                {{ programSelect.end.split('-').reverse().join('/') }}
              </div>
            </div>
          </div>

          <div
            class="py-5 my-5 flex flex-row justify-between mx-5 px-5 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700">
            <label class="mb-0 text-right mr-14 w-2/4">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium text-black dark:text-slate-200">Responsable</div>
                </div>
                <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                  Por favor, seleccione el responsable.
                </div>
              </div>
            </label>
            <div class="w-2/6 mt-3 xl:mt-0">
              <FormSelect v-model="responsible" class="flex-1 mt-2 dark:text-slate-200" @keydown.enter.prevent="() => {
                if (valid && !loadingEditActivity && isChange) handleUpdateActivity()
              }
                " @input="(e) => validate(e, 'responsible')">
                <!--? Mostrar 'Cargando roles...' cuando loadingResponsable es true -->
                <template v-if="loadingResponsable">
                  <option :value="infoActivity.user.id">Cargando roles...</option>
                </template>

                <!--? Mostrar mensaje de error cuando hay errorRoles -->
                <template v-if="errorResponsable">
                  <option :value="infoActivity.user.id">Error al cargar roles</option>
                </template>

                <!--? Mostrar los roles cuando no está cargando y no existe ningun errorRoles -->
                <template v-if="!loadingResponsable">
                  <template v-for="user in filterUsers" :key="user.id">
                    <option :value="user.id">{{ user.name }}</option>
                  </template>
                </template>
              </FormSelect>
            </div>
          </div>
        </div>

        <div class="flex py-5 md:justify-end px-7">
          <Button variant="outline-success" class="w-full px-10 md:w-auto dark:text-slate-200"
            @click="handleUpdateActivity" :disabled="loadingEditActivity || !valid || !isChange">
            <Lucide v-if="!loadingEditActivity" icon="Save"
              class="stroke-[1.3] w-4 h-4 mr-2 -ml-2 text-success dark:text-slate-200" />
            <LoadingIcon v-if="loadingEditActivity" icon="tail-spin" class="stroke-[1.3] w-4 h-4 mr-2 -ml-2"
              color="black" />
            {{ loadingEditActivity ? 'Guardando cambios...' : 'Guardar cambios' }}
          </Button>
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: Large Modal Content -->
</template>
