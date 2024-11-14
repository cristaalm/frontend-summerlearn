import { ref } from 'vue'

export function useDialogActivities() {
  const ModalActivitiesChild = ref(false)
  const childInfo = ref(null)
  const setModalActivitiesChild = ({ open, childInfo = null }) => {
    if (open) {
      if (!childInfo) return
      ModalActivitiesChild.value = open
      childInfo.value = childInfo
    } else {
      ModalActivitiesChild.value = open
    }
  }

  return { ModalActivitiesChild, childInfo, setModalActivitiesChild }
}
