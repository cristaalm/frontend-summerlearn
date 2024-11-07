import { ref } from 'vue'

export function useDialogEditArea() {
  const ModalEditArea = ref(false)
  const areaInfoProvideEdit = ref(null)
  const setModalEditArea = ({ open, areaInfo = null }) => {
    if (open) {
      if (!areaInfoProvideEdit) return
      ModalEditArea.value = open
      areaInfoProvideEdit.value = areaInfo
    } else {
      ModalEditArea.value = open
    }
  }

  return { ModalEditArea, areaInfoProvideEdit, setModalEditArea }
}
