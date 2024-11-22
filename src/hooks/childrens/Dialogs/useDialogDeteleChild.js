import { ref } from 'vue'

export function useDialogDeleteChild() {
  const ModalDeleteChild = ref(false)
  const childInfoProvideDelete = ref(null)
  const setModalDeleteChild = ({ open, childInfo = null }) => {
    if (open) {
      if (!childInfoProvideDelete) return
      ModalDeleteChild.value = open
      childInfoProvideDelete.value = childInfo
    } else {
      ModalDeleteChild.value = open
    }
  }

  return { ModalDeleteChild, setModalDeleteChild, childInfoProvideDelete }
}
