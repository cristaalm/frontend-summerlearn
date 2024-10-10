<script setup>
import { FormInput, FormLabel, InputGroup } from '@/components/base/Form'
import Button from '@/components/base/Button'
import LoadingIcon from '@/components/base/LoadingIcon'
import Lucide from '@/components/base/Lucide'
import Alert from '@/components/base/Alert'
import { useRoute, useRouter } from 'vue-router'
import { useRefs } from '@/hooks/recovery/useRefs'
import { status } from '@/hooks/recovery/useStatus'
import { useValidation } from '@/hooks/recovery/useValidation'
import { usePasswordSecurity } from '@/hooks/recovery/usePasswordSecurity'
import { computed } from 'vue'
import { useChangePassword } from '@/hooks/recovery/useChangePassword'
// Recupera la ruta actual
const route = useRoute()
const router = useRouter()

// Recupera la key de los parámetros de la URL
const key = route.params.key || ''
const { password, confirm_password, valid, showPassword, showPasswordConfirm } = useRefs()
const { validationConfirmPassword, validate } = useValidation({ password, confirm_password, status, valid })
const { validatePassword } = usePasswordSecurity({ status, validate, password, confirm_password })
const { loadingPassword, errorPassword, successPassword, messagePassword, changePassword } = useChangePassword()

const alertVariant = computed(() => {
  return successPassword.value ? 'soft-success' : errorPassword.value ? 'soft-danger' : ''
})

</script>

<template>
  <div
    class="container grid lg:h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] py-10 px-5 sm:py-14 sm:px-10 md:px-36 lg:py-0 lg:pl-14 lg:pr-12 xl:px-24">
    <div :class="[
      'relative z-50 h-full col-span-12 p-7 sm:p-14 bg-white rounded-2xl lg:bg-transparent lg:pr-10 lg:col-span-5 xl:pr-24 2xl:col-span-4 lg:p-0'
    ]">
      <div class="relative z-10 flex flex-col justify-center w-full h-full py-2 lg:py-32" v-if="!successPassword">
        <div class="mt-10">
          <div class="text-2xl font-medium">Reiniciar Contraseña</div>

          <div class="mt-6">

            <Alert :variant="alertVariant" v-if="errorPassword" :message="messagePassword"
              class="flex items-center px-4 py-3 my-7" />

            <FormLabel class="mt-4">Nueva contraseña <span class="text-red-600 bold">*</span></FormLabel>
            <InputGroup class="mt-2">
              <FormInput :type="`${showPassword ? 'text' : 'password'}`" placeholder="**********"
                class="block px-4 py-3.5 border-slate-300/80" name="password" v-model="password" />
              <InputGroup.Text @click="() => {
                showPassword = !showPassword
              }
                " class="cursor-pointer flex flex-col justify-center items-center">
                <button class="">
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

            <FormLabel class="mt-4">Confirmar contraseña <span class="text-red-600 bold">*</span></FormLabel>
            <InputGroup class="mt-2">
              <FormInput :type="`${showPasswordConfirm ? 'text' : 'password'}`"
                class="block px-4 py-3.5 border-slate-300/80" placeholder="**********" v-model="confirm_password" />
              <InputGroup.Text @click="() => {
                showPasswordConfirm = !showPasswordConfirm
              }
                " class="cursor-pointer flex flex-col justify-center items-center">
                <button class="">
                  <Lucide icon="Eye" class="w-4 h-4 stroke-[1.3] text-green-500" v-if="showPasswordConfirm" />
                  <Lucide icon="EyeOff" class="w-4 h-4 stroke-[1.3] text-red-500" v-else />
                </button>
              </InputGroup.Text>
            </InputGroup>
            <div class="flex flex-row text-red-600 p-2" v-if="status.confirm_password.error">
              {{ status.confirm_password.message }}
            </div>
            <div class="mt-5 text-center xl:mt-8 xl:text-left">
              <Button @click="() => {
                changePassword(key, password)
              }" :disabled="!valid || loadingPassword" variant="primary" rounded
                :class="`bg-gradient-to-r transition-all border-none scale-105 duration-200 w-full py-3.5 xl:mr-3 ${valid && !loadingPassword ? 'from-green-dark to-green hover:scale-100 select-none cursor-pointer' : 'from-gray-600 to-gray-600  cursor-default'}`">
                <LoadingIcon v-if="loadingPassword" icon="three-dots" class="w-8 h-5" color="white" />
                {{ loadingPassword ? '' : 'Restableser contraseña' }}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- ? ######################## ALERT SUCCESS ######################## ? -->

      <div class="relative z-10 flex flex-col justify-center w-full h-full py-2 lg:py-32" v-else>
        <div class="mt-10 text-center">
          <Lucide icon="CheckCircle" class="w-16 h-16 text-green-500 mx-auto" />
          <div class="text-3xl font-bold mt-4">¡Listo!</div>
          <div class="mt-4 text-slate-600 flex flex-col gap-2">
            <p class="text-lg">¡Contraseña actualizada!</p>
            <p class="text-lg">
              Tu contraseña ha sido actualizada correctamente.
            </p>
            <p class="text-lg">
              Ahora puedes cerrar esta ventana.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div
    class="fixed container grid w-screen inset-0 h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] pl-14 pr-12 xl:px-24">
    <div :class="[
      'relative h-screen col-span-12 lg:col-span-5 2xl:col-span-4 z-20',
      'after:bg-white after:hidden after:lg:block after:content-[\'\'] after:absolute after:right-0 after:inset-y-0 after:bg-gradient-to-b after:from-white after:to-slate-100/80 after:w-[800%] after:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0]',
      'before:content-[\'\'] before:hidden before:lg:block before:absolute before:right-0 before:inset-y-0 before:my-6 before:bg-gradient-to-b before:from-white/10 before:to-slate-50/10 before:bg-white/50 before:w-[800%] before:-mr-4 before:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0]'
    ]"></div>
    <div :class="[
      'h-full col-span-7 2xl:col-span-8 lg:relative',
      'before:content-[\'\'] before:absolute before:lg:-ml-10 before:left-0 before:inset-y-0 before:bg-gradient-to-b before:from-green-dark before:to-green-dark before:w-screen before:lg:w-[800%]',
      'after:content-[\'\'] after:absolute after:inset-y-0 after:left-0 after:w-screen after:lg:w-[800%] after:bg-texture-white after:bg-fixed after:bg-center after:lg:bg-[25rem_-25rem] after:bg-no-repeat'
    ]">
      <div class="sticky top-0 z-10 flex-col justify-center hidden h-screen ml-16 lg:flex xl:ml-28 2xl:ml-36">
        <div class="leading-[1.4] text-[2.6rem] xl:text-5xl font-medium xl:leading-[1.2] text-white">
          Establece tu nueva contraseña <br />
          y sigue adelante con nuestra misión
        </div>
        <div class="mt-5 text-base leading-relaxed xl:text-lg text-white/70">
          Protege tu cuenta y asegura tu acceso para continuar ayudando a transformar vidas a través
          de la educación. Ingresa tu nueva contraseña para seguir siendo parte de nuestra
          comunidad.
        </div>
      </div>
    </div>
  </div>
</template>
