import { ref, inject } from 'vue'
import { getChildrens } from '@/services/children/childrens'

export function useActivities() {
  const childrens = ref([])
  const loadingChildrens = ref(false)
  const errorChildrens = ref(null)
  const firstLoad = ref(true)
  const showToast = inject('showToast')

  const loadChildrens = async () => {
    if (loadingChildrens.value) return
    if (firstLoad.value) {
      firstLoad.value = false
      loadingChildrens.value = true
    }
    try {
      childrens.value = await getChildrens()
    } catch (e) {
      errorChildrens.value = e
      console.error(e)
      showToast({
        message: 'Ocurrió un error al cargar la información de los niños',
        type: 'error'
      })
    } finally {
      loadingChildrens.value = false
    }
  }

  return { childrens, loadingChildrens, errorChildrens, loadChildrens }
}
