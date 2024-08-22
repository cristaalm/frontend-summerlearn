<script setup>
import { ref } from 'vue'

// Define reactive variables
const email = ref('') // Stores the value of the email input field
const password = ref('') // Stores the value of the password input field
const valid = ref(false) // Indicates whether the form is valid or not

// Define an object to track the validation status of each input field
const status = ref({
  email: {
    value: false, // Indicates whether the email input is valid or not
    Regex: /^(?=.{1,100}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // Regular expression to validate email format
  },
  password: {
    value: false, // Indicates whether the password input is valid or not
    Regex: /^[a-zA-Z0-9_-]{8,}$/ // Regular expression to validate password format
  }
})

// Function to validate the entire form
const validate = () => {
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
</script>

<template>
  <form class="flex flex-col justify-center items-center gap-4">
    <div class="m-2 w-full">
      <input
        type="email"
        id="email_login"
        placeholder="Email"
        name="email"
        class="border border-gray-400 px-2 py-1 bg-transparent active:border-emerald-500 hover:border-emerald-500 w-full text-white"
        v-model="email"
        @input="validateInput('email')"
      />
    </div>

    <div class="m-2 w-full">
      <input
        type="password"
        id="password_login"
        placeholder="Password"
        name="password"
        class="border border-gray-400 px-2 py-1 bg-transparent active:border-emerald-500 hover:border-emerald-500 w-full text-white"
        v-model="password"
        @input="validateInput('password')"
      />
    </div>

    <div class="flex flex-col mt-4">
      <button
        :class="`bg-transparent px-4 py-2 border transition-all duration-300 ${valid ? 'hover:bg-emerald-500 hover:scale-105 hover:text-white border-emerald-500 text-emerald-500 ' : 'border-gray-400 text-gray-400'}`"
      >
        Log in
      </button>
    </div>
  </form>
</template>
