import { ref, watch } from 'vue'

export function useValidations({ status, concept, amount }) {
  const valid = ref(false)
  const lastAmount = ref('')

  //? ################################### METHODS ###################################

  const validateInputAmount = (e) => {
    const { value } = e.target
    const regex = /^\d*\.?\d{0,2}$/

    // Permitir el valor si es válido (número entero o con hasta dos decimales)
    if (regex.test(value)) {
      lastAmount.value = value
    } else {
      // Si el valor no es válido, revertir al último valor permitido
      e.target.value = lastAmount.value
    }
  }

  const validateAmount = (value) => {
    const { Regex } = status.value.amount
    if (Regex.test(value)) {
      status.value.amount.success = true
      status.value.amount.error = false
      status.value.amount.message = ''
    } else {
      status.value.amount.success = false
      status.value.amount.error = true
      status.value.amount.message = `El monto no es válido`
    }
  }

  const validateConcept = (value) => {
    const { Regex } = status.value.concept
    if (Regex.test(value)) {
      status.value.concept.success = true
      status.value.concept.error = false
      status.value.concept.message = ''
    } else {
      status.value.concept.success = false
      status.value.concept.error = true
      status.value.concept.message = `El concepto no es válido`
    }
  }

  const validate = () => {
    const { concept, amount } = status.value
    valid.value = concept.success && amount.success ? true : false
  }

  //? ################################### WATCHERS ###################################

  watch(concept, (newValue) => {
    validateConcept(newValue)
  })

  watch(amount, (newValue) => {
    validateAmount(newValue)
  })

  watch(status.value, () => {
    validate()
  })

  return { valid, validateInputAmount }
}
