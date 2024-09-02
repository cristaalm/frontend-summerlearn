<script setup lang="ts">
import { FormCheck, FormInput, FormLabel } from "@/components/Base/Form";
import Tippy from "@/components/Base/Tippy";
import Button from "@/components/Base/Button";
import _ from "lodash";
import { password, firstName, lastName, email, birthdate, perfil, terms, password_confirm, valid } from '@/validations/register/useFormRefs.js';
import { validateText, validateDate, validateTerms, validatePasswordComfirm, validatePerfil} from '@/validations/register/useValidationFunctions.js';
import { validatePassword } from '@/validations/register/usePasswordSecurity.js';
import { status } from '@/validations/register/useFormStatus.js';

// valid:  is a computed property that checks if all the fields are valid

</script>


<template>
  <div
    class="container grid lg:h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] py-10 px-5 sm:py-14 sm:px-10 md:px-36 lg:py-0 lg:pl-14 lg:pr-12 xl:px-24"
  >
    <div
      :class="[
        'relative z-50 h-full col-span-12 p-7 sm:p-14 bg-white rounded-2xl lg:bg-transparent lg:pr-10 lg:col-span-5 xl:pr-24 2xl:col-span-4 lg:p-0',
      ]"
    >
      <div
        class="relative z-10 flex flex-col justify-center w-full h-full py-2"
      >
        
        <div class="mt-10">
            <div class="text-2xl font-medium">Registrarse</div>
            <div class="mt-2.5 text-slate-600">
            ¿Ya tienes una cuenta?
            <a class="font-medium text-primary" href="/Login"> Iniciar sesión </a>
            </div>
            <div class="mt-6">
            <FormLabel>Nombre*</FormLabel>
            <FormInput
              type="text"
              name="firstName"
              :class="`block px-4 py-3.5 border-[2px] rounded-[0.6rem]  ${ status.firstName.error ? 'border-red-300/80' : 'border-slate-300/80' }`"
              v-model="firstName"
              @input="validateText"
            />
            <div class="flex flex-row text-red-600 p-2" v-if="status.firstName.menssage">{{ status.firstName.menssage }}</div>
            <FormLabel class="mt-5">Apellido*</FormLabel>
            <FormInput
              type="text"
              name="lastName"
              :class="`block px-4 py-3.5 border-[2px] rounded-[0.6rem] ${ status.lastName.error ? 'border-red-300/80' : 'border-slate-300/80' }`"
              v-model="lastName"
              @input="validateText"
            />
            <div class="flex flex-row text-red-600 p-2" v-if="status.lastName.menssage">{{ status.lastName.menssage }}</div>
            <FormLabel class="mt-5">Correo electrónico*</FormLabel>
            <FormInput
              type="text"
              name="email"
              :class="`block px-4 py-3.5 border-[2px] rounded-[0.6rem] ${ status.email.error ? 'border-red-300/80' : 'border-slate-300/80' }`"
              v-model="email"
              @input="validateText"
            />
            <div class="flex flex-row text-red-600 p-2" v-if="status.email.menssage">{{ status.email.menssage }}</div>
            <FormLabel class="mt-5">Fecha de nacimiento*</FormLabel>
            <FormInput
              type="date"
              name="birthdate"
              :class="`block px-4 py-3.5 border-[2px] rounded-[0.6rem] ${ status.birthdate.error ? 'border-red-300/80' : 'border-slate-300/80' }`"
              v-model="birthdate"
              @input="validateDate"
            />
            <div class="flex flex-row text-red-600 p-2" v-if="status.birthdate.menssage">{{ status.birthdate.menssage }}</div>
            
            <FormLabel class="mt-5">Contraseña*</FormLabel>
            <FormInput
              type="password"
              name="password"
              :class="`block px-4 py-3.5 border-[2px] rounded-[0.6rem] ${ status.password.error ? 'border-red-300/80' : 'border-slate-300/80' }`"
              placeholder="************"
              v-model="password"
              @input="
              (e) => {
                validatePassword(e)
                validatePasswordComfirm(e)
              }
              "
            />
            <div class="flex flex-row text-red-600 p-2" v-if="status.password.menssage">{{ status.password.menssage }}</div>
            <div class="grid w-full h-1.5 grid-cols-12 gap-4 mt-3.5">
              <div
              :class="`h-full col-span-3 border rounded bg-slate-400/30 border-slate-400/20 ${status.password.color} ${ status.password.secure >= 0 ? 'active' : '' }`"
              ></div>
              <div
              :class="`h-full col-span-3 border rounded bg-slate-400/30 border-slate-400/20 ${status.password.color} ${ status.password.secure >= 2 ? 'active' : '' }`"
              ></div>
              <div
              :class="`h-full col-span-3 border rounded bg-slate-400/30 border-slate-400/20 ${status.password.color} ${ status.password.secure >= 3 ? 'active' : '' }`"
              ></div>
              <div
              :class="`h-full col-span-3 border rounded bg-slate-400/30 border-slate-400/20 ${status.password.color} ${ status.password.secure >= 4 ? 'active' : '' }`"
              ></div>
            </div>
            <a href="" class="block mt-3 text-xs text-slate-500/80 sm:text-sm">
              ¿Qué es una contraseña segura?
            </a>
            <FormLabel class="mt-5">Confirmación de contraseña*</FormLabel>
            <FormInput
              type="password"
              name="password_confirm"
              :class="`block px-4 py-3.5 border-[2px] rounded-[0.6rem] ${ status.password_confirm.error ? 'border-red-300/80' : 'border-slate-300/80' }`"
              placeholder="************"
              v-model="password_confirm"
              @input="validatePasswordComfirm"
            />
            <div class="flex flex-row text-red-600 p-2" v-if="status.password_confirm.menssage">{{ status.password_confirm.menssage }}</div>
            <!-- El perfil es un select -->
            <FormLabel class="mt-5">Perfil*</FormLabel>
            <select
              name="perfil"
              :class="`block w-full px-4 py-3.5 border-[2px] rounded-[0.6rem] ${ status.perfil.error ? 'border-red-300/80' : 'border-slate-300/80' }`"
              v-model="perfil"
              @change="validatePerfil"
            >
              <option value="" selected class="text-black">Seleccionar perfil</option>
              <option value="1" class="text-black">Beneficiario</option>
              <option value="2" class="text-black">Voluntario</option>
              <option value="3" class="text-black">Donante</option>
            </select>
            <div class="flex flex-row text-red-600 p-2" v-if="status.perfil.menssage">{{ status.perfil.menssage }}</div>
            <div
              class="flex items-center mt-5 text-xs text-slate-500 sm:text-sm"
            >
              <FormCheck.Input
              name="terms"
              type="checkbox"
              class="mr-2 border"
              v-model="terms"
              @change="validateTerms"
              />
              <label class="cursor-pointer select-none" htmlFor="remember-me">
              Acepto los términos y condiciones
              </label>
              <a class="ml-1 text-primary dark:text-slate-200" href="/terms">
              Política de privacidad
              </a>
              .
            </div>
            <div class="mt-5 text-center xl:mt-8 xl:text-left">
              <Button
              variant="primary"
              rounded
            :class="`bg-gradient-to-r transition-all scale-105 duration-200 w-full py-3.5 xl:mr-3 ${ valid ? 'from-theme-1 to-theme-2 hover:scale-100 select-none cursor-pointer' : 'from-gray-600 to-gray-600 select-none cursor-default' }`"
              >
              Registrarse
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="fixed container grid w-screen inset-0 h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] pl-14 pr-12 xl:px-24"
  >
    <div
      :class="[
        'relative h-screen col-span-12 lg:col-span-5 2xl:col-span-4 z-20',
        'after:bg-white after:hidden after:lg:block after:content-[\'\'] after:absolute after:right-0 after:inset-y-0 after:bg-gradient-to-b after:from-white after:to-slate-100/80 after:w-[800%] after:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0]',
        'before:content-[\'\'] before:hidden before:lg:block before:absolute before:right-0 before:inset-y-0 before:my-6 before:bg-gradient-to-b before:from-white/10 before:to-slate-50/10 before:bg-white/50 before:w-[800%] before:-mr-4 before:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0]',
      ]"
    ></div>
    <div
      :class="[
        'h-full col-span-7 2xl:col-span-8 lg:relative',
        'before:content-[\'\'] before:absolute before:lg:-ml-10 before:left-0 before:inset-y-0 before:bg-gradient-to-b before:from-theme-1 before:to-theme-2 before:w-screen before:lg:w-[800%]',
        'after:content-[\'\'] after:absolute after:inset-y-0 after:left-0 after:w-screen after:lg:w-[800%] after:bg-texture-white after:bg-fixed after:bg-center after:lg:bg-[25rem_-25rem] after:bg-no-repeat',
      ]"
    >
      <div
        class="sticky top-0 z-10 flex-col justify-center hidden h-screen ml-16 lg:flex xl:ml-28 2xl:ml-36"
      >
        <div
          class="leading-[1.4] text-[2.6rem] xl:text-5xl font-medium xl:leading-[1.2] text-white"
        >
          Abraza la Excelencia <br />
          en el Desarrollo del Panel de Control
        </div>
        <div class="mt-5 text-base leading-relaxed xl:text-lg text-white/70">
          Desbloquea el potencial de Tailwise, donde los desarrolladores crean paneles de control meticulosamente estructurados y visualmente impresionantes con módulos ricos en funciones. Únete hoy para dar forma al futuro del desarrollo de tu aplicación.
        </div>
      </div>
    </div>
  </div>
</template>
