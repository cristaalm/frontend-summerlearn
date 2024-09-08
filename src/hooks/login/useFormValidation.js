import { ref } from 'vue'

export function useFormValidation({ error }) {
  const email = ref('')
  const password = ref('')
  const valid = ref(false)
  const status = ref({
    email: {
      value: false,
      Regex: /^(?=.{1,100}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
      value: false,
      Regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
    }
  })

  const validate = () => {
    error.value = ''
    const validForm = Object.keys(status.value).every((key) => status.value[key].value)
    valid.value = validForm
  }

  const validateInput = (key) => {
    status.value[key].value = status.value[key].Regex.test(
      key === 'email' ? email.value : password.value
    )
    validate()
  }

  return {
    email,
    password,
    valid,
    validateInput
  }
}
