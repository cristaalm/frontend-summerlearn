<script setup>
import Lucide from '@/components/base/Lucide'
import Button from '@/components/base/Button'
import Litepicker from '@/components/base/Litepicker'
import LoadingIcon from '@/components/base/LoadingIcon'
import { FormInput, FormSelect, InputGroup } from '@/components/base/Form'
import { watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useValidationImage } from '@/hooks/users/addUser/useValidationImage'
import { useRefs } from '@/hooks/users/addUser/useRefs'
import { useStatus } from '@/hooks/users/addUser/useStatus'
import { usePasswordSecurity } from '@/hooks/users/addUser/usePasswordSecurity'
import { useValidateFunctions } from '@/hooks/users/addUser/useValidationFunctions'
import { useRoles } from '@/hooks/roles/useRoles'
import { useSetUser } from '@/hooks/users/addUser/useSetUser'

const router = useRouter()
const { status, resetFields } = useStatus()
const {
  firstName,
  lastName,
  email,
  phone,
  birthdate,
  password,
  password_confirm,
  rol,
  valid,
  showPassword,
  showPasswordConfirm
} = useRefs()
const {
  validateText,
  validateDate,
  validatePasswordComfirm,
  validateInputPhone,
  validateRol,
  validate
} = useValidateFunctions({ valid, password, password_confirm, status })
const {
  profileImage,
  errorMessagePhoto,
  validateImage,
  triggerFileSelect,
  removeImage,
  imageFile
} = useValidationImage({ status, validate })
const { validatePassword } = usePasswordSecurity({ status, validate })
const { loading, addUser } = useSetUser({
  email,
  phone,
  password,
  firstName,
  lastName,
  birthdate,
  rol,
  imageFile,
  valid,
  validate,
  resetFields
})
const { roles, loadingRoles, errorRoles, loadRoles } = useRoles()
// Año mínimo para la fecha de nacimiento
const minYear = new Date().getFullYear() - 18

onMounted(() => {
  loadRoles()
})

watch(birthdate, (value) => {
  validateDate(value)
})
</script>

<template>
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12 sm:col-span-10 sm:col-start-2">
      <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div class="text-base font-medium group-[.mode--light]:text-white">Agregar Usuario</div>
        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
          <Button variant="primary"
            class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
            @click="() => {
              router.push({
                name: 'users'
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
            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium dark:text-slate-200">Foto de perfil</div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                    Por favor, sube una foto de perfil para identificar al usuario.
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
                    <input id="profileImageInput" type="file" class="hidden" @change="validateImage" accept="image/*" />
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

            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium dark:text-slate-200">Nombre completo</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500">
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                    Por favor, ingrese el nombre completo del usuario.
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <div class="flex flex-col items-center md:flex-row">
                  <FormInput type="text" name="firstName" v-model="firstName" @input="validateText"
                    class="first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10 dark:text-slate-200 dark:placeholder:!text-slate-400"
                    placeholder="Escriba aquí su nombre..." />
                  <FormInput type="text" name="lastName" v-model="lastName" @input="validateText"
                    class="first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10 dark:text-slate-200 dark:placeholder:!text-slate-400"
                    placeholder="Escriba aquí su apellido..." />
                </div>
                <div class="text-red-500 mt-2 dark:text-red-400 flex flex-col items-center md:flex-row">
                  <div v-if="status.firstName.error" class="text-xs w-full md:w-1/2">
                    {{ status.firstName.message }}
                  </div>
                  <div v-if="status.lastName.error" class="text-xs w-full md:w-1/2">
                    {{ status.lastName.message }}
                  </div>
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
                      minYear: 1950,
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
                    <div class="font-medium dark:text-slate-200">Correo electrónico</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500">
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                    Por favor, ingrese el correo electrónico del usuario.
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput type="email" name="email" v-model="email"
                  class="dark:text-slate-200 dark:placeholder:!text-slate-400"
                  placeholder="Escriba aquí su correo electrónico..." @input="validateText" />
                <div class="text-red-500 mt-2 dark:text-red-400">{{ status.email.message }}</div>
              </div>
            </div>

            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium dark:text-slate-200">Número de teléfono celular</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500">
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                    Por favor, ingrese el número de teléfono del usuario.
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput type="text" placeholder="Escriba aquí su teléfono celular..."
                  class="dark:text-slate-200 dark:placeholder:!text-slate-400" name="phone" v-model="phone" @input="(e) => {
                    validateInputPhone(e)
                    validateText(e)
                  }
                    " />
                <div class="text-red-500 mt-2 dark:text-red-400">{{ status.phone.message }}</div>
              </div>
            </div>

            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium dark:text-slate-200">Rol</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500">
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                    Por favor, selecciona el rol del usuario.
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormSelect name="rol" v-model="rol" @change="validateRol"
                  class="dark:text-slate-200 dark:placeholder:!text-slate-400">
                  <template v-if="loadingRoles">
                    <option value="" disabled selected>Cargando...</option>
                  </template>

                  <template v-else-if="errorRoles">
                    <option value="" disabled selected>Error al cargar los roles</option>
                  </template>

                  <template v-else>
                    <option value="" disabled selected>Seleccione un rol...</option>
                    <template v-for="rol in roles" :key="rol.id">
                      <option :value="rol.id">
                        {{ rol.name }}
                      </option>
                    </template>
                  </template>
                </FormSelect>
                <div class="text-red-500 mt-2 dark:text-red-400">{{ status.rol.message }}</div>
              </div>
            </div>

            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium dark:text-slate-200">Contraseña</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500">
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                    Por favor, ingrese la contraseña del usuario.
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <InputGroup class="mt-2">
                  <FormInput :type="`${showPassword ? 'text' : 'password'}`" placeholder="Escriba aquí su contraseña..."
                    class="dark:text-slate-200 dark:placeholder:!text-slate-400" name="password" v-model="password"
                    @input="(e) => {
                      validatePassword(e)
                      validatePasswordComfirm(e)
                    }
                      " />
                  <InputGroup.Text @click="() => {
                    showPassword = !showPassword
                  }
                    " class="cursor-pointer">
                    <button>
                      <Lucide icon="Eye" class="w-4 h-4 stroke-[1.3] text-green-500" v-if="showPassword" />
                      <Lucide icon="EyeOff" class="w-4 h-4 stroke-[1.3] text-red-500" v-else />
                    </button>
                  </InputGroup.Text>
                </InputGroup>
                <div class="grid w-full h-1.5 grid-cols-12 gap-4 mt-3.5">
                  <div
                    :class="`h-full col-span-3 border rounded bg-slate-400/30 border-slate-400/20 ${status.password.color} ${status.password.secure >= 0 ? 'active' : ''}`">
                  </div>
                  <div
                    :class="`h-full col-span-3 border rounded bg-slate-400/30 border-slate-400/20 ${status.password.color} ${status.password.secure >= 2 ? 'active' : ''}`">
                  </div>
                  <div
                    :class="`h-full col-span-3 border rounded bg-slate-400/30 border-slate-400/20 ${status.password.color} ${status.password.secure >= 3 ? 'active' : ''}`">
                  </div>
                  <div
                    :class="`h-full col-span-3 border rounded bg-slate-400/30 border-slate-400/20 ${status.password.color} ${status.password.secure >= 4 ? 'active' : ''}`">
                  </div>
                </div>

                <div :class="`mt-2 ${status.password.error ? 'text-red-500' : 'text-blue-600'}`">
                  {{ status.password.message }}
                  <ul v-if="status.password.secure != 4">
                    <li v-for="item in status.password.list" :key="item" class="list-disc list-inside">
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium text-nowrap dark:text-slate-200">Confirmar contraseña</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500">
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                    Por favor, ingrese la contraseña del usuario nuevamente.
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <InputGroup class="mt-2">
                  <FormInput placeholder="Escriba nuevamente aquí su contraseña..."
                    :type="`${showPasswordConfirm ? 'text' : 'password'}`" ref="inputPasswordConfirm"
                    class="dark:text-slate-200 dark:placeholder:!text-slate-400" name="password_confirm"
                    v-model="password_confirm" @input="validatePasswordComfirm" />

                  <InputGroup.Text @click="() => {
                    showPasswordConfirm = !showPasswordConfirm
                  }
                    " class="cursor-pointer">
                    <button>
                      <Lucide icon="Eye" class="w-4 h-4 stroke-[1.3] text-green-500" v-if="showPasswordConfirm" />
                      <Lucide icon="EyeOff" class="w-4 h-4 stroke-[1.3] text-red-500" v-else />
                    </button>
                  </InputGroup.Text>
                </InputGroup>
                <div class="text-red-500 mt-2 dark:text-red-400">{{ status.password_confirm.message }}</div>
              </div>
            </div>
          </div>
          <div class="flex py-5 border-t md:justify-end px-7 border-slate-200/80 dark:border-slate-400">
            <Button variant="outline-success" class="w-full px-10 md:w-auto border-primary/50 dark:text-slate-200"
              :disabled="!valid" @click="addUser">
              <Lucide v-if="!loading" icon="Check" class="stroke-[1.3] w-4 h-4 mr-2 -ml-2" />
              <LoadingIcon v-if="loading" icon="tail-spin" class="stroke-[1.3] w-4 h-4 mr-2 -ml-2" color="black" />
              {{ loading ? 'Registrando...' : 'Registrar' }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
