<script setup>
import { FormInput, FormLabel, InputGroup } from '@/components/base/Form'
import Button from '@/components/base/Button'
import Alert from '@/components/base/Alert'
import Lucide from '@/components/base/Lucide'
import LoadingIcon from '@/components/base/LoadingIcon'
import { useFormValidation } from '@/hooks/login/useFormValidation'
import { useAuth } from '@/hooks/login/useAuth'
import { useRouter } from 'vue-router'
import { useRefs } from '@/hooks/login/useRefs'
import { computed, onMounted, ref, watch } from 'vue'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import DynamicText from '@/components/DynamicText'
import { changeLoginColorScheme, changeColorScheme } from '@/utils/switchColorScheme'

const { showPassword } = useRefs()
const { loginUser, loading, error, loginSuccess } = useAuth()
const { email, password, valid, validateInput } = useFormValidation({ error })
const router = useRouter()
const colorSchame = ref('theme-19')
const changeColor = () => {

  if (loginSuccess.value) {
    return
  }

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

// Computa dinámicamente el `variant` basado en el estado
const alertVariant = computed(() => {
  return loginSuccess.value ? 'soft-success' : error.value ? 'soft-danger' : ''
})

</script>

<template>
  <div
    class="container grid lg:h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] py-10 px-5 sm:py-14 sm:px-10 md:px-36 lg:py-0 lg:pl-14 lg:pr-12 xl:px-24">
    <div :class="[
      'relative z-50 h-full col-span-12 p-7 sm:p-14 bg-white dark:bg-slate-900 rounded-2xl lg:bg-transparent lg:pr-10 lg:col-span-5 xl:pr-24 2xl:col-span-4 lg:p-0'
    ]">
      <!-- ? ######################## Formulario de inicio de sesión ######################## ? -->

      <div class="relative z-10 flex flex-col justify-center w-full h-full py-2 lg:py-32" v-if="!loginSuccess">
        <div class="flex flex-row justify-start items-center">
          <span @click="router.push({ name: 'home' })"
            class="flex flex-row gap-2 transition-all duration-200 hover:scale-95 !text-black dark:!text-slate-200 !border-transparent cursor-pointer">
            <Lucide icon="ArrowLeft" class="w-5 h-5" />
            Regresar
          </span>
        </div>
        <div class="mt-10 dark:text-slate-200">
          <div class="text-2xl font-medium">Iniciar sesión</div>

          <!-- ? ######################## ALERT ######################## ? -->

          <Alert :variant="alertVariant" v-if="error" :message="error ? error : loginSuccess ? loginSuccess : ''"
            class="flex items-center px-4 py-3 my-7" />

          <div class="mt-6">
            <FormLabel>Correo electrónico <span class="text-red-600 bold">*</span></FormLabel>
            <FormInput type="text" class="block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80"
              placeholder="correo@mail.com" v-model="email" @input="validateInput('email')"
              @keydown.enter.prevent="() => { if (valid && !loading && loginSuccess == '') loginUser({ email, password }) }" />

            <FormLabel class="mt-4">Contraseña <span class="text-red-600 bold">*</span></FormLabel>

            <div class="flex-1 w-full mt-3 xl:mt-0">
              <InputGroup class="mt-2">
                <FormInput placeholder="************" :type="`${showPassword ? 'text' : 'password'}`"
                  @keydown.enter.prevent="() => { if (valid && !loading && loginSuccess == '') loginUser({ email, password }) }"
                  htmlid="inputPassword" class="block px-4 py-3.5" name="password" v-model="password"
                  @input="validateInput('password')" />
                <InputGroup.Text @click="() => {
                  showPassword = !showPassword
                }
                  " class="cursor-pointer flex flex-col justify-center items-center">
                  <button>
                    <Lucide icon="Eye" class="w-4 h-4 stroke-[1.3] text-green-500" v-if="showPassword" />
                    <Lucide icon="EyeOff" class="w-4 h-4 stroke-[1.3] text-red-500" v-else />
                  </button>
                </InputGroup.Text>
              </InputGroup>
            </div>
            <div
              class="flex flex-row justify-end mt-4 text-xs text-slate-500 sm:text-sm hover:text-green-500 dark:hover:text-blue-500">
              <span class="cursor-pointer" @click="router.push({ name: 'forgotPassword' })">¿Olvidaste tu
                contraseña?</span>
            </div>
            <!-- avisos de privacidad -->
            <div class="flex items-center mt-5 text-xs sm:text-sm">
              Lee nuestros
              <a class="ml-1 text-primary dark:text-slate-400" href="/privacy" target="_blank">
                Avisos de privacidad
              </a>
            </div>
            <div class="mt-5 text-center xl:mt-8 xl:text-left">
              <Button @click="() => {
                loginUser({ email, password })
              }
                " :disabled="!valid || loading || !loginSuccess == ''" variant="primary" rounded
                :class="`bg-gradient-to-r transition-all border-none scale-105 duration-200 w-full py-3.5 xl:mr-3 ${valid && !loading && loginSuccess == '' ? 'from-theme-2 to-theme-3 hover:scale-100 select-none cursor-pointer' : 'from-gray-600 to-gray-600 cursor-default'}`">
                <LoadingIcon v-if="loading" icon="three-dots" class="w-8 h-5" color="white" />
                {{ loading ? '' : 'Iniciar Sesión' }}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- ? ######################## Mensaje de éxito ######################## ? -->
      <div class="relative z-10 flex flex-col justify-center w-full h-full py-2 lg:py-32" v-else>
        <div class="mt-10 text-center">
          <Lucide icon="CheckCircle" class="w-16 h-16 text-theme-1 dark:text-green-500 mx-auto" />
          <div class="text-3xl font-bold mt-4 dark:text-slate-200">¡Bienvenido!</div>
          <div class="mt-4 text-slate-600 dark:text-slate-400 flex flex-col gap-2">
            <p class="text-lg">Has iniciado sesión correctamente.</p>
            <p class="text-lg">Redirigiendo...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="fixed container grid w-screen inset-0 h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] pl-14 pr-12 xl:px-24">
    <div :class="[
      'relative h-screen col-span-12 lg:col-span-5 2xl:col-span-4 z-20 transition-all duration-500',
      'after:bg-white transition-all before:transition-all after:transition-all duration-500 dark:after:bg-slate-900 after:hidden after:lg:block after:content-[\'\'] after:absolute after:right-0 after:inset-y-0 after:bg-gradient-to-b after:from-white dark:after:from-slate-900 after:to-slate-100/80 dark:after:to-slate-900 after:w-[800%] after:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0]',
      'before:content-[\'\'] before:hidden before:lg:block before:absolute before:right-0 before:inset-y-0 before:my-6 before:bg-gradient-to-b dark:before:from-slate-900/10 before:from-white/10 before:to-slate-50/10 dark:before:to-slate-900/10 before:bg-white/50 dark:before:bg-slate-900/50 before:w-[800%] before:-mr-4 before:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0]'
    ]"></div>
    <div :class="[
      'h-full col-span-7 2xl:col-span-8 lg:relative transition-all duration-500',
      'before:content-[\'\'] before:transition-all after:transition-all duration-500 before:absolute before:lg:-ml-10 before:left-0 before:inset-y-0 before:bg-gradient-to-b before:from-theme-1 before:to-theme-2 before:w-screen before:lg:w-[800%]',
      'after:content-[\'\'] after:absolute after:inset-y-0 after:left-0 after:w-screen after:lg:w-[800%] after:bg-texture-white after:bg-fixed after:bg-center after:lg:bg-[25rem_-25rem] after:bg-no-repeat'
    ]">
      <DynamicText :phrases="[
        'Bienvenido a SummerLearn, juntos construimos un futuro brillante.',
        'Inicia sesión y sé parte de nuestra misión educativa.',
        'Ayudamos a llevar educación a las comunidades que más lo necesitan.',
        'Tu esfuerzo hoy cambiará el futuro de muchas escuelas.',
        'Juntos, apoyamos a estudiantes con pocos recursos a alcanzar sus sueños.',
        'Cada acción cuenta, únete y marca la diferencia en la educación.',
        'Accede a nuestra plataforma y coordina proyectos de voluntariado.',
        'Inicia sesión y transforma la vida de estudiantes con educación de calidad.',
        'Gracias a ti, llevamos materiales y apoyo a quienes más lo necesitan.',
        'Sé parte de SummerLearn, creando oportunidades para las próximas generaciones.'
      ]" :changeColor="changeColor" />
      <br>
      <div class="hidden lg:block absolute bottom-40 ml-4 md:ml-20 lg:ml-[70px] xl:ml-[110px] text-white">
        <h2 class="text-4xl font-bold">SummerLearn</h2>
        <p class="mt-2 text-lg">Transformando la educación, un paso a la vez.</p>
      </div>
    </div>
  </div>
  <ThemeSwitcher />
</template>
