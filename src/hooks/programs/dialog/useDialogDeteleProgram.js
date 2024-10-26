import { ref } from 'vue'

export function useDialogDeleteProgram() {
  const ModalDeleteProgram = ref(false)
  const programInfoProvideDelete = ref(null)
  const setModalDeleteProgram = ({ open, programInfo = null }) => {
    if (open) {
      if (!programInfoProvideDelete) return
      ModalDeleteProgram.value = open
      programInfoProvideDelete.value = programInfo
    } else {
      ModalDeleteProgram.value = open
    }
  }

  return { ModalDeleteProgram, setModalDeleteProgram, programInfoProvideDelete }
}
