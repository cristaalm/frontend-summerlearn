<script setup>
import Lucide from '@/components/base/Lucide'
import Button from '@/components/base/Button'
import Alert from '@/components/base/Alert'
import Litepicker from '@/components/base/Litepicker'
import LoadingIcon from '@/components/base/LoadingIcon'
import {
  useRefs,
  useValidations,
  useStatus,
  useAreas,
  useUsers,
  useSetProgram,
  useGrades
} from '@/hooks/programs/addProgram/'
import { FormInput, FormSelect } from '@/components/base/Form'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { name, duration, responsible, area, grade } = useRefs()
const { status } = useStatus()
const { valid } = useValidations({ status, name, duration, responsible, area })
const { areas, loadingAreas, errorAreas, loadAreas } = useAreas()
const { grades, loadingGrades, errorGrades, loadGrades } = useGrades()
const { users, loadingResponsable, errorResponsable, loadUsers } = useUsers()
const { setProgramLoading, setProgramError, addProgram } = useSetProgram()

onMounted(() => {
  loadAreas()
  loadUsers()
  loadGrades()
})

const handleRegister = () => {
  if (valid) {
    const program = {
      name: name.value,
      duration: duration.value,
      responsible: responsible.value,
      area: area.value,
      grade: grade.value
    }
    console.log(program)
    addProgram({ program })
  }
}
</script>

<template>
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12 sm:col-span-10 sm:col-start-2">
      <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div class="text-base font-medium group-[.mode--light]:text-white">Agregar Programa</div>
        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
          <Button
            variant="primary"
            class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
            @click="
              () => {
                router.push({
                  name: 'programs'
                })
              }
            "
          >
            <Lucide icon="ArrowLeft" class="stroke-[1.3] w-4 h-4 mr-2" /> Regresar
          </Button>
        </div>
      </div>
      <div class="mt-7">
        <div class="flex flex-col box box--stacked">
          <div class="p-7">
            <!--? ######################### ALERTA DE ERROR ######################### -->

            <Alert
              variant="outline-danger"
              v-if="setProgramError"
              class="flex items-center px-4 py-3 my-7 bg-danger/5 border-danger/20 rounded-[0.6rem] leading-[1.7]"
              v-slot="{ dismiss }"
            >
              <div class="">
                <Lucide
                  icon="AlertTriangle"
                  class="stroke-[0.8] stroke-danger w-7 h-7 mr-2 fill-danger/10"
                />
              </div>
              <div class="ml-1 mr-8">
                <span class="text-danger">{{ setProgramError }}</span>
              </div>
              <Alert.DismissButton
                type="button"
                class="btn-close text-danger"
                @click="dismiss"
                aria-label="Cerrar"
              >
                <Lucide icon="X" class="w-5 h-5" />
              </Alert.DismissButton>
            </Alert>

            <!--? ######################### INPUTS ######################### -->

            <div
              class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0"
            >
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Nombre del programa</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200"
                    >
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                    Por favor, ingrese el nombre del programa
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput
                  type="text"
                  placeholder="Escriba aqui el nombre del programa..."
                  v-model="name"
                />
                <div class="mt-1 text-xs text-red-500 h-4">
                  {{ status.name.message }}
                </div>
              </div>
            </div>

            <div
              class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0"
            >
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Escolaridad</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200"
                    >
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                    Por favor, seleccione la escolaridad del programa
                  </div>
                </div>
              </label>

              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormSelect v-model="grade">
                  <template v-if="loadingGrades">
                    <option value="" disabled selected>Cargando...</option>
                  </template>

                  <template v-else-if="errorGrades">
                    <option value="" disabled selected>Error al cargar la escolaridad</option>
                  </template>

                  <template v-else>
                    <option value="" disabled selected>Seleccione una escolaridad...</option>
                    <template v-for="grade in grades" :key="grade.id">
                      <option :value="grade.id">
                        {{ grade.description }}
                      </option>
                    </template>
                  </template>
                </FormSelect>
                <!-- <div class="mt-1 text-xs text-red-500 h-4">
                                    {{ status.grade.message }}
                                </div> -->
              </div>
            </div>

            <div
              class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0"
            >
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium text-nowrap">Duración del programa</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200"
                    >
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                    Por favor, Ingresa la duración del programa
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <Litepicker
                  v-model="duration"
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
                  class="block w-full mx-auto"
                />
                <div class="text-red-500 mt-2">
                  {{ status.duration.message }}
                </div>
              </div>
            </div>

            <div
              class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0"
            >
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Responsable</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200"
                    >
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                    Por favor, seleccione el responsable del programa
                  </div>
                </div>
              </label>

              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormSelect v-model="responsible">
                  <template v-if="loadingResponsable">
                    <option value="" disabled selected>Cargando...</option>
                  </template>

                  <template v-else-if="errorResponsable">
                    <option value="" disabled selected>Error al cargar los responsables</option>
                  </template>

                  <template v-else>
                    <option value="" disabled selected>Seleccione un responsable...</option>
                    <template v-for="user in users" :key="user.id">
                      <option :value="user.id">
                        {{ user.name }}
                      </option>
                    </template>
                  </template>
                </FormSelect>
                <div class="mt-1 text-xs text-red-500 h-4">
                  {{ status.responsible.message }}
                </div>
              </div>
            </div>

            <div
              class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0"
            >
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Área</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200"
                    >
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                    Por favor, seleccione el área del programa
                  </div>
                </div>
              </label>

              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormSelect v-model="area">
                  <template v-if="loadingAreas">
                    <option value="" disabled selected>Cargando...</option>
                  </template>

                  <template v-else-if="errorAreas">
                    <option value="" disabled selected>Error al cargar las areas</option>
                  </template>

                  <template v-else>
                    <option value="" disabled selected>Seleccione una area...</option>
                    <template v-for="area in areas" :key="area.id">
                      <option :value="area.id">
                        {{ area.name }}
                      </option>
                    </template>
                  </template>
                </FormSelect>
                <div class="mt-1 text-xs text-red-500 h-4">
                  {{ status.area.message }}
                </div>
              </div>
            </div>
          </div>

          <!--? ######################### BOTON DE REGISTRO ######################### -->

          <div class="flex py-5 border-t md:justify-end px-7 border-slate-200/80">
            <Button
              :class="`w-full px-10 md:w-auto font-bold ${setProgramLoading || !valid ? 'border-gray-500 text-gray-500' : 'border-green text-green'}`"
              @click="handleRegister"
              :disabled="!valid || setProgramLoading"
            >
              <LoadingIcon
                v-if="setProgramLoading"
                icon="tail-spin"
                class="stroke-[1.3] w-4 h-4 mr-2 -ml-2"
                color="black"
              />

              <Lucide v-if="!setProgramLoading" icon="Check" class="stroke-[1.3] w-4 h-4 mr-2" />
              {{ setProgramLoading ? 'Registrando...' : 'Registrar' }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
