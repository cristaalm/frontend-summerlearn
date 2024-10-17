<script setup>
import { FormInput, FormLabel } from '@/components/base/Form'
import Button from '@/components/base/Button'
import LoadingIcon from '@/components/base/LoadingIcon'
import Lucide from '@/components/base/Lucide'
import Alert from '@/components/base/Alert'
import { useRefs } from '@/hooks/forgotPassword/useRefs'
import { useValidation } from '@/hooks/forgotPassword/useValidation'
import { useRouter } from 'vue-router'
import { useSendMail } from '@/hooks/forgotPassword/useSendMail'
import { computed, onMounted, ref } from 'vue'
import DynamicText from '@/components/DynamicText'
import { changeLoginColorScheme, changeColorScheme} from '@/utils/switchColorScheme'


const { email } = useRefs()
const { statusMail } = useValidation({ email })
const { loadingMail, errorMail, warningMail, successMail, messageMail, sendMail } = useSendMail({ email })
const router = useRouter()
const alertVariant = computed(() => { return successMail.value ? 'soft-success' : errorMail.value ? 'soft-danger' : warningMail.value ? 'soft-warning' : '' })

onMounted(() => {
  changeLoginColorScheme()
})

const colorSchame = ref('theme-19')
const changeColor = () => {
  
  if (colorSchame.value === 'theme-19') {
    colorSchame.value = 'theme-20';
  } else if (colorSchame.value === 'theme-20') {
    colorSchame.value = 'theme-21';
  } else if (colorSchame.value === 'theme-21') {
    colorSchame.value = 'theme-22';
  } else {
    colorSchame.value = 'theme-19'; // Volver a theme-19
  }
  changeColorScheme(colorSchame.value);
}


</script>

<template>
  <div
    class="container grid lg:h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] py-10 px-5 sm:py-14 sm:px-10 md:px-36 lg:py-0 lg:pl-14 lg:pr-12 xl:px-24">
    <div :class="[
      'relative z-50 h-full col-span-12 p-7 sm:p-14 bg-white dark:bg-slate-900 rounded-2xl lg:bg-transparent lg:pr-10 lg:col-span-5 xl:pr-24 2xl:col-span-4 lg:p-0'
    ]">

      <!-- ? ######################## Formulario de recuperación de contraseña ######################## ? -->

      <div class="relative z-10 flex flex-col justify-center w-full h-full py-2 lg:py-32" v-if="!successMail">
        <div class="flex flex-row justify-start items-center">
          <span @click="router.push({ name: 'login' })"
            class="flex flex-row gap-2 transition-all duration-200 hover:scale-95 !text-black dark:!text-slate-200 !border-transparent cursor-pointer">
            <Lucide icon="ArrowLeft" class="w-5 h-5" />
            Regresar
          </span>
        </div>
        <div class="mt-10 dark:text-slate-200">
          <div class="text-2xl font-medium">Recuperar Contraseña</div>
          <div class="mt-2.5 text-slate-600 dark:text-slate-400 flex flex-col gap-2">
            <p>¿No recuerdas tu contraseña?</p>
            <p>
              No te preocupes, te enviaremos un correo electrónico con un enlace para restablecer tu
              contraseña.
            </p>
          </div>

          <!-- ? ######################## ALERT ######################## ? -->

          <Alert :variant="alertVariant" v-if="errorMail || warningMail" :message="messageMail" :dismissible="true"
            class="flex items-center px-4 py-3 my-7" />

          <div class="mt-6">
            <FormLabel>Correo electrónico*</FormLabel>
            <FormInput type="text" class="block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80"
              placeholder="correo@mail.com" v-model="email" />
            <div class="flex flex-row text-red-600 p-2">
              {{ statusMail.message }}
            </div>

            <div class="mt-5 text-center xl:mt-8 xl:text-left">
              <Button @click="sendMail" variant="primary" rounded :disabled="loadingMail || !statusMail.value"
                :class="`bg-gradient-to-r transition-all border-none scale-105 duration-200 w-full py-3.5 xl:mr-3 ${statusMail.value && !loadingMail ? 'from-theme-2 to-theme-3 hover:scale-100 select-none cursor-pointer' : 'from-gray-600 to-gray-600 cursor-default'}`">
                <LoadingIcon v-if="loadingMail" icon="three-dots" class="w-8 h-5" color="white" />
                {{ loadingMail ? '' : 'Enviar correo' }}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- ? ######################## Mensaje de éxito ######################## ? -->

      <div class="relative z-10 flex flex-col justify-center w-full h-full py-2 lg:py-32" v-else>
        <div class="mt-10 text-center">
          <Lucide icon="CheckCircle" class="w-16 h-16 text-theme-1 dark:text-green-500 mx-auto" />
          <div class="text-3xl font-bold mt-4 dark:text-slate-200">¡Listo!</div>
          <div class="mt-4 text-slate-600 dark:text-slate-400 flex flex-col gap-2">
            <p class="text-lg">¡Correo enviado!</p>
            <p class="text-lg">
              Hemos enviado un correo electrónico a <span class="font-medium dark:text-slate-200">{{ email }}</span> con
              un enlace para
              restablecer tu contraseña.
            </p>
          </div>
          <div class="mt-6">
            <button @click="router.push({ name: 'login' })"
              class="bg-theme-2 dark:bg-slate-700 dark:text-white py-3 px-6 rounded-lg hover:bg-theme-1 dark:hover:bg-slate-600 hover:text-black dark:hover:text-slate-200 transition-all duration-200">
              Regresar al inicio de sesión
            </button>
          </div>
        </div>
      </div>


    </div>
  </div>
  <div
    class="fixed container grid w-screen inset-0 h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] pl-14 pr-12 xl:px-24">
    <div :class="[
      'relative h-screen col-span-12 lg:col-span-5 2xl:col-span-4 z-20',
      'after:bg-white dark:after:bg-slate-900 after:hidden after:lg:block after:content-[\'\'] after:absolute after:right-0 after:inset-y-0 after:bg-gradient-to-b after:from-white dark:after:from-slate-900 after:to-slate-100/80 dark:after:to-slate-900 after:w-[800%] after:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0]',
      'before:content-[\'\'] before:hidden before:lg:block before:absolute before:right-0 before:inset-y-0 before:my-6 before:bg-gradient-to-b dark:before:from-slate-900/10 before:from-white/10 before:to-slate-50/10 dark:before:to-slate-900/10 before:bg-white/50 dark:before:bg-slate-900/50 before:w-[800%] before:-mr-4 before:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0]'
    ]"></div>
    <div :class="[
      'h-full col-span-7 2xl:col-span-8 lg:relative',
      'before:content-[\'\'] before:absolute before:lg:-ml-10 before:left-0 before:inset-y-0 before:bg-gradient-to-b before:from-theme-1 before:to-theme-2 before:w-screen before:lg:w-[800%]',
      'after:content-[\'\'] after:absolute after:inset-y-0 after:left-0 after:w-screen after:lg:w-[800%] after:bg-texture-white after:bg-fixed after:bg-center after:lg:bg-[25rem_-25rem] after:bg-no-repeat',
    ]">
      <DynamicText :phrases="[
        'No te preocupes, juntos recuperaremos tu acceso para seguir ayudando a la educación.',
        'Restablece tu contraseña y sigue siendo parte del cambio en las escuelas que más lo necesitan.',
        'Perder la contraseña es solo un pequeño obstáculo, tu impacto en la educación es lo que cuenta.',
        'Estamos aquí para ayudarte a recuperar tu acceso, porque cada esfuerzo en la educación importa.',
        'Un paso más para volver a nuestra misión: llevar oportunidades educativas a quienes más lo necesitan.',
        'Recupera tu acceso y continúa transformando el futuro de los estudiantes en comunidades desfavorecidas.',
        'Cada voluntario cuenta, y te ayudaremos a regresar para seguir apoyando a las escuelas.',
        'Recupera tu contraseña y sigue marcando la diferencia con tu voluntariado y dedicación.',
        'Restablecer tu acceso te permitirá seguir brindando apoyo educativo a quienes más lo necesitan.',
        'Tu compromiso es invaluable, te ayudamos a volver para que sigas siendo parte de nuestra misión.'
      ]" :changeColor="changeColor" />
      <br><div class="hidden lg:block absolute bottom-40 ml-4 md:ml-20 lg:ml-[70px] xl:ml-[110px] text-white">
        <h2 class="text-4xl font-bold">SummerLearn</h2>
        <p class="mt-2 text-lg">Transformando la educación, un paso a la vez.</p>
      </div>
    </div>
  </div>
</template>
