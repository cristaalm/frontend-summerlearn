import { ref } from 'vue'

export function useDialogConfirmAddDonation() {
  const ModalConfirmAddDonation = ref(false)
  const setModalConfirmAddDonation = ({ open }) => {
    if (open) {
      ModalConfirmAddDonation.value = open
    } else {
      ModalConfirmAddDonation.value = open
    }
  }

  return { ModalConfirmAddDonation, setModalConfirmAddDonation }
}
