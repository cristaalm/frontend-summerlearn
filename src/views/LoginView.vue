<script setup lang="ts">
import { FormInput, FormLabel } from '@/components/base/Form'
import Button from '@/components/base/Button'
import Alert from '@/components/base/Alert'
import Lucide from '@/components/base/Lucide'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Baseurl } from '@/../global'

const router = useRouter()

// Define reactive variables
const email = ref('') // Stores the value of the email input field
const password = ref('') // Stores the value of the password input field
const valid = ref(false) // Indicates whether the form is valid or not
const loading = ref(false) // Indicates whether the form is loading or not
const error = ref('') // Stores the error message to be displayed

// Define an object to track the validation status of each input field
const status = ref({
  email: {
    value: false, // Indicates whether the email input is valid or not
    Regex: /^(?=.{1,100}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // Regular expression to validate email format
  },
  password: {
    value: false, // Indicates whether the password input is valid or not
    Regex: /^[a-zA-Z0-9_-]{7,}$/ // Regular expression to validate password format
  }
})

// Function to validate the entire form
const validate = () => {
  error.value = '' // Clear the error message
  const validForm = Object.keys(status.value).every((key) => status.value[key].value)
  valid.value = validForm
}

// Function to validate individual input fields
const validateInput = (key) => {
  status.value[key].value = status.value[key].Regex.test(
    key === 'email' ? email.value : password.value
  )
  validate()
}

const loginUser = async (event) => {
  event.preventDefault() // Prevent the default form submission
  error.value = '' // Clear the error message
  loading.value = true // Set the loading state to true
  try {
    const response = await fetch(Baseurl + '/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        users_mail: email.value,
        users_password: password.value,
      }),
    })
    const data = await response.json()
    if (response.ok) {
      console.log('Login successful')
      // Save tokens to local storage or any other preferred method
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)

      // Redirect to another view after successful login
      router.push({ name: 'Dashboard' })
    } else {
      console.error('Error:', data)
      error.value = 'Correo electrónico o contraseña incorrectos'
      loading.value = false
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

</script>

<template>
  <div
    class="container grid lg:h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] py-10 px-5 sm:py-14 sm:px-10 md:px-36 lg:py-0 lg:pl-14 lg:pr-12 xl:px-24">
    <div :class="[
      'relative z-50 h-full col-span-12 p-7 sm:p-14 bg-white rounded-2xl lg:bg-transparent lg:pr-10 lg:col-span-5 xl:pr-24 2xl:col-span-4 lg:p-0'
    ]">
      <div class="relative z-10 flex flex-col justify-center w-full h-full py-2 lg:py-32">
        <div class="mt-10">
          <div class="text-2xl font-medium">Iniciar sesión</div>
          <div class="mt-2.5 text-slate-600">
            ¿No tienes una cuenta?
            <a class="font-medium text-primary" href="/Register"> Regístrate </a>
          </div>

          <Alert variant="outline-danger" v-if="error"
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
          </Alert>
          
          <div class="mt-6">
            <FormLabel>Correo electrónico*</FormLabel>
            <FormInput type="text" class="block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80"
              placeholder="correo@mail.com" v-model="email" @input="validateInput('email')" />
            <FormLabel class="mt-4">Contraseña*</FormLabel>
            <FormInput type="password" class="block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80"
              placeholder="************" v-model="password" @input="validateInput('password')" />
            <div class="flex flex-row justify-end mt-4 text-xs text-slate-500 sm:text-sm">
              <a href="">¿Olvidaste tu contraseña?</a>
            </div>
            <div class="mt-5 text-center xl:mt-8 xl:text-left">
              <Button @click="loginUser" :disabled="valid && !loading" variant="primary" rounded
                :class="`bg-gradient-to-r transition-all scale-105 duration-200 w-full py-3.5 xl:mr-3 ${valid && !loading ? 'from-theme-1 to-theme-2 hover:scale-100 select-none cursor-pointer' : 'from-gray-600 to-gray-600  cursor-default'}`">
                {{ loading ? 'Cargando...' : 'Iniciar sesión' }}
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
