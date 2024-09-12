<script setup>
import { FormInput, FormLabel } from '@/components/base/Form'
import Button from '@/components/base/Button'
import Alert from '@/components/base/Alert'
import Lucide from '@/components/base/Lucide'
import LoadingIcon from '@/components/base/LoadingIcon'
import { useRoute, useRouter } from 'vue-router'
import { useRefs } from '@/hooks/recovery/useRefs'
import { status } from '@/hooks/recovery/useStatus'
import { useValidation } from '@/hooks/recovery/useValidation'
import { usePasswordSecurity } from '@/hooks/recovery/usePasswordSecurity'
import { watch } from 'vue'

// Recupera la ruta actual
const route = useRoute()
const router = useRouter()

// Recupera la key de los parámetros de la URL
// TODO: hacer la valicación de la key
const key = route.params.key || ''

const { password, confirm_password, valid } = useRefs()
const { validationConfirmPassword, validate } = useValidation({ password ,confirm_password, status, valid })
const { validatePassword } = usePasswordSecurity({ status, validate, password })
 
const loading = false


watch([password, confirm_password], () => {
  validationConfirmPassword()
})

watch(password, () => {
  validationConfirmPassword()
  validatePassword()
})



</script>

<template>
  <div
    class="container grid lg:h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] py-10 px-5 sm:py-14 sm:px-10 md:px-36 lg:py-0 lg:pl-14 lg:pr-12 xl:px-24">
    <div :class="[
      'relative z-50 h-full col-span-12 p-7 sm:p-14 bg-white rounded-2xl lg:bg-transparent lg:pr-10 lg:col-span-5 xl:pr-24 2xl:col-span-4 lg:p-0'
    ]">
      <div class="relative z-10 flex flex-col justify-center w-full h-full py-2 lg:py-32">
        <div class="mt-10">
          <div class="text-2xl font-medium">Reiniciar Contraseña</div>

          <!-- <Alert variant="outline-danger" v-if="error"
            class="flex items-center px-4 py-3 my-7 bg-danger/5 border-danger/20 rounded-[0.6rem] leading-[1.7]"
            v-slot="{ dismiss }">
            <div class="">
              <Lucide icon="AlertTriangle" class="stroke-[0.8] stroke-danger w-7 h-7 mr-2 fill-danger/10" />
            </div>
            <div class="ml-1 mr-8">
              <span class="text-danger">{{ error }}</span>
            </div>
            <Alert.DismissButton type="button" class="btn-close text-danger" @click="dismiss" aria-label="Cerrar">
              <Lucide icon="X" class="w-5 h-5" />
            </Alert.DismissButton>
          </Alert> -->

          <div class="mt-6">
              
            
            <FormLabel class="mt-4">Nueva contraseña</FormLabel>
            <FormInput type="password" placeholder="**********" name="password" v-model="password" />
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

                <div :class="`mt-2 ${status.password.error ? 'text-red-500' : 'text-blue-600'}`">{{
                  status.password.message }}
                </div>
              
              
            <FormLabel class="mt-4">Confirmar contraseña</FormLabel>
            <FormInput type="password" class="block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80"
              placeholder="correo@mail.com" v-model="confirm_password" />

            
            <div class="flex flex-row text-red-600 p-2" v-if="status.confirm_password.error">
              {{ status.confirm_password.message }}
            </div>

            <div class="flex flex-row justify-end mt-4 text-xs text-slate-500 sm:text-sm">
              
              <span class=" cursor-pointer" @click="router.push({ name: 'login' })">Regresar al inicio de sesión</span>

            </div>
            <div class="mt-5 text-center xl:mt-8 xl:text-left">

              <Button @click="() => { }" :disabled="!valid || loading" variant="primary"
                rounded
                :class="`bg-gradient-to-r transition-all scale-105 duration-200 w-full py-3.5 xl:mr-3 ${valid && !loading ? 'from-theme-1 to-theme-2 hover:scale-100 select-none cursor-pointer' : 'from-gray-600 to-gray-600  cursor-default'}`">
                <LoadingIcon v-if="loading" icon="three-dots" class="w-8 h-5" color="white" />
                {{ loading ? '' : 'Restableser contraseña' }}
              </Button>
            
            </div>
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
      'before:content-[\'\'] before:absolute before:lg:-ml-10 before:left-0 before:inset-y-0 before:bg-gradient-to-b before:from-theme-1 before:to-theme-2 before:w-screen before:lg:w-[800%]',
      'after:content-[\'\'] after:absolute after:inset-y-0 after:left-0 after:w-screen after:lg:w-[800%] after:bg-texture-white after:bg-fixed after:bg-center after:lg:bg-[25rem_-25rem] after:bg-no-repeat'
    ]">
      <div class="sticky top-0 z-10 flex-col justify-center hidden h-screen ml-16 lg:flex xl:ml-28 2xl:ml-36">
        <div class="leading-[1.4] text-[2.6rem] xl:text-5xl font-medium xl:leading-[1.2] text-white">
          <!-- TODO: Cambiar el texto y descripción de este apartado por algo que tenga que ver con la ONG -->
          Abraza la excelencia <br />
          en el desarrollo de paneles de control
        </div>
        <div class="mt-5 text-base leading-relaxed xl:text-lg text-white/70">
          Desbloquea el potencial de Tailwise, donde los desarrolladores crean paneles de control meticulosamente
          estructurados y visualmente impresionantes con módulos ricos en funciones. Únete a nosotros hoy para dar forma
          al futuro del desarrollo de tu aplicación.
        </div>
      </div>
    </div>
  </div>
</template>
