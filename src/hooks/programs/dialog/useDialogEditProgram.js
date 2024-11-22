import { ref } from 'vue'

export function useDialogEditProgram() {
  const ModalEditProgram = ref(false)
  const programInfoProvideEdit = ref(null)
  const setModalEditProgram = ({ open, programInfo = null }) => {
    if (open) {
      if (!programInfoProvideEdit) return
      ModalEditProgram.value = open
      programInfoProvideEdit.value = programInfo
    } else {
      ModalEditProgram.value = open
    }
  }

  return { ModalEditProgram, setModalEditProgram, programInfoProvideEdit }
}
