<script setup>
import Lucide from '@/components/base/Lucide'
import Button from '@/components/base/Button'
import Alert from '@/components/base/Alert'
import Litepicker from '@/components/base/Litepicker'
import LoadingIcon from '@/components/base/LoadingIcon'
import { FormInput } from '@/components/base/Form'
import { useRouter } from 'vue-router'
import { useValidationImage } from '@/hooks/childrens/addChildren/useValidationImage'
import { useValidationAddChildren } from '@/hooks/childrens/addChildren/useValidationAddChildren'
import { useSetChildren } from '@/hooks/childrens/addChildren/useSetChildren'

const { validate, valid, status, name, birthdate, curp, validateInputCurp, resetFields, validateAll } = useValidationAddChildren()
const { profileImage, errorMessagePhoto, validateImage, triggerFileSelect, removeImage, imageFile } = useValidationImage({ status, validateAll })
const { setChildrenError, setChildrenLoading, addChildren  } = useSetChildren({ name, birthdate, curp, imageFile, valid, validateAll, resetFields })

const router = useRouter()
const minYear = new Date().getFullYear() - 6

const handleRegister = () => {
  if (valid.value) {
    const children = {
      name: name.value,
      birthdate: birthdate.value,
      curp: curp.value,
      profileImage: imageFile.value
    }
    addChildren({ children })
  }
}
</script>

<template>
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12 sm:col-span-10 sm:col-start-2">
      <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div class="text-base font-medium group-[.mode--light]:text-white">Registrar niño/a</div>
        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
          <Button variant="primary"
            class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
            @click="() => {
              router.push({
                name: 'childrens'
              })
            }
              ">
            <Lucide icon="ArrowLeft" class="stroke-[1.3] w-4 h-4 mr-2" /> Regresar
          </Button>
        </div>
      </div>
      <div class="mt-7">
        <div class="flex flex-col box box--stacked">
          <div class="p-7">

            <!--? ######################### ALERTA DE ERROR ######################### -->

            <Alert variant="outline-danger" v-if="setChildrenError" :message="setChildrenError" :dismissible="true"
              class="flex items-center px-4 py-3 my-7 dark:border-red-400 dark:text-red-400" />

            <!--? ######################### INPUTS ######################### -->

            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium dark:text-slate-200">Foto de perfil</div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                    Por favor, sube una foto de perfil para identificar al niño.
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="flex items-center">
                  <div
                    class="relative flex items-center justify-center w-24 h-24 border rounded-full bg-primary/5 dark:bg-slate-500 border-primary/10 dark:border-slate-500">
                    <!-- Mostrar la imagen seleccionada o un icono por defecto -->
                    <img v-if="profileImage" :src="profileImage" alt="Foto de perfil"
                      class="object-cover w-full h-full rounded-full" />

                    <Lucide v-if="!profileImage" icon="User"
                      class="w-[65%] h-[65%] fill-slate-300/70 dark:fill-slate-200 -mt-1.5 stroke-[0.5] stroke-slate-400/50 dark:stroke-slate-200" />

                    <!-- Botón para seleccionar una imagen -->
                    <div @click="triggerFileSelect"
                      class="absolute bottom-0 right-0 flex items-center justify-center rounded-full box w-7 h-7 cursor-pointer dark:bg-slate-600">
                      <Lucide icon="Pencil" class="w-3.5 h-3.5 stroke-[1.3] text-slate-500 dark:text-slate-200" />
                    </div>

                    <!-- Input tipo archivo oculto -->
                    <input id="profileImageInput" name="profileImage" type="file" class="hidden" @change="validateImage" accept="image/*" />
                  </div>

                  <Button variant="outline-danger" size="sm"
                    class="pl-3.5 pr-4 mr-2 h-8 ml-8 dark:border-red-400 dark:text-red-400" @click="removeImage">
                    <Lucide icon="Trash2" class="w-3.5 h-3.5 mr-1.5 stroke-[1.3]" />
                    Eliminar foto
                  </Button>
                </div>
                <div class="text-red-500 mt-2 dark:text-red-400">{{ errorMessagePhoto }}</div>
              </div>
            </div>

            <!--? ######################### INPUTS TEXT ######################### -->

            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium dark:text-slate-200">Nombre del niño/a</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500">
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                    Por favor, ingrese el nombre del niño/a.
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput type="text" placeholder="Escriba aquí su nombre del niño/a..." v-model="name"
                  @keydown.enter.prevent="() => {
                    if (valid && !setChildrenLoading) handleRegister()
                  }" class="dark:text-slate-200 dark:placeholder:!text-slate-400"
                  @input="(e) => validate(e, 'name')" />
                <div class="mt-1 text-xs text-red-500 h-4">
                  {{ status.name.message }}
                </div>
              </div>
            </div>

            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium dark:text-slate-200">Fecha de nacimiento</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500">
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                    Por favor, ingrese la fecha de nacimiento del usuario.
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <Litepicker v-model="birthdate" name="birthdate"
                  class="cursor-[pointer!important] dark:text-slate-200 dark:placeholder:!text-slate-400" readonly
                  :options="{
                    autoApply: false,
                    dropdowns: {
                      minYear: 2011,
                      maxYear: minYear,
                      months: true,
                      years: true
                    },
                    format: 'DD/MM/YYYY'
                  }" placeholder="DD/MM/YYYY" />

                <div class="text-red-500 mt-2 dark:text-red-400">{{ status.birthdate.message }}</div>
              </div>
            </div>

            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium dark:text-slate-200">CURP del niño/a</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500">
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                    Por favor, ingrese el CURP del niño/a.
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput type="text" placeholder="Escriba aquí la CURP del niño/a..." v-model="curp"
                  @keydown.enter.prevent="() => {
                    if (valid && !setChildrenLoading) handleRegister()
                  }" class="dark:text-slate-200 dark:placeholder:!text-slate-400" @input="(e) => {
                    validate(e, 'curp')
                    validateInputCurp(e)
                  }" />
                <div class="mt-1 text-xs text-red-500 h-4">
                  {{ status.curp.message }}
                </div>
              </div>
            </div>
          </div>

          <!--? ######################### BOTON DE REGISTRO ######################### -->

          <div class="flex py-5 border-t md:justify-end px-7 border-slate-200/80 dark:border-slate-600">
            <Button variant="outline-success"
              :class="`w-full px-10 md:w-auto font-bold ${setChildrenLoading || !valid ? 'border-gray-500 text-gray-500' : 'border-green text-green dark:text-slate-200'}`"
              @click="handleRegister" :disabled="!valid || setChildrenLoading">
              <LoadingIcon v-if="setChildrenLoading" icon="tail-spin" class="stroke-[1.3] w-4 h-4 mr-2 -ml-2"
                color="black" />

              <Lucide v-if="!setChildrenLoading" icon="Check" class="stroke-[1.3] w-4 h-4 mr-2" />
              {{ setChildrenLoading ? 'Registrando...' : 'Registrar' }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
