import { ref } from 'vue'

export function useDialogEditChild() {
  const ModalEditChild = ref(false)
  const childInfoProvideEdit = ref(null)
  const setModalEditChild = ({ open, childInfo = null }) => {
    if (open) {
      if (!childInfoProvideEdit) return
      ModalEditChild.value = open
      childInfoProvideEdit.value = childInfo
    } else {
      ModalEditChild.value = open
    }
  }

  return { ModalEditChild, childInfoProvideEdit, setModalEditChild }
}
