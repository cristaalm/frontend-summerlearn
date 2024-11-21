import { ref } from 'vue'

export function useDialogEditActivity() {
  const ModalEditActivity = ref(false)
  const activityInfoProvideEdit = ref(null)
  const setModalEditActivity = ({ open, activityInfo = null }) => {
    if (open) {
      if (!activityInfo) return
      console.log(ModalEditActivity)
      ModalEditActivity.value = true
      activityInfoProvideEdit.value = activityInfo
    } else {
      ModalEditActivity.value = false
    }
  }

  return { ModalEditActivity, activityInfoProvideEdit, setModalEditActivity }
}
