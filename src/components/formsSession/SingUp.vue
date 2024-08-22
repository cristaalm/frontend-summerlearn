<script setup>
import { ref } from 'vue'

// Refs
const formRef = ref(null) // Reference to the form element
const status = ref({
  // Object to track the status of form fields
  firstName: {
    value: false, // Whether the first name field is valid
    error: false, // Whether there is an error in the first name field
    Regex: /^[a-zA-Z\s]{1,49}[a-zA-Z]$/ // Regular expression to validate the first name
  },
  lastName: {
    value: false,
    error: false,
    Regex: /^[a-zA-Z\s]{1,49}[a-zA-Z]$/
  },
  email: {
    value: false,
    error: false,
    Regex: /^(?=.{1,100}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  birthdate: {
    value: false,
    error: false,
    menssage: '', // Error message for the birthdate field
    Regex: /^\d{4}-\d{2}-\d{2}$/
  },
  password: {
    value: false,
    error: false,
    Regex: /^[a-zA-Z0-9_-]{8,}$/
  },
  password_confirm: {
    value: false,
    error: false,
    Regex: /^.{1,}$/,
    modified: false
  },
  perfil: {
    value: false,
    error: false,
    Regex: /^.{1,}$/
  },
  terms: {
    value: false,
    error: false,
    Regex: /^.{1,}$/
  }
})

// Variables
const firstName = ref('') // First name input value
const lastName = ref('') // Last name input value
const email = ref('') // Email input value
const birthdate = ref('') // Birthdate input value
const password = ref('') // Password input value
const password_confirm = ref('') // Password confirmation input value
const perfil = ref('') // Profile select value
const terms = ref(false) // Terms checkbox value
const valid = ref(false) // Whether the form is valid

// Validation functions
const validate = () => {
  const validForm = Object.keys(status.value).every((key) => status.value[key].value)
  valid.value = validForm
}

const validateText = (e) => {
  const { name, value } = e.target
  if (status.value[name].Regex.test(value)) {
    status.value[name].value = true
    status.value[name].error = false
  } else {
    status.value[name].value = false
    status.value[name].error = true
  }
  if (name === 'password_confirm') {
    status.value.password_confirm.modified = true
  }
  validate()
}

const validatePassword = (e) => {
  if (e.target.name === 'password_confirm' && !status.value.password_confirm.modified) {
    status.value.password_confirm.modified = true
  }
  if (password.value === password_confirm.value && status.value.password_confirm.modified) {
    status.value.password_confirm.value = true
    status.value.password_confirm.error = false
  } else if (status.value.password_confirm.modified) {
    status.value.password_confirm.value = false
    status.value.password_confirm.error = true
  }
  validate()
}

const validateDate = (e) => {
  const { name, value } = e.target
  if (status.value[name].Regex.test(value)) {
    status.value[name].value = true
    status.value[name].error = false
    if (name === 'birthdate') {
      const currentDate = new Date()
      const selectedDate = new Date(value)
      let age = currentDate.getFullYear() - selectedDate.getFullYear()
      const monthDiff = currentDate.getMonth() - selectedDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < selectedDate.getDate())) {
        age--
      }
      if (age >= 18) {
        status.value[name].error = false
      } else {
        status.value[name].error = true
        status.value[name].menssage = 'You must be at least 18 years old'
      }
    }
  } else {
    status.value[name].value = false
    status.value[name].error = true
    status.value[name].menssage = 'The date is invalid'
  }
  validate()
}

const validatePerfil = (e) => {
  const { name, value } = e.target
  if (status.value[name].Regex.test(value)) {
    status.value[name].value = true
    status.value[name].error = false
  } else {
    status.value[name].value = false
    status.value[name].error = true
  }
  validate()
}

const validateTerms = (e) => {
  const { name, checked } = e.target
  if (checked) {
    status.value[name].value = true
    status.value[name].error = false
  } else {
    status.value[name].value = false
    status.value[name].error = true
  }
  validate()
}
</script>

<template>
  <form class="flex flex-col justify-center items-center gap-4" ref="formRef">
    <!-- First name input -->
    <div class="flex flex-col md:flex-row gap-8 md:gap-2 m-2 w-full">
      <div class="flex flex-col w-full md:w-1/2">
        <input
          type="text"
          id="firstName"
          placeholder="First name"
          name="firstName"
          title="First name must contain only letters and have a maximum of 50 characters"
          :class="`w-full border border-gray-400 px-2 py-1 bg-transparent active:border-emerald-500 hover:border-emerald-500 ${status.firstName.error ? 'border-red-400 text-red-400 placeholder:text-red-400' : 'border-gray-400 text-white'}`"
          v-model="firstName"
          @input="validateText"
        />
        <span class="text-red-400" v-show="status.firstName.error"> The first name is invalid</span>
      </div>

      <!-- Last name input -->
      <div class="flex flex-col w-full md:w-1/2">
        <input
          type="text"
          id="lastName"
          placeholder="Last name"
          name="lastName"
          title="Last name must contain only letters and have a maximum of 50 characters."
          :class="`w-full border border-gray-400 px-2 py-1 bg-transparent active:border-emerald-500 hover:border-emerald-500 ${status.lastName.error ? 'border-red-400 text-red-400 placeholder:text-red-400' : 'border-gray-400 text-white'}`"
          v-model="lastName"
          @input="validateText"
        />
        <span class="text-red-400" v-show="status.lastName.error"> The last name is invalid</span>
      </div>
    </div>

    <!-- Email input -->
    <div class="m-2 w-full">
      <input
        type="email"
        id="email"
        placeholder="Email"
        name="email"
        :class="`border border-gray-400 px-2 py-1 bg-transparent active:border-emerald-500 hover:border-emerald-500 w-full ${status.email.error ? 'border-red-400 text-red-400 placeholder:text-red-400' : 'border-gray-400 text-white'}`"
        v-model="email"
        @input="validateText"
      />
      <span class="text-red-400" v-show="status.email.error"> The email is invalid</span>
    </div>

    <!-- Birthdate input -->
    <div class="m-2 w-full">
      <input
        type="date"
        id="birthdate"
        name="birthdate"
        :class="`border border-gray-400 px-2 py-1 bg-transparent active:border-emerald-500 hover:border-emerald-500 w-full ${status.birthdate.error ? 'border-red-400 text-red-400 placeholder:text-red-400' : 'border-gray-400 text-white'}`"
        placeholder="Birthdate"
        v-model="birthdate"
        @input="validateDate"
      />
      <span class="text-red-400" v-show="status.birthdate.error">
        {{ status.birthdate.menssage }}</span
      >
    </div>

    <!-- Password input -->
    <div class="m-2 w-full">
      <input
        type="password"
        name="password"
        id="password"
        title="Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and have a minimum of 8 characters"
        :class="`border border-gray-400 px-2 py-1 bg-transparent active:border-emerald-500 hover:border-emerald-500 w-full ${status.password.error ? 'border-red-400 text-red-400 placeholder:text-red-400' : 'border-gray-400 text-white'}`"
        placeholder="Password"
        v-model="password"
        @input="
          (e) => {
            validateText(e)
            validatePassword(e)
          }
        "
      />
      <span class="text-red-400" v-show="status.password.error"> The password is invalid</span>
    </div>

    <!-- Password confirmation input -->
    <div class="m-2 w-full">
      <input
        type="password"
        name="password_confirm"
        id="password_confirm"
        title="Password confirmation is required"
        :class="`border border-gray-400 px-2 py-1 bg-transparent active:border-emerald-500 hover:border-emerald-500 w-full ${status.password_confirm.error ? 'border-red-400 text-red-400 placeholder:text-red-400' : 'border-gray-400 text-white'}`"
        placeholder="Repeat password"
        v-model="password_confirm"
        @input="validatePassword"
      />
      <span class="text-red-400" v-show="status.password_confirm.error">
        The password confirm is invalid</span
      >
    </div>

    <!-- Profile select -->
    <div class="m-2 w-full">
      <select
        name="perfil"
        id="perfil"
        title="Perfil is required"
        :class="`border border-gray-400 px-2 py-1 bg-transparent active:border-emerald-500 hover:border-emerald-500 w-full ${status.perfil.error ? 'border-red-400 text-red-400 placeholder:text-red-400' : 'border-gray-400 text-white'}`"
        placeholder="Perfil"
        v-model="perfil"
        @change="validatePerfil"
      >
        <option value="" selected class="text-black">Select Profile</option>
        <option value="1" class="text-black">Beneficiary</option>
        <option value="2" class="text-black">Volunteer</option>
        <option value="3" class="text-black">Donor</option>
      </select>
      <span class="text-red-400" v-show="status.perfil.error"> The profile is required</span>
    </div>

    <!-- Terms checkbox -->
    <div class="m-2 w-full flex flex-row">
      <input
        type="checkbox"
        id="terms"
        name="terms"
        :class="`mx-2 hidden`"
        placeholder="Terms and conditions"
        v-model="terms"
        @change="validateTerms"
      />
      <label for="terms" class="relative flex items-center cursor-pointer text-white">
        <div
          :class="`w-4 h-4 border border-gray-400 rounded-sm mr-2 transition-all duration-300 ${status.terms.value ? 'bg-emerald-400' : 'bg-transparent'}`"
        ></div>
        <div class="text-sm select-none cursor-pointer">
          Accept
          <a href="#" class="text-emerald-500 hover:underline">terms and conditions</a>
        </div>
      </label>
    </div>

    <!-- Submit button -->
    <div class="flex flex-col mt-4">
      <button
        @click="handleSubmit"
        :disabled="!valid"
        :class="` select-none cursor-pointer bg-transparent px-4 py-2 border transition-all duration-300 ${valid ? 'hover:bg-emerald-500 hover:scale-105 hover:text-white border-emerald-500 text-emerald-500 ' : 'border-gray-400 text-gray-400'}`"
      >
        Sing up
      </button>
    </div>
  </form>
</template>
