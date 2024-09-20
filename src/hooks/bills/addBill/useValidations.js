import { ref, watch } from 'vue'

export function useValidations({ status, concept, amount, donation }) {
  const valid = ref(false)
  const lastAmount = ref('')

  //? ################################### METHODS ###################################

  const validateInputAmount = (e) => {
    const { value } = e.target
    const regex = /^$|^\d+(\.\d{1,2})?$/
    if (regex.test(value)) {
      lastAmount.value = value
    } else {
      amount.value = lastAmount.value
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

  const validateDonation = (value) => {
    const { Regex } = status.value.donation
    if (Regex.test(value)) {
      status.value.donation.success = true
      status.value.donation.error = false
      status.value.donation.message = ''
    } else {
      status.value.donation.success = false
      status.value.donation.error = true
      status.value.donation.message = `La donación seleccionada no es válida`
    }
  }

  const validate = () => {
    const { concept, amount, donation } = status.value
    valid.value = concept.success && amount.success && donation.success ? true : false
  }

  //? ################################### WATCHERS ###################################

  watch(concept, (newValue) => {
    validateConcept(newValue)
  })

  watch(amount, (newValue) => {
    validateAmount(newValue)
  })

  watch(donation, (newValue) => {
    validateDonation(newValue)
  })

  watch(status.value, () => {
    validate()
  })

  return { valid, validateInputAmount }
}
