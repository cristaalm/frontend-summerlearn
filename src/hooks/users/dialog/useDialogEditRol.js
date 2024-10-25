import { ref } from 'vue'

export function useDialogEditRol() {
  const ModalEditUser = ref(false)
  const userInfoProvide = ref(null)
  const setModalEditUser = ({ open, userInfo = null }) => {
    if (open) {
      if (!userInfoProvide) return
      ModalEditUser.value = open
      userInfoProvide.value = userInfo
    } else {
      ModalEditUser.value = open
    }
  }
  return { ModalEditUser, userInfoProvide, setModalEditUser }
}
