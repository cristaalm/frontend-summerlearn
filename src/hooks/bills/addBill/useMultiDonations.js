// hooks/bills/addBill/useMultiDonations.js
import { ref, watch } from 'vue'
import { Baseurl } from '@/../global'

export function useMultiDonations({ status, selectMultiple, amount, donations }) {
  const isValid = ref(false) // Estado de validación
  const donationsUsed = ref([]) // Almacena donaciones usadas

  const validateSelectedDonations = async () => {
    // Asegurarse de que haya al menos una donación seleccionada y un monto válido
    if (!selectMultiple.value.length || !amount.value || amount.value <= 0) {
      isValid.value = false
      donationsUsed.value = []
      return
    }

    let remainingAmount = amount.value // Acceder al valor real de "amount"

    donationsUsed.value = [] // Reiniciar donaciones usadas

    for (let i = 0; i < selectMultiple.value.length; i++) {
      const donation = selectMultiple.value[i]

      // Validar que donation no esté vacío y tenga los campos necesarios
      if (!donation) continue

      // Obtener la donación seleccionada de donations
      const donationData = donations.value.find((d) => d.id == donation)

      // Si la donación ya se ha utilizado completamente, no se puede usar
      if ((donationData.spent || 0) >= donationData.quanty) continue

      // Cantidad disponible para usar en esta donación
      const availableAmount = donationData.quanty - (donationData.spent || 0)

      if (availableAmount >= remainingAmount) {
        donationsUsed.value.push({
          donation_id: donationData.id,
          usedAmount: remainingAmount
        })
        remainingAmount = 0
        break
      } else {
        donationsUsed.value.push({
          donation_id: donationData.id,
          usedAmount: availableAmount
        })
        remainingAmount -= availableAmount
      }
    }

    // Verificar si el monto restante es mayor a 0
    isValid.value = remainingAmount === 0 // Actualizar estado de validación
    if (!isValid.value) {
      status.value.amount.message = 'El monto ingresado execede las donaciones seleccionadas'
      status.value.amount.success = false
      status.value.amount.error = true
    } else {
      status.value.amount.message = ''
      status.value.amount.success = true
      status.value.amount.error = false
    }
  }

  // Escuchar cambios en las donaciones seleccionadas y el monto
  watch([selectMultiple, amount], validateSelectedDonations)

  return { isValid, donationsUsed } // Devolver el estado de validación y donaciones usadas
}
