import { ref } from 'vue'

export function useDialogDeleteArea() {
  const ModalDeleteArea = ref(false)
  const areaInfoProvideDelete = ref(null)
  const setModalDeleteArea = ({ open, areaInfo = null }) => {
    if (open) {
      if (!areaInfoProvideDelete) return
      ModalDeleteArea.value = open
      areaInfoProvideDelete.value = areaInfo
    } else {
      ModalDeleteArea.value = open
    }
  }

  return { ModalDeleteArea, setModalDeleteArea, areaInfoProvideDelete }
}
