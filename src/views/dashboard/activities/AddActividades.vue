<script setup>
import Lucide from '@/components/base/Lucide'
import Button from '@/components/base/Button'
import Alert from '@/components/base/Alert'
import LoadingIcon from '@/components/base/LoadingIcon'
import { FormInput, FormTextarea, FormSelect } from '@/components/base/Form'
import { onMounted, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useValidationAddActividades } from '@/hooks/actividades/addActividades/useValidationAddActividades'
import { useSetActividades } from '@/hooks/actividades/addActividades'

const router = useRouter()
const { users, loadingResponsable, errorResponsable, loadUsers } = inject('users')
const { programs, loadingPrograms, errorPrograms, loadPrograms } = inject('programs')
const { setActividadesLoading, setActividadesError, addActividades } = useSetActividades()
const { status, name, description, responsible, program, valid, validate } = useValidationAddActividades()

const filterUsers = computed(() => users.value.filter(user => user.rol === 4))

const handleRegister = () => {
  if (valid.value) {
    const actividad = {
      name: name.value,
      description: description.value,
      responsible: responsible.value,
      program: program.value
    }
    addActividades({ actividad })
  }
}

onMounted(async () => {
  loadUsers()
  loadPrograms()
})
</script>

<template>
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12 sm:col-span-10 sm:col-start-2">
      <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div class="text-base font-medium group-[.mode--light]:text-white">Agregar Actividad</div>
        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
          <Button variant="primary" @click="() => router.push({ name: 'activities' })"
            class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent">
            <Lucide icon="ArrowLeft" class="stroke-[1.3] w-4 h-4 mr-2" /> Regresar
          </Button>
        </div>
      </div>

      <div class="mt-7">
        <div class="flex flex-col box box--stacked">
          <div class="p-7">


            <!--? Inicio de Alerta de Error -->
            <Alert variant="outline-danger" v-if="setActividadesError" :message="setActividadesError"
              :dismissible="true" class="flex items-center px-4 py-3 my-7" />
            <!--? Fin de Alerta de Error -->

            <!--? Inicio de Campos Entrada -->
            <!-- Activity Name -->
            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row">
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium dark:text-slate-200">Nombre de actividad</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500">
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs text-slate-500/80 dark:text-slate-400">
                    Por favor, ingrese nombre de actividad.
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput type="text" placeholder="Escriba aquí su nombre de actividad..." v-model="name"
                  @keydown.enter.prevent="() => {
                    if (valid && !setActividadesLoading) handleRegister()
                  }" class="dark:text-slate-200 dark:placeholder:!text-slate-400"
                  @input="(e) => validate(e, 'name')" />
                <div class="mt-1 text-xs text-red-500 h-4">{{ status.name.message }}</div>
              </div>
            </div>

            <!-- Description -->
            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row">
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
                <FormTextarea style="resize: none; height: 8.6rem" placeholder="Escriba aquí su descripción..."
                  @keydown.enter.prevent="() => {
                    if (valid && !setActividadesLoading) handleRegister()
                  }" class="dark:text-slate-200 dark:placeholder:!text-slate-400" v-model="description"
                  @input="(e) => validate(e, 'description')" />
                <div class="mt-1 text-xs text-red-500 h-4">{{ status.description.message }}</div>
              </div>
            </div>

            <!-- Responsable -->
            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row">
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium dark:text-slate-200">Responsable</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500">
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs text-slate-500/80 dark:text-slate-400">
                    Por favor, seleccione el nombre del responsable.
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormSelect v-model="responsible" @input="(e) => validate(e, 'responsible')" @keydown.enter.prevent="() => {
                  if (valid && !setActividadesLoading) handleRegister()
                }" class="dark:text-slate-200 dark:placeholder:!text-slate-400">
                  <template v-if="loadingResponsable">
                    <option value="" disabled selected>Cargando...</option>
                  </template>

                  <template v-else-if="errorResponsable">
                    <option value="" disabled selected>Error al cargar los responsables</option>
                  </template>

                  <template v-else>
                    <option value="" disabled selected>Seleccione aquí un responsable...</option>
                    <template v-for="user in filterUsers" :key="user.id">
                      <option :value="user.id">{{ user.name }}</option>
                    </template>
                  </template>
                </FormSelect>
                <div class="mt-1 text-xs text-red-500 h-4">
                  {{ status.responsible.message }}
                </div>
              </div>
            </div>

            <!-- Program -->
            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row">
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
                }" class="dark:text-slate-200 dark:placeholder:!text-slate-400">
                  <template v-if="loadingPrograms">
                    <option value="" disabled selected>Cargando...</option>
                  </template>

                  <template v-else-if="errorPrograms">
                    <option value="" disabled selected>Error al cargar los programas</option>
                  </template>

                  <template v-else>
                    <option value="" disabled selected>Seleccione aquí un programa...</option>
                    <template v-for="program in programs" :key="program.id">
                      <option :value="program.id">{{ program.name }}</option>
                    </template>
                  </template>
                </FormSelect>
                <div class="mt-1 text-xs text-red-500 h-4">
                  {{ status.program.message }}
                </div>
              </div>
            </div>
          </div>
          <!--? Fin de Campos Entrada -->

          <!-- Submit Button -->
          <div class="flex py-5 border-t md:justify-end px-7 border-slate-200/80 dark:border-slate-600">
            <Button
              :class="`w-full px-10 md:w-auto font-bold ${setActividadesLoading || !valid ? 'border-gray-500 text-gray-500' : 'border-green text-green'}`"
              @click="handleRegister" :disabled="!valid || setActividadesLoading">
              <LoadingIcon v-if="setActividadesLoading" icon="tail-spin" class="stroke-[1.3] w-4 h-4 mr-2 -ml-2"
                color="black" />

              <Lucide v-if="!setActividadesLoading" icon="Check" class="stroke-[1.3] w-4 h-4 mr-2" />
              {{ setActividadesLoading ? 'Registrando...' : 'Registrar' }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
