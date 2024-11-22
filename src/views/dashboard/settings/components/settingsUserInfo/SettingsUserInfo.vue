<script setup>
import {
  useStatus,
  useRefs,
  useValidateFunctions,
  useUpdateUser
} from '@/hooks/settings/userInfoUpdate/'
import { FormInput } from '@/components/base/Form'
import { watch, computed, onMounted, inject } from 'vue'
import LoadingIcon from '@/components/base/LoadingIcon'
import Litepicker from '@/components/base/Litepicker'
import Lucide from '@/components/base/Lucide'
import Button from '@/components/base/Button'

const { user, loadingUser, errorUser, loadUser } = inject('user')
const { status } = useStatus()
const { firstName, lastName, phone, birthdate, valid } = useRefs()
const { validateText, validateDate, validateInputPhone, validate, formatPhone } =
  useValidateFunctions({ valid, status })
const validChanges = computed(() => {
  return (
    valid.value &&
    (firstName.value !== user.value.firstName ||
      lastName.value !== user.value.lastName ||
      formatPhone(phone.value.replace(/\D/g, '')) !==
        formatPhone(user.value.phone.replace(/\D/g, '')) ||
      birthdate.value !== user.value.birthdate.split('-').reverse().join('/'))
  )
})

const { loadingUserEdit, updateUser } = useUpdateUser({
  phone,
  firstName,
  lastName,
  birthdate,
  valid,
  validate,
  loadUser
})
// Año mínimo para la fecha de nacimiento
const minYear = new Date().getFullYear() - 18

onMounted(() => {
  const assignUserValues = () => {
    // Asignar los valores del usuario a los campos
    if (user.value.firstName) firstName.value = user.value.firstName
    let e = { target: { value: firstName.value, name: 'firstName' } }
    validateText(e)

    if (user.value.lastName) lastName.value = user.value.lastName
    e = { target: { value: lastName.value, name: 'lastName' } }
    validateText(e)

    if (user.value.phone) phone.value = user.value.phone
    e = { target: { value: phone.value, name: 'phone' } }
    validateInputPhone(e)
    validateText(e)
    if (user.value.phone) phone.value = formatPhone(user.value.phone)

    if (user.value.birthdate) birthdate.value = user.value.birthdate.split('-').reverse().join('/')

    validate()
  }

  watch(() => user.value, assignUserValues, { immediate: true })
})

watch(birthdate, (value) => {
  validateDate(value)
})
</script>

<template>
  <div class="flex flex-col p-5 box box--stacked">
    <div
      class="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem] dark:text-slate-200"
    >
      Tu información personal
    </div>

    <div v-if="errorUser" class="flex items-center justify-center h-40">
      <div class="text-red-500 text-center flex flex-col w-full justify-center items-center">
        <Lucide icon="AlertTriangle" class="w-20 h-20" />
        <div class="mt-2 text-2xl">Error al cargar la información, intenta más tarde.</div>
      </div>
    </div>

    <div v-if="loadingUser" class="flex items-center justify-center h-40">
      <LoadingIcon icon="three-dots" class="h-10" customClass="fill-theme-1" />
    </div>

    <div v-if="!loadingUser && !errorUser">
      <!-- ? ################################# Nombre completo ################################# ? -->

      <div
        class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0"
      >
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium dark:text-slate-200">Nombre completo</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500"
              >
                Requerido
              </div>
            </div>
            <div
              class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400"
            >
              Por favor, ingrese el nombre completo del usuario.
            </div>
          </div>
        </label>
        <div class="flex-1 w-full mt-3 xl:mt-0">
          <div class="flex flex-col items-center md:flex-row">
            <FormInput
              type="text"
              name="firstName"
              v-model="firstName"
              @input="validateText"
              @keydown.enter.prevent="
                () => {
                  if (valid && validChanges && !loadingUserEdit && !loadingUser) updateUser()
                }
              "
              class="first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10 dark:text-slate-200"
              placeholder="Escriba aquí su nombre..."
            />
            <FormInput
              type="text"
              name="lastName"
              v-model="lastName"
              @input="validateText"
              @keydown.enter.prevent="
                () => {
                  if (valid && validChanges && !loadingUserEdit && !loadingUser) updateUser()
                }
              "
              class="first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10 dark:text-slate-200"
              placeholder="Escriba aquí su apellido..."
            />
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

      <!-- ? ################################# Fecha de nacimiento ################################# ? -->

      <div
        class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0"
      >
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium dark:text-slate-200">Fecha de nacimiento</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500"
              >
                Requerido
              </div>
            </div>
            <div
              class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400"
            >
              Por favor, ingrese la fecha de nacimiento del usuario.
            </div>
          </div>
        </label>
        <div class="flex-1 w-full mt-3 xl:mt-0">
          <Litepicker
            v-model="birthdate"
            name="birthdate"
            class="cursor-[pointer!important] dark:text-slate-200"
            readonly
            :options="{
              autoApply: false,
              dropdowns: {
                minYear: 1950,
                maxYear: minYear,
                months: true,
                years: true
              },
              format: 'DD/MM/YYYY'
            }"
            placeholder="DD/MM/YYYY"
          />

          <div class="text-red-500 mt-2 dark:text-red-400">{{ status.birthdate.message }}</div>
        </div>
      </div>

      <!-- ? ################################# Teléfono celular ################################# ? -->

      <div
        class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0"
      >
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium dark:text-slate-200">Número de teléfono celular</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500"
              >
                Requerido
              </div>
            </div>
            <div
              class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400"
            >
              Por favor, ingrese el número de teléfono del usuario.
            </div>
          </div>
        </label>
        <div class="flex-1 w-full mt-3 xl:mt-0">
          <FormInput
            type="text"
            placeholder="Escriba aquí su teléfono celular..."
            name="phone"
            @keydown.enter.prevent="
              () => {
                if (valid && validChanges && !loadingUserEdit && !loadingUser) updateUser()
              }
            "
            class="dark:text-slate-200 dark:placeholder:!text-slate-400"
            v-model="phone"
            @input="
              (e) => {
                validateInputPhone(e)
                validateText(e)
              }
            "
          />
          <div class="text-red-500 mt-2 dark:text-red-400">{{ status.phone.message }}</div>
        </div>
      </div>
    </div>
    <div
      class="flex pt-5 mt-6 border-t border-dashed md:justify-end border-slate-300/70"
      v-if="!errorUser"
    >
      <Button
        variant="outline-success"
        class="w-full px-10 md:w-auto border-primary/50 dark:text-slate-200"
        :disabled="!valid || !validChanges || loadingUser || loadingUserEdit"
        @click="updateUser"
      >
        <Lucide v-if="!loadingUserEdit" icon="Check" class="stroke-[1.3] w-4 h-4 mr-2 -ml-2" />
        <LoadingIcon
          v-if="loadingUserEdit"
          icon="tail-spin"
          class="stroke-[1.3] w-4 h-4 mr-2 -ml-2"
          color="black"
        />
        {{ loadingUserEdit ? 'Guardando cambios...' : 'Guardar cambios' }}
      </Button>
    </div>
  </div>
</template>
