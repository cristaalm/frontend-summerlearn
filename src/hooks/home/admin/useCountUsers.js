import { ref, inject } from 'vue'
import { getUsersByRolStatus } from '@/services/home/admin/usersByRolStatus'

export function useCountUsers() {
  const countUsers = ref([])
  const loadingCountUsers = ref(false)
  const firstLoad = ref(true)
  const errorCountUsers = ref(null)
  const showToast = inject('showToast')

  const loadCountUsers = async () => {
    if (loadingCountUsers.value) return
    if (firstLoad.value) {
      loadingCountUsers.value = true
      firstLoad.value = false
    }
    try {
      countUsers.value = await getUsersByRolStatus()
    } catch (e) {
      errorCountUsers.value = e
      showToast({ message: 'Error al cargar los usuarios', type: 'error' })
    } finally {
      if (!countUsers.value) {
        errorCountUsers.value = 'No se ha podido cargar los usuarios'
      }
      loadingCountUsers.value = false
    }
  }

  return { countUsers, loadingCountUsers, errorCountUsers, loadCountUsers }
}
