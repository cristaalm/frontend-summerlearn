import { ref } from 'vue'

export function useDialogEditActivity() {
  const ModalEditActivity = ref(false)
  const activityInfoProvideEdit = ref(null)
  const setModalEditActivity = ({ open, activityInfo = null }) => {
    if (open) {
      if (!activityInfoProvideEdit) return
      ModalEditActivity.value = open
      activityInfoProvideEdit.value = activityInfo
    } else {
      ModalEditActivity.value = open
      console.log('no obtiene nada')
    }
  }

  return { ModalEditActivity, activityInfoProvideEdit, setModalEditActivity }
}
