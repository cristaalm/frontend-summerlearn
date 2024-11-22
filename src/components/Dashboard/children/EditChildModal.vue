<script setup>
import { FormInput, FormSelect } from '@/components/base/Form'
import { Dialog } from '@/components/base/Headless'
import { useChild } from '@/hooks/childrens/editChildren/useChild'
import LoadingIcon from '@/components/base/LoadingIcon'
import Button from '@/components/base/Button'
import Lucide from '@/components/base/Lucide'
import Litepicker from '@/components/base/Litepicker'
import { watch, computed, inject } from 'vue'
import { useValidationImage } from '@/hooks/childrens/editChildren/useValidationImage'
import { useValidationEditChildren } from '@/hooks/childrens/editChildren/useValidationEditChildren'
import { Baseurl } from '@/utils/global'

// obtenemos las props del componente padre
const props = defineProps({
  ModalEditChild: Boolean,
  setModalEditChild: Function,
  infoChild: Object
})

function formatDateToDDMMYYYY(dateString) {
  if (!dateString) return '' // Verifica si dateString es undefined, null o vacío.
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

const { grades, loadingGrades, errorGrades, loadGrades } = inject('grades')
const { validate, valid, status, name, birthdate, curp, validateInputCurp, resetFields, validateAll, setValueTrueAll } = useValidationEditChildren()
const { profileImage, errorMessagePhoto, validateImage, triggerFileSelect, resetImage, setInitialValue, imageFile, isChangeImage } = useValidationImage({ status, validateAll })
const { updateChild, loadingEditChild } = useChild()

// variable computada para saber si el contenido de los inputs ha cambiado
const isChange = computed(() => {
  return (
    name.value !== props.infoChild.name ||
    birthdate.value !== formatDateToDDMMYYYY(props.infoChild.birthdate) ||
    curp.value !== props.infoChild.curp ||
    isChangeImage.value
  )
})

watch(
  () => props.infoChild,
  (newVal) => {
    if (newVal) {
      name.value = newVal.name
      validate({ target: { value: name.value } }, 'name')

      birthdate.value = formatDateToDDMMYYYY(newVal.birthdate)

      curp.value = newVal.curp
      validate({ target: { value: curp.value } }, 'curp')

      profileImage.value = newVal.photo
      setInitialValue(newVal.photo)
      isChangeImage.value = false

      setTimeout(() => {
        setValueTrueAll()
      }, 100)
    }
  },
  { immediate: true }
)

const minYear = new Date().getFullYear() - 6

const handleUpdateChild = () => {
  const newChild = {
    name: name.value,
    birthdate: birthdate.value,
    curp: curp.value,
    photo: imageFile
  }
  updateChild({
    child: props.infoChild,
    newChild: newChild,
    setModalEditChild: props.setModalEditChild
  })
}
</script>

<template>
  <!-- BEGIN: Large Modal Content -->
  <Dialog size="xl" :open="ModalEditChild" @close="() => {
    if (loadingEditChild) return
    setModalEditChild({ open: false })
  }
    ">
    <Dialog.Panel class="text-center flex flex-col">
      <div
        class="flex flex-row px-10 py-5 justify-between items-center w-full dark:border-slate-600 border-slate-300 border-b">
        <h2 class="text-2xl font-bold text-black dark:text-slate-200">
          Editar información del niño
        </h2>
        <Lucide icon="XCircle" class="w-10 h-full text-danger cursor-pointer dark:text-red-500" @click="() => {
          if (loadingEditChild) return
          setModalEditChild({ open: false })
        }
          " />
      </div>

      <div class="flex flex-col">
        <div class="dark:border-slate-600 border-slate-300 border-b max-h-[70vh] overflow-y-auto scrollbar-custom">
          <!-- ? ########################### IMAGEN DEL NIÑO ######################################## ? -->

          <div
            class="flex flex-col md:flex-row justify-between py-5 my-5 sm:flex mx-5 px-5 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700">
            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14 flex-[0.5]">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium dark:text-slate-200">Foto de perfil</div>
                </div>
                <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                  Por favor, sube una foto de perfil para identificar al niño.
                </div>
              </div>
            </label>
            <div class="w-full mt-3 xl:mt-0 flex-[0.4]">
              <div class="flex flex-row items-center justify-center">
                <div
                  class="relative flex items-center justify-center w-24 h-24 border rounded-full bg-primary/5 dark:bg-slate-500 border-primary/10 dark:border-slate-500">
                  <!-- Mostrar la imagen seleccionada o un icono por defecto -->
                  <img v-if="profileImage"
                    :src="`${!profileImage.includes('http') ? Baseurl + profileImage : profileImage}`"
                    alt="Foto de perfil" class="object-cover w-full h-full rounded-full" />

                  <Lucide v-if="!profileImage" icon="User"
                    class="w-[65%] h-[65%] fill-slate-300/70 dark:fill-slate-200 -mt-1.5 stroke-[0.5] stroke-slate-400/50 dark:stroke-slate-200" />

                  <!-- Botón para seleccionar una imagen -->
                  <div @click="triggerFileSelect"
                    class="absolute bottom-0 right-0 flex items-center justify-center rounded-full box w-7 h-7 cursor-pointer dark:bg-slate-600">
                    <Lucide icon="Pencil" class="w-3.5 h-3.5 stroke-[1.3] text-slate-500 dark:text-slate-200" />
                  </div>

                  <!-- Input tipo archivo oculto -->
                  <input id="profileImageInput" name="profileImage" type="file" class="hidden" @change="validateImage"
                    accept="image/*" />
                </div>

                <Button variant="outline-success" size="sm" :disabled="!isChangeImage || loadingEditChild"
                  class="pl-3.5 pr-4 mr-2 h-8 ml-8 dark:border-green-400 dark:text-green-400" @click="resetImage">
                  <Lucide icon="RefreshCcw" class="w-3.5 h-3.5 mr-1.5 stroke-[1.3]" />
                  Restablecer
                </Button>
              </div>
              <div class="text-red-500 mt-2 dark:text-red-400">{{ errorMessagePhoto }}</div>
            </div>
          </div>

          <!-- ? ########################### NOMBRE DEL NIÑO ######################################## ? -->

          <div
            class="flex-col block py-5 my-5 sm:flex mx-5 px-5 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700">
            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium text-black dark:text-slate-200">Nombre del niño/a</div>
                </div>
                <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                  Por favor, ingrese el nombre del niño/a.
                </div>
              </div>
            </label>
            <div class="flex-1 w-full mt-3">
              <FormInput v-model="name" class="flex-1 mt-2 dark:text-slate-200" @keydown.enter.prevent="() => {
                if (valid && !loadingEditChild && isChange) handleUpdateChild()
              }
                " @input="(e) => validate(e, 'name')" />
              <div class="mt-1 text-xs text-red-500 h-4">
                {{ status.name.message }}
              </div>
            </div>
          </div>

          <!-- ? ################################# FECHA DE NACIMIENTO ######################################## ? -->

          <div
            class="flex-col block py-5 my-5 sm:flex mx-5 px-5 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700">
            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium dark:text-slate-200">Fecha de nacimiento</div>
                </div>
                <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                  Por favor, ingrese la fecha de nacimiento del niño/a.
                </div>
              </div>
            </label>
            <div class="flex-1 w-full mt-3">
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

          <!-- ? ################################# CURP ######################################## ? -->

          <div
            class="flex-col block py-5 my-5 sm:flex mx-5 px-5 rounded-lg dark:border-slate-600 border bg-theme-1/10 dark:bg-slate-700">
            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium dark:text-slate-200">CURP del niño/a</div>
                </div>
                <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                  Por favor, ingrese el CURP del niño/a.
                </div>
              </div>
            </label>
            <div class="flex-1 w-full mt-3 xl:mt-0">
              <FormInput type="text" placeholder="Escriba aquí la CURP del niño/a..." v-model="curp"
                @keydown.enter.prevent="() => {
                  if (valid && !loadingEditChild && isChange) handleUpdateChild()
                }
                  " class="dark:text-slate-200 dark:placeholder:!text-slate-400" @input="(e) => {
                    validate(e, 'curp')
                    validateInputCurp(e)
                  }
                    " />
              <div class="mt-1 text-xs text-red-500 h-4">
                {{ status.curp.message }}
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="flex py-5 md:justify-end px-7">
        <Button variant="outline-success" class="w-full px-10 md:w-auto dark:text-slate-200" @click="handleUpdateChild"
          :disabled="loadingEditChild || !valid || !isChange">
          <Lucide v-if="!loadingEditChild" icon="Save"
            class="stroke-[1.3] w-4 h-4 mr-2 -ml-2 text-success dark:text-slate-200" />
          <LoadingIcon v-if="loadingEditChild" icon="tail-spin" class="stroke-[1.3] w-4 h-4 mr-2 -ml-2" color="black" />
          {{ loadingEditChild ? 'Guardando cambios...' : 'Guardar cambios' }}
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: Large Modal Content -->
</template>
